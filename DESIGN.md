# Sanskar Solapure — Premium Bento Portfolio Specification

## Phase and reference note

This document is the Phase 2 design and implementation specification. It supersedes the current mosaic composition, its category tile colors, and its tile-flipping interactions. The portfolio remains a React + Vite application using JavaScript and vanilla CSS.

The screen recording identified by the user is the intended primary reference. It was not available in the current project/session context during this specification phase. The layout below therefore follows the requested page sections and hierarchy, but its exact arrangement, proportions, navigation treatment, and spacing still need visual comparison with that recording before implementation is considered reference-matched. Do not copy another developer's identity or personal information.

## Design principles

- Build a calm, premium dark interface from rounded rectangular cards arranged on a consistent Bento grid.
- Let content determine card size and hierarchy. Projects and the hero receive the strongest emphasis; supporting facts and links remain quieter.
- Use a shared spacing, radius, typography, and color system. Align card edges to the grid and keep gutters consistent.
- Use indigo surfaces as the dominant color. Reserve cyan for restrained focus, border, and hover emphasis; coral for primary actions; crimson for small accents; lime for status and real GitHub activity.
- Use subtle borders and soft shadows to separate surfaces. Avoid neon bloom, strong gradients, decorative clutter, and continuous motion.
- Keep every visible claim grounded in the current repository or information supplied by Sanskar. Do not invent experience, awards, statistics, project results, contribution data, or active work.
- Do not carry forward the existing mosaic or any tile-flipping behavior.

## Color tokens

Define the palette once in `src/styles/global.css`. Components and section styles should reference tokens instead of repeating raw colors.

| Token | Value | Intended use |
| --- | --- | --- |
| `--color-background` | `#17142A` | Page canvas |
| `--color-card-primary` | `#51449A` | Hero and featured project surfaces |
| `--color-card-secondary` | `#302A50` | Supporting cards and inset areas |
| `--color-highlight` | `#00FFFF` | Thin borders, focus rings, small interactive accents |
| `--color-text-primary` | `#F2F4F7` | Main headings and body text |
| `--color-text-secondary` | `#C5C2D6` | Supporting copy and metadata |
| `--color-button-primary` | `#FF654A` | Primary CTA backgrounds |
| `--color-accent-small` | `#E65378` | Small decorative/status accents only |
| `--color-status-success` | `#70D65E` | Positive status indicators and GitHub activity intensity |
| `--color-linkedin` | `#0A66C2` | LinkedIn link or icon accent |
| `--color-linkedin-hover` | `#004182` | LinkedIn hover/active state |

Use the page background for primary CTA text on coral; this pair has approximately 6.16:1 contrast. Primary text on the primary card is approximately 7.21:1, and secondary text on the secondary card is approximately 7.67:1. Preserve at least 4.5:1 contrast for normal text and 3:1 for large text and meaningful interface boundaries. Do not use cyan or crimson for long copy. Recheck all actual foreground/background pairs when coding.

### GitHub graph colors

The contribution graph is the deliberate exception to the portfolio card palette: preserve the recognizable GitHub-style muted gray empty cells and green activity levels. Prefer the actual day colors and intensity scale returned by GitHub's contribution calendar rather than generating or estimating levels. Keep the graph on a dark/gray neutral inset surface with accessible labels and a legend. Do not recolor its levels cyan or coral.

## Typography

- Use a clean sans-serif family for the interface, such as `Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`; do not add a font dependency or remote font request for this phase.
- Use a clearly differentiated, heavy display treatment for the hero name. Keep supporting text and controls in the same sans-serif family.
- Suggested desktop scale: hero name 56–72px; page/section titles 28–36px; card titles 18–24px; body 16–18px; metadata 12–14px. Use `clamp()` to scale fluidly.
- Suggested mobile scale: hero name 40–52px; section titles 24–30px; card titles 18–22px; body at least 16px; metadata at least 12px.
- Use a compact line-height for display headings and a comfortable 1.45–1.65 line-height for body copy. Avoid all-caps for paragraphs and long labels.
- If a specific display font is important to matching the recording, request or supply its licensed font asset before implementation. No font files currently exist in the repository.

## Spacing, shape, and surface system

