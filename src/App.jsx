import { useCallback, useEffect, useRef, useState } from 'react'
import TileFlip from './components/TileFlip.jsx'
import { nameTile, profileTiles, projects, skillTiles } from './data/tiles.js'
import './styles/mosaic.css'

function App() {
  const mosaicRef = useRef(null)
  const tooltipRef = useRef(null)
  const animationFrameRef = useRef(0)
  const closeTimersRef = useRef(new Map())
  const pointerPositionRef = useRef({ x: 0, y: 0 })
  const activeTileRef = useRef(null)
  const flippedTileIdsRef = useRef(new Set())
  const closingTileIdsRef = useRef(new Set())
  const sourceTileRefsRef = useRef(new Map())
  const [tooltipLabel, setTooltipLabel] = useState('')
  const [flippedTileIds, setFlippedTileIds] = useState(() => new Set())
  const [closingTileIds, setClosingTileIds] = useState(() => new Set())

  const clearHeat = useCallback(() => {
    mosaicRef.current?.querySelectorAll('.mosaic__interactive-tile').forEach((tile) => {
      tile.classList.remove('is-heated')
      tile.style.removeProperty('--cursor-x')
      tile.style.removeProperty('--cursor-y')
      tile.style.removeProperty('--heat-scale')
      tile.style.removeProperty('--heat-brightness')
      tile.style.removeProperty('--heat-glow')
      tile.style.removeProperty('--light-alpha')
    })
  }, [])

  const closeTile = useCallback((tileId) => {
    if (!flippedTileIdsRef.current.has(tileId) || closingTileIdsRef.current.has(tileId)) return

    closingTileIdsRef.current = new Set(closingTileIdsRef.current).add(tileId)
    setClosingTileIds(new Set(closingTileIdsRef.current))
    const finishClose = () => {
      const sourceTile = sourceTileRefsRef.current.get(tileId)
      const nextFlipped = new Set(flippedTileIdsRef.current)
      nextFlipped.delete(tileId)
      flippedTileIdsRef.current = nextFlipped
      setFlippedTileIds(nextFlipped)
      const nextClosing = new Set(closingTileIdsRef.current)
      nextClosing.delete(tileId)
      closingTileIdsRef.current = nextClosing
      setClosingTileIds(nextClosing)
      sourceTileRefsRef.current.delete(tileId)
      closeTimersRef.current.delete(tileId)
      if (sourceTile) {
        window.requestAnimationFrame(() => sourceTile.focus({ preventScroll: true }))
      }
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishClose()
      return
    }

    closeTimersRef.current.set(tileId, window.setTimeout(finishClose, 720))
  }, [])

  const openTile = (tile, event) => {
    if (tile.disabled || flippedTileIdsRef.current.has(tile.id) || closingTileIdsRef.current.has(tile.id)) return

    const nextFlipped = new Set(flippedTileIdsRef.current).add(tile.id)
    flippedTileIdsRef.current = nextFlipped
    setFlippedTileIds(nextFlipped)
    sourceTileRefsRef.current.set(tile.id, event.currentTarget)
    activeTileRef.current = null
    setTooltipLabel('')
    clearHeat()
  }

  useEffect(() => {
    const mosaic = mosaicRef.current
    const tooltip = tooltipRef.current
    const heatTiles = Array.from(mosaic.querySelectorAll('.mosaic__interactive-tile'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const positionTooltip = () => {
      const { x, y } = pointerPositionRef.current
      const { width, height } = tooltip.getBoundingClientRect()
      const margin = 12
      const offset = 14
      let left = x + offset
      let top = y + offset

      if (left + width > window.innerWidth - margin) left = x - width - offset
      if (top + height > window.innerHeight - margin) top = y - height - offset

      left = Math.max(margin, Math.min(left, window.innerWidth - width - margin))
      top = Math.max(margin, Math.min(top, window.innerHeight - height - margin))
      tooltip.style.setProperty('--tooltip-x', `${left}px`)
      tooltip.style.setProperty('--tooltip-y', `${top}px`)
    }

    const showTooltip = (tile, x, y) => {
      if (!tile?.dataset.tooltip || tile.classList.contains('tile-flip--flipped')) return
      activeTileRef.current = tile
      pointerPositionRef.current = { x, y }
      setTooltipLabel(tile.dataset.tooltip)
      window.requestAnimationFrame(positionTooltip)
    }

    const hideTooltip = () => {
      activeTileRef.current = null
      setTooltipLabel('')
    }

    const resetInteraction = () => {
      hideTooltip()
      heatTiles.forEach((tile) => {
        tile.classList.remove('is-heated')
        tile.style.removeProperty('--light-alpha')
      })
    }

    const handlePointerMove = (event) => {
      if (event.pointerType !== 'mouse') {
        if (activeTileRef.current) resetInteraction()
        return
      }

      pointerPositionRef.current = { x: event.clientX, y: event.clientY }
      if (animationFrameRef.current) return

      animationFrameRef.current = window.requestAnimationFrame(() => {
        animationFrameRef.current = 0
        const { x, y } = pointerPositionRef.current
        const radius = 128
        if (activeTileRef.current) positionTooltip()

        if (reducedMotion.matches) {
          resetInteraction()
          return
        }

        heatTiles.forEach((tile) => {
          if (tile.classList.contains('tile-flip--flipped')) {
            tile.classList.remove('is-heated')
            tile.style.removeProperty('--light-alpha')
            return
          }
          const bounds = tile.getBoundingClientRect()
          const dx = Math.max(bounds.left - x, 0, x - bounds.right)
          const dy = Math.max(bounds.top - y, 0, y - bounds.bottom)
          const distance = Math.hypot(dx, dy)
          const nearbyStrength = Math.max(0, 1 - distance / radius) * 0.34
          const strength = tile === activeTileRef.current ? 1 : nearbyStrength

          if (strength <= 0.002) {
            tile.classList.remove('is-heated')
            tile.style.removeProperty('--light-alpha')
            return
          }

          tile.classList.add('is-heated')
          tile.style.setProperty('--cursor-x', `${((x - bounds.left) / bounds.width * 100).toFixed(2)}%`)
          tile.style.setProperty('--cursor-y', `${((y - bounds.top) / bounds.height * 100).toFixed(2)}%`)
          tile.style.setProperty('--heat-scale', (1 + strength * 0.016).toFixed(4))
          tile.style.setProperty('--heat-brightness', (1 + strength * 0.055).toFixed(3))
          tile.style.setProperty('--heat-glow', `${(strength * 15).toFixed(1)}px`)
          tile.style.setProperty('--light-alpha', `${(strength * 38).toFixed(1)}%`)
        })
      })
    }

    const tileFromTarget = (target) => target instanceof Element
      ? target.closest('.mosaic__interactive-tile')
      : null

    const handlePointerOver = (event) => {
      if (event.pointerType !== 'mouse') {
        resetInteraction()
        return
      }
      const tile = tileFromTarget(event.target)
      if (tile) showTooltip(tile, event.clientX, event.clientY)
    }

    const handlePointerOut = (event) => {
      if (event.pointerType !== 'mouse') return
      const currentTile = tileFromTarget(event.target)
      const nextTile = tileFromTarget(event.relatedTarget)
      if (nextTile) return
      if (currentTile === activeTileRef.current) hideTooltip()
    }

    const handleFocusIn = (event) => {
      const tile = tileFromTarget(event.target)
      if (!tile) return
      const bounds = tile.getBoundingClientRect()
      showTooltip(tile, bounds.left + bounds.width / 2, bounds.top + bounds.height / 2)
    }

    const handleFocusOut = (event) => {
      const nextTile = tileFromTarget(event.relatedTarget)
      if (!nextTile) hideTooltip()
    }

    mosaic.addEventListener('pointermove', handlePointerMove, { passive: true })
    mosaic.addEventListener('pointerover', handlePointerOver)
    mosaic.addEventListener('pointerout', handlePointerOut)
    mosaic.addEventListener('pointerleave', resetInteraction)
    mosaic.addEventListener('focusin', handleFocusIn)
    mosaic.addEventListener('focusout', handleFocusOut)

    return () => {
      mosaic.removeEventListener('pointermove', handlePointerMove)
      mosaic.removeEventListener('pointerover', handlePointerOver)
      mosaic.removeEventListener('pointerout', handlePointerOut)
      mosaic.removeEventListener('pointerleave', resetInteraction)
      mosaic.removeEventListener('focusin', handleFocusIn)
      mosaic.removeEventListener('focusout', handleFocusOut)
      if (animationFrameRef.current) window.cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        flippedTileIdsRef.current.forEach((tileId) => closeTile(tileId))
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closeTile])

  useEffect(() => () => {
    closeTimersRef.current.forEach((timerId) => window.clearTimeout(timerId))
    if (animationFrameRef.current) window.cancelAnimationFrame(animationFrameRef.current)
  }, [])

  const renderTile = (tile, className = '') => (
    <TileFlip
      className={className}
      isFlipped={flippedTileIds.has(tile.id)}
      key={tile.id}
      onClose={() => closeTile(tile.id)}
      onFlip={(event) => openTile(tile, event)}
      phase={closingTileIds.has(tile.id) ? 'closing' : flippedTileIds.has(tile.id) ? 'open' : 'closed'}
      tile={tile}
    />
  )

  return (
    <main
      className="portfolio-layout"
      ref={mosaicRef}
    >
      {renderTile(nameTile, 'portfolio-layout__name')}
      <section aria-label="Projects" className="portfolio-projects">
        {projects.map((tile) => renderTile(tile))}
      </section>
      <aside aria-label="Profile and contact" className="portfolio-profiles">
        {profileTiles.map((tile) => renderTile(tile))}
      </aside>
      <section aria-label="Skills" className="portfolio-skills">
        <div aria-label="Skill tiles; scroll horizontally" className="portfolio-skills__strip" role="group" tabIndex={0}>
          {skillTiles.map((tile) => renderTile(tile))}
        </div>
      </section>
      <div
        aria-hidden="true"
        className={`mosaic__tooltip${tooltipLabel ? ' mosaic__tooltip--visible' : ''}`}
        ref={tooltipRef}
      >
        {tooltipLabel}
      </div>
    </main>
  )
}

export default App
