import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const EMPTY_DAYS = []

const CONTRIBUTION_LEVELS = {
  NONE: 'none',
  FIRST_QUARTILE: 'low',
  SECOND_QUARTILE: 'medium',
  THIRD_QUARTILE: 'high',
  FOURTH_QUARTILE: 'highest',
}

function ContributionLegend() {
  return (
    <div aria-label="Contribution level legend" className="github-contributions__legend">
      <span>Less</span>
      {['none', 'low', 'medium', 'high', 'highest'].map((level) => (
        <span
          aria-hidden="true"
          className={`github-contributions__cell github-contributions__cell--${level}`}
          key={level}
        />
      ))}
      <span>More</span>
    </div>
  )
}

function GitHubContributions() {
  const [state, setState] = useState({ status: 'loading', data: null, errorCode: null })
  const graphScrollRef = useRef(null)
  const userHasTakenControlRef = useRef(false)

  useEffect(() => {
    const controller = new AbortController()

    async function loadContributions() {
      try {
        const response = await fetch('/api/github-contributions', {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        })
        const payload = await response.json()

        if (!response.ok) {
          setState({ status: 'error', data: null, errorCode: payload.code ?? 'unavailable' })
          return
        }

        setState({ status: 'success', data: payload, errorCode: null })
      } catch {
        if (!controller.signal.aborted) {
          setState({ status: 'error', data: null, errorCode: 'unavailable' })
        }
      }
    }

    loadContributions()
    return () => controller.abort()
  }, [])

  const { status, data, errorCode } = state
  const days = data?.days ?? EMPTY_DAYS
  const weekCount = days.reduce((maximum, day) => Math.max(maximum, day.week + 1), 0)

  useLayoutEffect(() => {
    if (status !== 'success' || days.length === 0 || userHasTakenControlRef.current) return

    const graphScrollArea = graphScrollRef.current

    if (graphScrollArea) {
      graphScrollArea.scrollLeft = graphScrollArea.scrollWidth
    }
  }, [days, status])

  const rememberUserControl = () => {
    userHasTakenControlRef.current = true
  }

  const handleGraphKeyDown = (event) => {
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key)) {
      rememberUserControl()
    }
  }

  return (
    <section aria-labelledby="github-contributions-title" className="github-contributions">
      <div className="github-contributions__header">
        <div>
          <p className="github-contributions__eyebrow">Open source activity</p>
          <h2 id="github-contributions-title">GitHub Contributions</h2>
        </div>
        {status === 'success' && (
          <p className="github-contributions__total">
            <strong>{data.totalContributions.toLocaleString()}</strong> contributions in the last year
          </p>
        )}
      </div>

      {status === 'loading' && (
        <p className="github-contributions__message" role="status">Loading contribution history…</p>
      )}

      {status === 'error' && (
        <p className="github-contributions__message" role="status">
          {errorCode === 'missing_token'
            ? 'Contribution history is not configured on this deployment yet.'
            : errorCode === 'missing_read_user_scope'
              ? 'Private or internal contributions require the read:user scope on the server-side GitHub token. Public contributions do not require this scope.'
              : 'GitHub contribution history is temporarily unavailable.'}
        </p>
      )}

      {status === 'success' && days.length === 0 && (
        <p className="github-contributions__message" role="status">
          GitHub returned no daily contribution data for this period.
        </p>
      )}

      {status === 'success' && days.length > 0 && (
        <figure className="github-contributions__figure">
          <div
            aria-label="Scrollable contribution graph. Scroll right to view the latest activity and left for older history."
            className="github-contributions__scroll"
            onKeyDown={handleGraphKeyDown}
            onPointerDown={rememberUserControl}
            onWheel={(event) => {
              if (event.deltaX !== 0 || event.shiftKey) rememberUserControl()
            }}
            ref={graphScrollRef}
            tabIndex={0}
          >
            <div
              aria-label={`GitHub contribution calendar for ${data.username}: ${data.totalContributions} contributions across ${days.length} days in the last year.`}
              className="github-contributions__calendar"
              role="img"
              style={{ '--week-count': weekCount }}
            >
              {days.map((day) => {
                const level = CONTRIBUTION_LEVELS[day.contributionLevel] ?? 'none'

                return (
                  <span
                    aria-hidden="true"
                    className={`github-contributions__cell github-contributions__cell--${level}`}
                    key={day.date}
                    style={{ gridColumn: day.week + 1, gridRow: day.weekday + 1 }}
                    title={`${day.date}: ${day.contributionCount} ${day.contributionCount === 1 ? 'contribution' : 'contributions'}`}
                  />
                )
              })}
            </div>
          </div>
          <figcaption className="github-contributions__caption">
            <span>Daily activity from GitHub for @{data.username}</span>
            <ContributionLegend />
          </figcaption>
        </figure>
      )}
    </section>
  )
}

export default GitHubContributions