- Use a 4px base rhythm: 4, 8, 12, 16, 24, 32, 40, 48, 64, and 80px.
- Desktop grid gap: 20–24px. Tablet gap: 16–20px. Mobile gap: 12–16px.
- Card padding: 24–32px desktop, 20–24px tablet, and 18–20px mobile. Keep text away from card edges.
- Use consistent rounded rectangles: 20–24px radius for large cards and 16–20px for compact cards and controls. Avoid pill-shaped cards.
- Use a 1px cyan-tinted border at low opacity for primary card boundaries and stronger cyan only for hover/focus. Borders must remain visible without reading as neon.
- Use broad, low-opacity shadows to establish depth. Avoid multiple stacked shadows and heavy blur.
- Prefer restrained transitions on color, border, and a small elevation change. Cards must not jump, rotate, flip, expand, or shift neighboring layout on hover.

## Bento grid and desktop composition

Use one centered page container, a maximum width near 1440px, and a 12-column desktop grid. The navbar sits above the page grid. All page sections share the same outer alignment and gutter scale.

The following is the proposed content hierarchy and card map pending comparison with the unavailable recording:

```text
┌────────────────────────────────────────────────────┬──────────────────────────┐
│ HERO: name, role, short intro, CTA, profile image   │ GITHUB STATS             │
│                                                    ├──────────────────────────┤
│                                                    │ CURRENTLY BUILDING*      │
├────────────────────────────────────────────────────┴──────────────────────────┤
│ CONTRIBUTION GRAPH (wide)                           │ SKILLS & TOOLING         │
├────────────────────────────────────────────────────┴──────────────────────────┤
│ PROJECTS: Smart Campus featured (wide)              │ Other verified projects  │
│                                                     │ in compact cards         │
├────────────────────────┬───────────────────────────┬──────────────────────────┤
│ ABOUT                  │ EDUCATION                 │ OPEN SOURCE*             │
├────────────────────────┴───────────────────────────┴──────────────────────────┤
│ EXPERIENCE* — include only when verified information is supplied             │
├───────────────────────────────────────────────────────────────────────────────┤
│ CONTACT CTA                                                                   │
└───────────────────────────────────────────────────────────────────────────────┘
Navbar above; footer below. *Conditional on verified information being available.
```

### Section placement and purpose

1. **Navbar:** A compact top bar with the Sanskar wordmark/name, in-page links, a resume action, and a clear contact CTA. Keep it visually quiet so the hero remains the first focal point.
2. **Hero and profile photo:** The largest initial card. Show “Sanskar Solapure”, “Frontend Developer / CSE Student”, and a concise Pune/AISSMS context with “View projects” and “Email me” actions. Use a supplied real profile photo in a cropped portrait frame. There is no portrait in the repository; until Sanskar supplies one, use a restrained `SS` monogram treatment or omit the image slot—never use an unrelated stock portrait or fabricate a likeness.
3. **GitHub statistics:** A compact card for only verifiable, live public profile metrics (for example, public repository and follower counts if sourced). Label the source and refresh time. If data is unavailable, show a clear unavailable state or omit the metrics; never render fabricated numbers or zero as a fallback.
4. **GitHub contribution graph:** A wide card with a GitHub-style calendar, month/day labels, intensity legend, accessible text summary, and source attribution. Use only real returned contribution data.
5. **Skills and tooling:** A concise card grouping verified skills: C++, Python, JavaScript, React, HTML, CSS, and Supabase. Git, VS Code, DSA learning, or SQL learning may be included only where supported by the current verified profile information; do not assign proficiency scores. Keep GitHub as a profile destination, not a duplicate skill entry.
6. **Currently building:** A supporting card for a project explicitly confirmed as active. Smart Campus is the verified featured project, but the repository does not establish that it is currently in progress. Show this section only if active status is confirmed; otherwise omit the card rather than imply ongoing work.
7. **About:** Short verified introduction: Sanskar is a Computer Science Engineering student at AISSMS Institute of Information Technology, Pune, expected to graduate in 2029. Do not add unverified biography or career history.
8. **Open source:** A card for verified public contributions or maintainership, with direct repository links. The current repository lists personal projects but does not establish external open-source contributions. Hide this card until there are verified contribution details; do not equate a personal GitHub project with outside contributions.
9. **Education:** B.E. / Computer Science Engineering at AISSMS Institute of Information Technology, Pune; expected graduation 2029. Use the degree wording supplied by Sanskar and keep the date clearly marked as expected.
10. **Experience:** Include only verified roles, organization names, dates, and responsibilities supplied by Sanskar. No employment history is currently verified. Omit the section/card until accurate content is available; do not imply that no experience exists.
11. **Projects:** Give Smart Campus the featured card and strongest project treatment. Preserve the three other currently documented projects as secondary cards: CampusCode - ReBuild '26 Round 2, CampusCode Dashboard Recreation: ReBuild '26 (Round 1), and YouTube Landing Page. Keep their existing verified descriptions and repository URLs from `src/data/tiles.js`; do not add outcomes, screenshots, or features that are not present in those repositories. The existing `public/assets/smart-campus.png` may be used for Smart Campus only.
12. **Contact:** A clear email-focused CTA using `mailto:solapuresanskar01@gmail.com`, with supplied GitHub, LinkedIn, and LeetCode destinations as secondary actions. Do not publish the phone number from the resume and do not introduce a form without a backend and a defined privacy/handling policy.
13. **Footer:** Name, compact section links, and verified profile destinations. A copyright year may be generated from the current date at runtime. Do not add generic claims or unsupported badges.

