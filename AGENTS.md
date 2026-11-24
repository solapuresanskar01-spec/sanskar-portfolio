# Project Instructions — Sanskar Portfolio

## 1. Project Overview

Build a completely new personal developer portfolio for Sanskar Solapure.

This project replaces the previous portfolio implementation. Do not attempt to preserve the old UI, components, layouts, or design system.

The portfolio must be an original, polished, interactive experience rather than a conventional developer portfolio template.

Read `DESIGN.md` before implementing any UI.

## 2. Technology Stack

Use:

- React
- Vite
- JavaScript (not TypeScript)
- HTML5
- Vanilla CSS
- CSS Grid and Flexbox
- CSS animations and transitions
- Git and GitHub
- Vercel for deployment

Avoid:

- Unnecessary dependencies
- UI component libraries
- CSS frameworks such as Bootstrap or Tailwind
- Heavy animation libraries unless genuinely necessary
- Unnecessary backend services
- Unnecessary API integrations

Prefer native browser capabilities and lightweight implementations.

## 3. Development Principles

- Write clean, modular, maintainable code.
- Use reusable React components.
- Separate content/data from presentation wherever practical.
- Use meaningful component and variable names.
- Keep CSS organized and avoid excessive specificity.
- Avoid duplicated code.
- Avoid unnecessary abstraction.
- Do not introduce dependencies without explaining why they are needed.
- Do not leave placeholder content, dead buttons, broken links, or unfinished interactions.
- Do not use fake achievements, statistics, testimonials, or experience.

## 4. Personal Information

Use the following verified information:

Name: Sanskar Solapure

Education: Second-year Computer Science Engineering student.

College: AISSMS Institute of Information Technology, Pune.

Graduation year: 2029.

Email: solapuresanskar01@gmail.com

Technologies and skills:
- C++
- Python
- JavaScript
- React
- HTML
- CSS
- Supabase

Featured project:
- Smart Campus

Do not invent:
- Work experience
- Client projects
- Certifications
- Awards
- Performance metrics
- Project results
- Skill proficiency levels

If information is missing, use honest wording or leave it out.

## 5. Project Assets

Preserve and use the existing assets:

- sanskar-solapure-resume.webp
- smart-campus.png

Move them into an organized location such as `public/assets/` if necessary.

Do not delete, overwrite, or replace these assets without permission.

The resume must be previewed and downloadable as a WEBP image; do not describe it as a PDF. Keep the link pointed at `public/assets/sanskar-solapure-resume.webp`.

Use the Smart Campus image in its flipped project detail view, not in the initial mosaic.

## 6. Architecture

Use a clean and understandable project structure.

Suggested structure:

src/
  components/
    Mosaic.jsx
    Tile.jsx
    Tooltip.jsx
    TileFlip.jsx
    ProjectDetails.jsx
    ContactDetails.jsx
  data/
    tiles.js
    projects.js
    skills.js
  hooks/
    useReducedMotion.js
  styles/
    global.css
    mosaic.css
    tile.css
    interactions.css
  App.jsx
  main.jsx

public/
  assets/
    sanskar-solapure-resume.webp
    smart-campus.png

You may adjust this structure if there is a clear technical reason.

Do not create unnecessary files or components.

## 7. Interaction Requirements

The portfolio must support:

- Mouse interaction on desktop.
- Touch interaction on mobile.
- Keyboard navigation.
- Escape key to flip an active tile back.
- Accessible buttons and interactive elements.
- Visible keyboard focus states.
- Reduced-motion preferences.

All interactive tiles must have meaningful accessible labels.

Do not make essential information available only through hover.

## 8. Performance and Accessibility

Target:

- Fast initial loading.
- Minimal JavaScript overhead.
- Optimized animations.
- No unnecessary layout shifts.
- Responsive layouts.
- Semantic HTML.
- Proper color contrast.
- Accessible focus indicators.
- Reduced motion support.

Avoid excessive blur, large shadows, continuous expensive animations, and unnecessary DOM elements.

## 9. Coding Workflow

Before making changes:

1. Inspect the existing repository.
2. Read `AGENTS.md` and `DESIGN.md`.
3. Inspect `package.json` and existing configuration.
4. Identify missing or deleted files.
5. Preserve working configuration and existing assets.

While implementing:

1. Build the smallest working foundation first.
2. Implement the mosaic layout.
3. Implement tile interactions.
4. Implement expanded views.
5. Add responsive behavior.
6. Add accessibility.
7. Add visual polish.

After each major milestone:

- Run the production build.
- Fix errors before proceeding.
- Check for broken imports and missing assets.
- Do not claim something works without testing it.

Do not push to GitHub or deploy without explicit user approval.

## 10. Final Quality Standard

The result should feel like a carefully engineered interactive digital experience.

Prioritize:

1. Originality.
2. Visual quality.
3. Smooth and intentional interactions.
4. Clear information architecture.
5. Performance.
6. Accessibility.
7. Maintainable code.

Do not sacrifice usability for visual effects.
