import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

const profileLinks = [
  'https://github.com/solapuresanskar01-spec',
  'https://www.linkedin.com/in/sanskar-solapure-0150413a1/',
  'https://leetcode.com/u/sanskarsolapure/',
]

function portfolioSeo() {
  let siteUrl = ''

  return {
    name: 'portfolio-seo-metadata',
    configResolved(config) {
      const configuredUrl = loadEnv(config.mode, config.root, '').VITE_SITE_URL?.trim()
      if (!configuredUrl) return

      let parsedUrl
      try {
        parsedUrl = new URL(configuredUrl)
      } catch {
        throw new Error('VITE_SITE_URL must be the real portfolio origin, such as https://your-domain.')
      }

      if (
        !['http:', 'https:'].includes(parsedUrl.protocol)
        || !parsedUrl.hostname
        || parsedUrl.pathname !== '/'
        || parsedUrl.search
        || parsedUrl.hash
        || parsedUrl.username
        || parsedUrl.password
      ) {
        throw new Error('VITE_SITE_URL must be a site origin without credentials, path, query, or fragment.')
      }

      siteUrl = parsedUrl.origin
    },
    transformIndexHtml(html) {
      if (!siteUrl) return html.replace('<!-- SITE_URL_METADATA -->', '')

      const canonicalUrl = `${siteUrl}/`
      const imageUrl = `${siteUrl}/og-image.png`
      const person = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Sanskar Solapure',
        url: canonicalUrl,
        jobTitle: 'Aspiring Software Engineer',
        affiliation: {
          '@type': 'EducationalOrganization',
          name: 'AISSMS Institute of Information Technology',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Pune',
            addressCountry: 'IN',
          },
        },
        sameAs: profileLinks,
      }
      const siteMetadata = [
        `<link rel="canonical" href="${canonicalUrl}" />`,
        `<meta property="og:url" content="${canonicalUrl}" />`,
        `<meta property="og:image" content="${imageUrl}" />`,
        '<meta property="og:image:width" content="1200" />',
        '<meta property="og:image:height" content="630" />',
        '<meta property="og:image:alt" content="Sanskar Solapure — Software Developer Portfolio in a dark cyan aquarium theme" />',
        `<meta name="twitter:image" content="${imageUrl}" />`,
        `<script type="application/ld+json">${JSON.stringify(person)}</script>`,
      ].join('\n    ')

      return html.replace('<!-- SITE_URL_METADATA -->', siteMetadata)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), portfolioSeo()],
})