Keep the project section the main content showcase after the hero/GitHub overview. Use card spans to create deliberate hierarchy, not an equal grid of identical small cards. Provide enough room for the Smart Campus overview, the other verified project summaries, and their repository actions without making any card depend on hover for essential information.

## Content and link source of truth

- Name: Sanskar Solapure.
- Role: Frontend Developer / CSE Student (use this supplied combined role; do not imply a job title or employment relationship).
- College: AISSMS Institute of Information Technology, Pune.
- Degree: Computer Science Engineering.
- Graduation: expected 2029.
- Email: `solapuresanskar01@gmail.com`.
- GitHub: `https://github.com/solapuresanskar01-spec`.
- LinkedIn: `https://www.linkedin.com/in/sanskar-solapure-0150413a1/`.
- LeetCode: `https://leetcode.com/u/sanskarsolapure/`.
- Do not display the phone number contained in the resume anywhere on the page, metadata, or analytics.
- External links should open in a new tab only where useful and use `rel="noopener noreferrer"`.
- Keep project details and links sourced from `src/data/tiles.js` until data is deliberately reorganized. Do not add project claims from memory.

### Resume asset discrepancy

Use the supplied resume at `public/assets/Sanskar_Solapure_Resume.pdf` for the website resume link and preview. The current repository inspection found `public/assets/Sanskar_Solapure_Frontend_Developer_Resume.pdf` and did not find the requested filename. Keep the existing PDF untouched; do not delete, overwrite, or rename it. Make the supplied file available at the specified path before connecting the UI. Resume controls may offer view/download; do not label the PDF as a WEBP. Keep its phone number private from the site UI.

## GitHub statistics and contribution data

The current codebase contains a GitHub profile link only; it has no stats service or contribution graph. Do not draw a hand-authored calendar or use random/demo contribution values.

For genuine contribution activity, use GitHub's GraphQL `contributionsCollection.contributionCalendar` and its day `date`, `contributionCount`, `contributionLevel`, and `color` fields. GitHub documents the contribution calendar fields and GraphQL authentication in its [GraphQL user reference](https://docs.github.com/en/graphql/reference/users) and [GraphQL call guide](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql).

