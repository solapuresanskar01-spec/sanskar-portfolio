import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const focusableSelector = 'a[href], button:not(:disabled), [tabindex]:not([tabindex="-1"])'

function ExpandedView({ tile, phase, onClose, onOpened }) {
  const cardRef = useRef(null)
  const closeButtonRef = useRef(null)
  const [isActive, setIsActive] = useState(() => (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ))

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      const frame = window.requestAnimationFrame(() => {
        onOpened()
        closeButtonRef.current?.focus({ preventScroll: true })
      })
      return () => window.cancelAnimationFrame(frame)
    }

    const card = cardRef.current
    const target = card.getBoundingClientRect()
    const origin = tile.origin
    const dx = origin.left + origin.width / 2 - (target.left + target.width / 2)
    const dy = origin.top + origin.height / 2 - (target.top + target.height / 2)
    const scaleX = origin.width / target.width
    const scaleY = origin.height / target.height

    card.style.transition = 'none'
    card.style.setProperty(
      '--flip-start',
      `translate3d(${dx}px, ${dy}px, 0) scale(${scaleX}, ${scaleY})`,
    )
    card.focus({ preventScroll: true })
    void card.offsetWidth
    card.style.removeProperty('transition')

    let secondFrame = 0
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setIsActive(true)
        window.setTimeout(() => {
          onOpened()
          closeButtonRef.current?.focus({ preventScroll: true })
        }, 840)
      })
    })

    return () => {
      window.cancelAnimationFrame(firstFrame)
      if (secondFrame) window.cancelAnimationFrame(secondFrame)
    }
  }, [onOpened, tile.origin])

  useEffect(() => {
    if (phase !== 'closing') return undefined
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return undefined

    const timer = window.setTimeout(() => {
      cardRef.current?.focus({ preventScroll: true })
    }, 0)
    return () => window.clearTimeout(timer)
  }, [phase])

  const handleKeyDown = (event) => {
    if (event.key !== 'Tab') return

    const focusableElements = Array.from(cardRef.current.querySelectorAll(focusableSelector))
      .filter((element) => !element.closest('[inert]') && element.getClientRects().length > 0)
    if (focusableElements.length === 0) {
      event.preventDefault()
      cardRef.current.focus()
      return
    }

    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div
      className={`expanded-layer${isActive ? ' expanded-layer--active' : ''}${phase === 'closing' ? ' expanded-layer--closing' : ''}`}
    >
      <div aria-hidden="true" className="expanded-layer__backdrop" />
      <div
        aria-labelledby={`expanded-heading-${tile.id}`}
        aria-modal="true"
        className={`expanded-card expanded-card--${tile.tone}`}
        onKeyDown={handleKeyDown}
        ref={cardRef}
        role="dialog"
        tabIndex={-1}
      >
        <div className="expanded-card__rotator">
          <div aria-hidden={isActive} className="expanded-card__face expanded-card__front" inert={isActive}>
            <span aria-hidden="true" className="expanded-card__front-title">{tile.label}</span>
          </div>
          <div
            aria-hidden={!isActive || phase === 'closing'}
            className="expanded-card__face expanded-card__back"
            inert={!isActive || phase === 'closing'}
          >
            <div className="expanded-card__content">
              <header className="expanded-card__header">
                <div>
                  <p className="expanded-card__eyebrow">Sanskar Solapure · Portfolio</p>
                  <h2 className="expanded-card__title" id={`expanded-heading-${tile.id}`}>
                    {tile.label}
                  </h2>
                </div>
                <button
                  aria-label={`Close ${tile.label} details`}
                  className="expanded-card__close"
                  disabled={phase !== 'open'}
                  onClick={onClose}
                  ref={closeButtonRef}
                  type="button"
                >
                  <span aria-hidden="true">×</span>
                  <span>Close</span>
                </button>
              </header>
              <div className={`expanded-card__body${tile.image ? ' expanded-card__body--with-image' : ''}`}>
                <div className="expanded-card__copy">
                  <p className="expanded-card__summary">{tile.summary}</p>
                  {tile.points?.length > 0 && (
                    <ul className="expanded-card__list">
                      {tile.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                  )}
                  {tile.actions?.length > 0 && (
                    <div className="expanded-card__actions">
                      {tile.actions.map((action) => (
                        <a
                          className="expanded-card__action"
                          download={action.download}
                          href={action.href}
                          key={action.href + action.label}
                          rel={action.external ? 'noopener noreferrer' : undefined}
                          target={action.external ? '_blank' : undefined}
                        >
                          {action.label}
                          {action.external && <span aria-hidden="true"> ↗</span>}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                {tile.image && (
                  <img
                    alt={tile.imageAlt}
                    className="expanded-card__image"
                    decoding="async"
                    src={tile.image}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpandedView
