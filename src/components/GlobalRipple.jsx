import { useEffect, useRef } from 'react'
import './GlobalRipple.css'

const MAX_RIPPLES = 12
const RIPPLE_LIFETIME = 1200

function GlobalRipple() {
  const layerRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    const timers = new Map()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    function removeRipple(ripple) {
      const timer = timers.get(ripple)
      if (timer !== undefined) window.clearTimeout(timer)
      timers.delete(ripple)
      ripple.remove()
    }

    function onAnimationEnd(event) {
      const ripple = event.target.parentElement
      if (!ripple?.classList.contains('water-ripple')) return

      const completed = Number(ripple.dataset.completed || 0) + 1
      ripple.dataset.completed = String(completed)
      if (completed >= Number(ripple.dataset.ringCount)) removeRipple(ripple)
    }

    function onPointerDown(event) {
      if (!event.isPrimary || event.button !== 0 || !layer) return

      while (layer.childElementCount >= MAX_RIPPLES) {
        removeRipple(layer.firstElementChild)
      }

      const ripple = document.createElement('span')
      ripple.className = 'water-ripple'
      ripple.setAttribute('aria-hidden', 'true')
      ripple.dataset.ringCount = reducedMotion.matches ? '1' : '3'
      ripple.style.left = `${event.clientX}px`
      ripple.style.top = `${event.clientY}px`

      for (let index = 0; index < 3; index += 1) {
        ripple.appendChild(document.createElement('i'))
      }
      layer.appendChild(ripple)

      const timer = window.setTimeout(() => removeRipple(ripple), RIPPLE_LIFETIME)
      timers.set(ripple, timer)
    }

    layer.addEventListener('animationend', onAnimationEnd)
    document.addEventListener('pointerdown', onPointerDown, { capture: true, passive: true })

    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      layer.removeEventListener('animationend', onAnimationEnd)
      for (const ripple of timers.keys()) removeRipple(ripple)
    }
  }, [])

  return <div ref={layerRef} className="ripple-layer" aria-hidden="true" />
}

export default GlobalRipple
