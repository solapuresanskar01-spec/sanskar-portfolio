const GITHUB_LOGIN = 'solapuresanskar01-spec'
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'
const CACHE_CONTROL = 'public, s-maxage=3600, stale-while-revalidate=86400'

const CONTRIBUTIONS_QUERY = `
  query ContributionCalendar($login: String!) {
    user(login: $login) {
      login
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              weekday
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`

function sendJson(response, statusCode, body, cacheControl = 'no-store') {
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', cacheControl)
  response.status(statusCode).json(body)
}

function hasReadUserScopeError(errors = []) {
  return errors.some(({ message = '' }) => /read:user/i.test(message))
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return sendJson(response, 405, { error: 'Method not allowed.' })
  }

  const token = globalThis.process?.env?.GITHUB_TOKEN

  if (!token) {
    return sendJson(response, 503, {
      code: 'missing_token',
      error: 'GitHub contribution data is not configured yet.',
    })
  }

  try {
    const githubResponse = await fetch(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify({
        query: CONTRIBUTIONS_QUERY,
        variables: { login: GITHUB_LOGIN },
      }),
      signal: AbortSignal.timeout(10000),
    })

    if (!githubResponse.ok) {
      return sendJson(response, 502, {
        code: 'github_unavailable',
        error: 'GitHub did not return contribution data. Check the server token and GitHub API availability.',
      })
    }

    const result = await githubResponse.json()

    if (result.errors?.length) {
      if (hasReadUserScopeError(result.errors)) {
        return sendJson(response, 502, {
          code: 'missing_read_user_scope',
          error: 'To include private or internal repository contributions, GITHUB_TOKEN needs the read:user scope. Public contribution data does not require this scope.',
        })
      }

      return sendJson(response, 502, {
        code: 'github_query_failed',
        error: 'GitHub could not provide contribution data. Check the token access and API rate limits.',
      })
    }

    const user = result.data?.user

    if (!user) {
      return sendJson(response, 404, {
        code: 'user_not_found',
        error: 'The GitHub profile could not be found.',
      })
    }

    const calendar = user.contributionsCollection?.contributionCalendar

    if (!calendar) {
      return sendJson(response, 502, {
        code: 'calendar_unavailable',
        error: 'GitHub did not return a contribution calendar.',
      })
    }

    const days = calendar.weeks.flatMap((week, weekIndex) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        weekday: day.weekday,
        week: weekIndex,
        contributionCount: day.contributionCount,
        contributionLevel: day.contributionLevel,
      })),
    )

    return sendJson(response, 200, {
      username: user.login,
      totalContributions: calendar.totalContributions,
      days,
    }, CACHE_CONTROL)
  } catch {
    return sendJson(response, 502, {
      code: 'github_request_failed',
      error: 'GitHub contribution history is temporarily unavailable.',
    })
  }
}
