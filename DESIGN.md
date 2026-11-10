# Sanskar Solapure Portfolio Design

## Purpose

Keep the existing colored-tile mosaic concept. Use a calm dark canvas, a strict grid, restrained interaction, and verified personal details only. The first reading order begins with the name tile, followed by the personal and education details, project work, skills, and profile links.

## Grid and placement

- Use one mosaic container with 12 equal desktop columns, equal auto rows controlled by `--cell`, one `--gap`, and equal outer padding.
- At widths up to 768px, use 4 equal columns and keep the name first and Smart Campus second.
- Every tile is a direct grid child. Place tiles with column and row spans only; no per-tile margins, absolute positioning, or resting transforms.
- Keep all tile boxes border-box. The hover swell uses transforms and does not change neighboring tile placement.
- The optional `.debug-grid` class draws grid guides and is off by default. `?debug-grid=1` enables it for review.
- Keep at least 44px tile height and allow vertical scrolling on small screens without horizontal overflow.

## Content and color meaning

Use one shared palette in `src/styles/global.css`:

- Warm coral/orange is reserved for project work: Smart Campus and Projects.
- Muted teal, indigo, and slate are reserved for skills and tools.
- Off-white, warm gray, stone, and slate neutrals are used for identity, education, location, contact, resume, and social profiles.
- Dark neutral is reserved for quiet decoration and the page background.
- Social profile tiles are neutral, never green.

The palette tokens are `--warm-*`, `--cool-*`, and `--neutral-*`. Components reference these tokens rather than defining colors. Keep text and tile colors at WCAG AA contrast for normal text. Do not hue-rotate colors across category boundaries.

## Tile inventory

There are 24 tiles total: the name; About, Education, Location, Contact, Resume, GitHub Profile, LinkedIn, and LeetCode; Smart Campus and Projects; 12 individual skills/tools; and one quiet decorative tile. The decorative tile is `aria-hidden`, unfocusable, and has no tooltip.

The name tile is the first focal tile and contains a real `h1` reading “Sanskar Solapure” and the role line “CSE student - Pune, India”. Smart Campus is the dominant warm tile, spans 6 by 4 cells on desktop and 4 by 3 on mobile, and uses its own flex alignment and padding for the “FEATURED PROJECT” label. Other project tiles remain warm. Skills are compact cool tiles. Neutral identity/contact/profile tiles are visually quieter.

Use only verified content:

- Education: B.E. Computer Science Engineering, AISSMS IIT Pune, expected 2029.
- Smart Campus: campus issue reporting and admin dashboard; React and Supabase.
- Skills/tools: C++, Python, JavaScript, React, HTML, CSS, Supabase, Git, GitHub, VS Code, DSA (learning), SQL (learning).
- GitHub: `https://github.com/solapuresanskar01-spec`.
- LinkedIn: `https://www.linkedin.com/in/sanskar-solapure-0150413a1/`.
- LeetCode: `https://leetcode.com/u/sanskarsolapure/`.
- Contact: `solapuresanskar01@gmail.com`.
- Resume URL has not been supplied. Keep the tile disabled and mark the missing URL as `[NEEDED]` with a TODO in source. Do not guess a URL.

Do not invent work history, project outcomes, metrics, achievements, or skill ratings.

## Interaction and accessibility

Preserve the existing cursor heat map, floating tooltip, tile expansion transition, and Escape-to-close behavior. Keep the heat effect category-colored, restrained, and driven by CSS custom properties. Keyboard focus reveals the same label as hover. Touch users can see visible tile labels and activate tiles by tapping.

Every meaningful tile is an accessible button with visible text; the decorative tile is hidden from assistive technology. Include visible `:focus-visible` styles, keyboard activation, reduced-motion support, and no essential hover-only information. Reduced-motion disables breathing, swell, and large transitions.

## Quality checks

- Confirm the 24-tile inventory and category mapping.
- Confirm the name is visible above the fold and Smart Campus is the second mobile tile.
- Check edges against the optional debug grid at 1920, 1280, 768, and 390px widths.
- Confirm no horizontal scrolling, no neon colors, correct contrast, functioning hover/tooltip/expansion/Escape behavior, and reduced-motion support.