GraphQL authentication requires a credential. If this portfolio is deployed on Vercel, request the calendar through a small server-side Vercel Function, read a least-privilege token from a server-only environment secret, and return only the public fields needed by the UI. Do not use a `VITE_`-prefixed token, embed a token in client JavaScript, commit a secret, or expose it in logs. Vercel documents function runtime environment variables as a place for sensitive values in its [environment variable documentation](https://vercel.com/docs/environment-variables).

Cache the response server-side with a reasonable refresh interval and expose no private-repository contribution details. The user profile is `solapuresanskar01-spec`; display only data GitHub returns for that profile. On request failure, rate limiting, or missing configuration, replace the graph with an honest message such as “Contribution history is temporarily unavailable.” Keep the stats card unavailable/omitted too; do not convert a failed request into zeros or invent an update time. The contribution graph's visible legend and accessible labels must describe the actual data.

This requires a server-side endpoint and Vercel environment configuration that do not exist in the current repository. If that infrastructure is not approved or available, defer the live graph and explain why; never put a personal access token in the frontend to make the graph work.

## Responsive behavior

Use content-first CSS Grid and Flexbox. Prevent page-level horizontal scrolling at all breakpoints. Cards should reflow and grow vertically; do not crop essential copy to preserve desktop proportions.

### Desktop: 1200px and wider

- Center a 12-column grid in a max-width container (about 1440px).
- Use 20–24px gutters and consistent outer padding.
- Hero: 8 columns; GitHub stats and conditional current-build card: 4-column right rail.
- Contribution graph: 8 columns; skills: 4 columns.
- Projects: 12-column section. Smart Campus spans about 7–8 columns; secondary verified projects occupy the remaining columns in balanced cards.
- About, Education, and conditional Open Source cards can each use 4 columns. Experience occupies a balanced span only when content exists.
- Contact can span the full grid as a distinct CTA band.

### Tablet: 640–1199px

- Use an 8-column grid with 16–20px gaps and reduced outer padding.
- Hero and stats may use a 5/3 split when both cards remain readable; otherwise stack them.
- Contribution graph spans all columns; skills may sit beside a compact stats/current-build card only if their content remains readable.
- Keep Smart Campus first and visually featured. Secondary projects may use two columns; stack when each card would become too narrow.
- Reflow About, Education, Open Source, and Experience to two columns, then one where needed.

### Mobile: below 640px

- Use a single-column layout with 12–16px gaps and 16–20px page padding.
- Order content: Navbar, Hero, GitHub stats, contribution graph, Skills, conditional Currently Building, Projects (Smart Campus first), About, Education, conditional Open Source, conditional Experience, Contact, Footer.
- Keep all project cards full width and tall enough for their title, summary, and action. Stack rather than squeeze.
- Crop the profile image to a square or portrait frame without stretching; use the monogram fallback if no portrait was supplied.
- Scale headings with `clamp()` and allow normal text wrapping. Keep buttons at least 44px high and avoid horizontal scrolling except within a deliberately scrollable graph if a user elects that design.
- Replace desktop navigation links with a compact menu button. The menu must expose its expanded/collapsed state, provide large tap targets, close after a section link is selected, and remain keyboard operable. Keep a visible email CTA accessible without opening the menu if the reference supports it.

## Navigation and interaction behavior

- Use semantic in-page anchor links for Projects, Skills, About, Education, and Contact. Include Experience only when a verified Experience section is rendered.
- Navbar behavior should follow the recording once it is available. Provisional behavior: normal document flow or a restrained sticky bar with a solid/mostly opaque background; no large blur. If sticky, offset anchor targets so headings are not hidden.
- Use native smooth scrolling for section links, but disable smooth scrolling under `prefers-reduced-motion: reduce`.
- Cards are informational surfaces, not buttons unless they contain a clear action. Do not make a whole card clickable when it contains multiple links. Use explicit project links/actions and a visible `:focus-visible` state.
- Card hover: subtle border brightening, slight elevation (around 2–4px), and a small shadow change. No scaling that shifts or overlaps content, no flip, no fullscreen expansion, and no pointer-following effect.
- Buttons: change background/contrast and border smoothly. Primary CTA uses coral with dark background text. Provide visible hover, active, disabled, and focus states.
- Project cards: show project title and concise verified summary without requiring hover. Use explicit repository link; if a valid live demo is later confirmed, a separate “Live demo” action may be shown. Do not fabricate a demo URL.
- Contact action uses the verified `mailto:` address. Do not collect or transmit form data.
- External social/repository actions must have understandable labels and safe new-tab attributes.
- Do not carry forward the current tooltip or independent tile-flip interactions unless the supplied recording explicitly shows equivalent behavior and accessibility is preserved.

## Accessibility and motion

- Use a single native `<h1>` for “Sanskar Solapure”; use hierarchical section headings (`<h2>`, then card `<h3>` as appropriate).
- Use `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>` landmarks. Give repeated sections clear accessible names.
- Use anchors for navigation/destinations and buttons only for actions. All links and menu controls must work by keyboard and touch.
- Provide a clear cyan `:focus-visible` outline with adequate offset and contrast. Never remove browser focus without a replacement.
- Do not use color alone to convey graph intensity or status; include labels, a legend, and an accessible text alternative for the graph.
- Supply meaningful alt text for the portrait and project image, or empty alt text when an image is decorative. Do not use the Smart Campus screenshot as the profile portrait.
- Maintain WCAG AA contrast for text and visible control states. Do not put secondary text over the primary background without rechecking its contrast.
- Respect `prefers-reduced-motion`: remove nonessential card movement, smooth scroll, and entrance animation. Keep state changes immediate and all content available.
- Ensure the mobile menu is announced with `aria-expanded` and `aria-controls`; ensure its state is understandable without visual animation.
- Avoid hover-only instructions, content, metrics, or controls.

## Recommended React architecture

Keep the project in React, Vite, JavaScript, and vanilla CSS. Reorganize only where it reduces coupling; avoid adding a component library or animation package.

```text
src/
  App.jsx
  main.jsx
  components/
    Navbar.jsx
    BentoGrid.jsx
    BentoCard.jsx
    HeroCard.jsx
    GithubStatsCard.jsx
    ContributionGraph.jsx
    SkillsCard.jsx
    ProjectCard.jsx
    AboutCard.jsx
    EducationCard.jsx
    ContactCard.jsx
    Footer.jsx
  data/
    portfolio.js
    projects.js
    skills.js
  hooks/
    useReducedMotion.js (only if shared behavior requires a hook)
  styles/
    tokens.css or global.css
    layout.css
    components.css
public/
  assets/
    smart-campus.png
    Sanskar_Solapure_Resume.pdf (once supplied at this path)
    [profile photo only after supplied]
api/
  github-contributions.js (Vercel Function, only if live GitHub data is approved)
```

The existing architecture currently has only `App.jsx`, `TileFlip.jsx`, `tiles.js`, and two stylesheet files. `TileFlip.jsx` and the mosaic-specific rules in `src/styles/mosaic.css` should be replaced or retired during implementation; their flip behavior and mosaic placement are not part of this design. Keep `main.jsx` as the React bootstrap. Move verified content into data modules as the layout is split into meaningful section components. Do not create an API function until the data flow and Vercel secret are approved.

## Implementation and verification sequence

1. Confirm the recording/reference is available and reconcile the exact card placement, navbar behavior, and spacing against this provisional map.
2. Confirm the resume path and supply a real profile photo or approve the monogram fallback. Confirm whether Smart Campus is actively being built and provide verified experience/open-source details if those cards should appear.
3. Confirm the GitHub contribution graph approach and Vercel server-side secret configuration. If not approved, leave graph/stats in an honest unavailable state or omit them.
4. Update the React component structure and semantic navigation; replace mosaic/flip UI with the Bento layout.
5. Establish color, type, spacing, radius, and responsive tokens in shared CSS.
6. Add verified content and explicit destinations. Check that the phone number is absent from UI, metadata, and bundled client text.
7. Add real GitHub data, caching, loading/error states, and graph accessibility only after server-side credentials are configured.
8. Verify desktop, tablet, and mobile card order, wrapping, page overflow, focus visibility, keyboard/touch navigation, reduced motion, contrast, links, resume delivery, and honest data fallbacks. Then run `npm run lint` and `npm run build`.

## Open items before implementation

- The primary recording/reference needs to be available in the implementation context to validate exact composition and navigation behavior.
- The supplied resume path is `public/assets/Sanskar_Solapure_Resume.pdf`, but that exact file was not found during this inspection. The existing `public/assets/Sanskar_Solapure_Frontend_Developer_Resume.pdf` was left untouched; provide the supplied file at the requested path before implementation.
- No profile photo is present. Supply one or use the `SS` monogram fallback.
- Confirm whether Smart Campus is currently active work. The repository verifies it as a featured project, not an in-progress status.
- No employment history or outside open-source contribution details are verified. Supply any content that should appear in those sections; otherwise those cards stay omitted.
- No GitHub graph service or Vercel Function exists. Approve/use server-side GitHub GraphQL credentials through Vercel environment secrets, or defer live stats and graph.
- The repository has no valid live-demo destination configured in project data. Only add one after its URL and availability are verified.
