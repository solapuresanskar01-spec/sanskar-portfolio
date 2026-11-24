import { useEffect, useRef } from 'react'

const externalAttributes = (action) => (action.external || action.newTab
  ? { target: '_blank', rel: 'noopener noreferrer' }
  : {})

function TileDetails({ tile, isFlipped, phase, onClose, detailsId }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (isFlipped && phase === 'open') closeRef.current?.focus({ preventScroll: true })
  }, [isFlipped, phase])

  return (
    <div
      aria-hidden={!isFlipped || phase === 'closing'}
      className="tile-flip__face tile-flip__back"
      id={detailsId}
      inert={!isFlipped || phase === 'closing'}
      onClick={(event) => {
        if (event.target.closest('a, button, input, select, textarea')) return
        onClose()
      }}
    >
      <div className="tile-flip__details">
        <header className="tile-flip__header">
          <h2 className="tile-flip__title">{tile.projectName || tile.label}</h2>
          <button
            aria-label={`Close ${tile.label} details`}
            className="tile-flip__close"
            disabled={!isFlipped || phase === 'closing'}
            onClick={onClose}
            ref={closeRef}
            type="button"
          >
            <span aria-hidden="true">×</span>
            <span>Close</span>
          </button>
        </header>
        <div className="tile-flip__body">
          {tile.projectName && !tile.placeholder ? (
            <div className="tile-flip__project-facts">
              <section>
                <h3>Overview</h3>
                <p>{tile.overview}</p>
              </section>
              <section>
                <h3>Problem addressed</h3>
                <p>{tile.problem}</p>
              </section>
              <section>
                <h3>Features</h3>
                <ul>{tile.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              </section>
              <section>
                <h3>Technology stack</h3>
                <ul>{tile.technology.map((technology) => <li key={technology}>{technology}</li>)}</ul>
              </section>
            </div>
          ) : (
            <p className="tile-flip__summary">{tile.overview || tile.summary}</p>
          )}
          {tile.image && (
            <img
              alt={tile.imageAlt}
              className="tile-flip__image"
              decoding="async"
              src={tile.image}
            />
          )}
          {tile.repositoryMissing && (
            <p className="tile-flip__missing">GitHub repository URL: [NEEDED]</p>
          )}
          {tile.preview && (
            <div className="tile-flip__preview">
              <img
                alt={tile.previewAlt}
                className="tile-flip__resume-preview"
                onError={(event) => {
                  event.currentTarget.hidden = true
                  event.currentTarget.nextElementSibling.hidden = false
                }}
                src={tile.preview}
              />
              <p className="tile-flip__missing" hidden>
                Resume preview unavailable. Add `public/assets/sanskar-solapure-resume.webp`.
              </p>
            </div>
          )}
          {tile.actions?.length > 0 && (
            <div className="tile-flip__actions">
              {tile.actions.map((action) => (
                <a
                  className="tile-flip__action"
                  download={action.download ? action.downloadName || true : undefined}
                  href={action.href}
                  key={action.href + action.label}
                  {...externalAttributes(action)}
                >
                  {action.label}
                  {action.external && <span aria-hidden="true"> ↗</span>}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TileFlip({
  tile,
  isFlipped,
  phase,
  onFlip,
  onClose,
  className = '',
}) {
  const isName = tile.id === 'name'

  return (
    <div
      className={`mosaic__tile mosaic__interactive-tile mosaic__tile--${tile.tone} mosaic__tile--${tile.id} tile-flip${isFlipped ? ' tile-flip--flipped' : ''}${phase === 'closing' && isFlipped ? ' tile-flip--closing' : ''} ${className}`}
      data-tooltip={tile.tooltip}
    >
      <div className="tile-flip__rotator">
        {isName ? (
          <div className="tile-flip__face tile-flip__front">
            <span aria-level="1" className="mosaic__name" role="heading">{tile.label.toUpperCase()}</span>
            <span className="mosaic__role">{tile.role.toUpperCase()}</span>
          </div>
        ) : (
          <button
            aria-expanded={isFlipped}
            aria-label={`${tile.label}: open details`}
            aria-controls={`tile-details-${tile.id}`}
            className="tile-flip__face tile-flip__front"
            inert={isFlipped}
            onClick={onFlip}
            type="button"
          >
            <span className="mosaic__heading">{tile.label}</span>
            {tile.badge && <span className="mosaic__featured-label">{tile.badge}</span>}
          </button>
        )}
        {!isName && (
          <TileDetails
            detailsId={`tile-details-${tile.id}`}
            isFlipped={isFlipped}
            onClose={onClose}
            phase={phase}
            tile={tile}
          />
        )}
      </div>
    </div>
  )
}

export default TileFlip
