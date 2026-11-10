import { useCallback, useEffect, useRef, useState } from 'react'
import ExpandedView from './components/ExpandedView.jsx'
import { tiles } from './data/tiles.js'
import './styles/mosaic.css'
import './styles/expanded-view.css'

function lockPageScroll() {
  const previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'

  return () => {
    document.body.style.overflow = previousOverflow
  }
}

function App() {
  const mosaicRef = useRef(null)
  const tooltipRef = useRef(null)
  const animationFrameRef = useRef(0)
  const closeTimerRef = useRef(0)
  const pointerPositionRef = useRef({ x: 0, y: 0 })
  const activeTileRef = useRef(null)
  const expandedTileRef = useRef(null)
  const expandedPhaseRef = useRef('closed')
  const sourceTileRef = useRef(null)
  const [tooltipLabel, setTooltipLabel] = useState('')
  const [expandedTile, setExpandedTile] = useState(null)
  const [expandedPhase, setExpandedPhase] = useState('closed')

  const closeExpanded = useCallback(() => {
    if (!expandedTileRef.current || expandedPhaseRef.current === 'closing') return

    expandedPhaseRef.current = 'closing'
    setExpandedPhase('closing')
    const finishClosing = () => {
      expandedTileRef.current = null
      expandedPhaseRef.current = 'closed'
      setExpandedTile(null)
      setExpandedPhase('closed')
      closeTimerRef.current = 0
    }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      finishClosing()
      return
    }

    closeTimerRef.current = window.setTimeout(finishClosing, 850)
  }, [])

  const markExpandedOpen = useCallback(() => {
    if (expandedPhaseRef.current !== 'opening' || !expandedTileRef.current) return
    expandedPhaseRef.current = 'open'
    setExpandedPhase('open')
  }, [])

  const openTile = (tile, event) => {
    if (tile.disabled || expandedTileRef.current) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const selection = {
      ...tile,
      origin: {
        left: bounds.left,
        top: bounds.top,
        width: bounds.width,
        height: bounds.height,
      },
    }

    sourceTileRef.current = event.currentTarget
    expandedTileRef.current = selection
    expandedPhaseRef.current = 'opening'
    setExpandedTile(selection)
    setExpandedPhase('opening')
    activeTileRef.current = null
    setTooltipLabel('')
    mosaicRef.current.querySelectorAll('.mosaic__interactive-tile').forEach((element) => {
      element.classList.remove('is-heated')
      element.style.removeProperty('--cursor-x')
      element.style.removeProperty('--cursor-y')
      element.style.removeProperty('--heat-scale')
      element.style.removeProperty('--heat-brightness')
      element.style.removeProperty('--heat-glow')
      element.style.removeProperty('--light-alpha')
    })
  }

  useEffect(() => {
    const mosaic = mosaicRef.current
    const tooltip = tooltipRef.current
    const heatTiles = Array.from(mosaic.querySelectorAll('.mosaic__interactive-tile:not(:disabled)'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const clearHeat = () => {
      heatTiles.forEach((tile) => {
        tile.classList.remove('is-heated')
        tile.style.removeProperty('--cursor-x')
        tile.style.removeProperty('--cursor-y')
        tile.style.removeProperty('--heat-scale')
        tile.style.removeProperty('--heat-brightness')
        tile.style.removeProperty('--heat-glow')
        tile.style.removeProperty('--light-alpha')
      })
    }

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
      if (!tile?.dataset.tooltip || expandedTileRef.current) return
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
      clearHeat()
    }

    const handlePointerMove = (event) => {
      if (expandedTileRef.current) return
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
          clearHeat()
          return
        }

        heatTiles.forEach((tile) => {
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
    if (!expandedTile) {
      sourceTileRef.current?.focus({ preventScroll: true })
      sourceTileRef.current = null
      return undefined
    }

    const unlockPageScroll = lockPageScroll()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeExpanded()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      unlockPageScroll()
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeExpanded, expandedTile])

  useEffect(() => () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    if (animationFrameRef.current) window.cancelAnimationFrame(animationFrameRef.current)
  }, [])

  const debugGridEnabled = new URLSearchParams(window.location.search).get('debug-grid') === '1'

  return (
    <main
      className={`mosaic${debugGridEnabled ? ' debug-grid' : ''}${expandedTile ? ' mosaic--expanded' : ''}`}
      ref={mosaicRef}
    >
      {tiles.map((tile) => {
        const style = {
          '--desktop-columns': tile.desktop.columns,
          '--desktop-rows': tile.desktop.rows,
          '--mobile-columns': tile.mobile.columns,
          '--mobile-rows': tile.mobile.rows,
        }

        if (tile.decorative) {
          return (
            <div
              aria-hidden="true"
              className={`mosaic__tile mosaic__tile--${tile.tone} mosaic__tile--decoration`}
              key={tile.id}
              style={style}
            />
          )
        }

        const isExpanded = expandedTile?.id === tile.id
        const classes = [
          'mosaic__tile',
          'mosaic__interactive-tile',
          `mosaic__tile--${tile.tone}`,
          `mosaic__interactive-tile--${tile.id}`,
        ].join(' ')
        const label = tile.id === 'name'
          ? `${tile.label}, ${tile.role}; open details`
          : tile.disabled
            ? `${tile.label}, URL needed`
            : `${tile.label}: open details`

        return (
          <button
            aria-expanded={isExpanded}
            aria-haspopup="dialog"
            aria-label={label}
            className={classes}
            data-tooltip={tile.tooltip}
            disabled={tile.disabled}
            key={tile.id}
            onClick={(event) => openTile(tile, event)}
            style={style}
            type="button"
          >
            {tile.id === 'name' ? (
              <>
                <h1 className="mosaic__name">{tile.label}</h1>
                <p className="mosaic__role">{tile.role}</p>
              </>
            ) : (
              <span aria-level="2" className="mosaic__heading" role="heading">
                {tile.label}
              </span>
            )}
            {tile.badge && <span className="mosaic__featured-label">{tile.badge}</span>}
            {tile.missing && <span className="mosaic__missing">{tile.missing}</span>}
          </button>
        )
      })}
      <div
        aria-hidden="true"
        className={`mosaic__tooltip${tooltipLabel ? ' mosaic__tooltip--visible' : ''}`}
        ref={tooltipRef}
      >
        {tooltipLabel}
      </div>
      {expandedTile && (
        <ExpandedView
          onClose={closeExpanded}
          onOpened={markExpandedOpen}
          phase={expandedPhase}
          tile={expandedTile}
        />
      )}
    </main>
  )
}

export default App
