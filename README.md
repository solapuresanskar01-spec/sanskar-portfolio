# Sanskar Solapure — Portfolio

A responsive personal portfolio built with React, Vite, Tailwind CSS, and Lucide icons.

## Local development

```sh
npm install
npm run dev
```

Create and verify the production build with `npm run build`. Run `npm run lint` to check the source.

## Updating portfolio content

- Edit project descriptions, technologies, and repository/demo URLs in `src/data/projects.js`.
- Edit grouped skills in `src/data/skills.js`.
- The social links and email address are configured in `src/data/links.js`.
- The resume download and view links use the PDF and file name configured in `src/data/resume.js`.

## Deployment metadata

Set `VITE_SITE_URL` to the real portfolio origin in the deployment environment before building (or copy `.env.example` to a local `.env` and set it there). The value must be the origin only, such as `https://your-confirmed-domain`, with no path or trailing route. When configured, Vite adds the canonical URL, absolute Open Graph/Twitter image URLs, and Person JSON-LD to the static HTML. Until a real URL is configured, URL-specific SEO tags and the sitemap are intentionally omitted.

The social preview image is `public/og-image.png`. `public/robots.txt` allows crawling; add a sitemap only after the actual domain is configured.

## Deployment

The site is a static Vite application and can be deployed to Vercel or Cloudflare Pages with the standard Vite build command, `npm run build`, and output directory, `dist`.
