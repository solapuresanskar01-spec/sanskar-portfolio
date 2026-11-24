# Sanskar Solapure Portfolio Design

## Purpose and visual structure

Keep the existing React + Vite portfolio concept, overall layout, palette, typography, and grid proportions. The desktop composition has the name tile at top-left, the four orange project tiles below it in a two-column by two-row grid, a vertical profile column on the right, and a horizontal skills strip spanning the bottom. Tablet and mobile layouts reflow these same sections without changing their order or category colors.

## Shared palette

Define the palette once in `src/styles/global.css` and use its custom properties throughout the tile styles.

| Use | Token | Color |
| --- | --- | --- |
| Project tiles only | `--project-orange` | `#FF5E00` |
| Neutral tiles | `--neutral-white` | `#FFFFFF` |
| Page background | `--neutral-ink` | `#111111` |
| Skill tiles only | `--skill-cyan` | `#00E5FF` |
| LinkedIn tile | `--linkedin-blue` | `#0A66C2` |
| GitHub profile tile | `--github-green` | `#238636` |
| LeetCode tile | `--leetcode-gray` | `#6B7280` |

Use dark text on white, orange, and cyan tiles. Use white text on the social brand-color tiles. Maintain readable contrast and keep tile colors in shared custom properties.

## Layout and tile inventory

- Keep the broad left content area and narrow right profile column in normal document flow; the profile column is not fixed or sticky.
- Keep the name tile top-left and the two-column by two-row project grid directly below it.
- Keep exactly four large project tiles in the same grid positions: Smart Campus, CampusCode - ReBuild '26 Round 2, CampusCode Dashboard Recreation: ReBuild '26 (Round 1), and YouTube Landing Page.
- The six profile tiles remain About, Resume, LinkedIn Profile, LeetCode Profile, GitHub Profile, and Contact.
- The bottom skills strip contains one unwrapped, horizontally scrollable row of exactly eight tiles: C++, Python, CSS, JavaScript, HTML, DSA - Learning, Basic Git, and GitHub. Hide the scrollbar without disabling scroll input.
- Mobile keeps Name first, Projects next in two columns where possible, profile tiles below Projects, and the skill strip last. The strip may scroll horizontally; the page itself must not.

## Verified project details

### Smart Campus

Smart Campus is a full-stack campus issue reporting and management application. Students can register and sign in, submit issues with optional photographs, and track report statuses. Administrators can review issue totals, search and filter reports, assign responsible staff categories, and update statuses. The source uses React 19, JavaScript, Vite, CSS3, Supabase Auth, Supabase Database, and Supabase Storage. Its repository is [`solapuresanskar01-spec/smart-campus`](https://github.com/solapuresanskar01-spec/smart-campus). No live demo URL is listed in the repository README or deployment configuration. Use the existing `public/assets/smart-campus.png` in the flipped project detail.

### CampusCode - ReBuild '26 Round 2

An editorial, frontend-only CampusCode landing page for the student hackathon. Verified features include navigation and hero content, an ecosystem diagram, build-loop guide, hackathon theme links, community sections, and frontend-only login/registration previews. Its source uses semantic HTML, CSS, and vanilla JavaScript. Repository: `https://github.com/solapuresanskar01-spec/campuscode-rebuild26-round2`.

### CampusCode Dashboard Recreation: ReBuild '26 (Round 1)

A frontend recreation of the CampusCode website and student portal. Verified features include the landing page, demo login with validation and CAPTCHA, demo registration, and student dashboard views for Events and My Events. Its source uses HTML5, CSS3, vanilla JavaScript, mock data, and no backend. Repository: `https://github.com/solapuresanskar01-spec/campuscode-rebuild`.

### YouTube Landing Page

The repository README only supplies the project name. Source inspection confirms a manually authored static HTML/CSS recreation of a YouTube home page, with a header/search area, icon sidebar, and responsive video-card grid using thumbnail and channel images. It includes no JavaScript file or package manifest. Repository: `https://github.com/solapuresanskar01-spec/youtube_landing_page`.

Do not invent achievements, metrics, features, screenshots, or results. Use the Smart Campus image only where supplied. The thumbnails and author images in the YouTube repository are page content, not a screenshot of the project.

## Profile, resume, and skills content

- About: Sanskar Solapure is a B.E. Computer Science Engineering student at AISSMS IIT Pune, expected 2029.
- Resume: preview and download `public/assets/sanskar-solapure-resume.webp`. Do not describe it as a PDF. The file must be present in `public/assets/` for the preview and download to work.
- LinkedIn: `https://www.linkedin.com/in/sanskar-solapure-0150413a1/`.
- LeetCode: `https://leetcode.com/u/sanskarsolapure/`.
- GitHub: `https://github.com/solapuresanskar01-spec`.
- Contact: `solapuresanskar01@gmail.com`.
- External profile and project links open in a new tab with `noopener noreferrer`.

Do not add a Location tile or invent accomplishments, metrics, work history, features, screenshots, or skill levels.

## Tile flip interaction

- The name tile, project tiles, profile tiles, and skill tiles all flip in place around the Y-axis. They retain their original dimensions and grid positions; no tile opens a fullscreen overlay or scales to a larger size.
- Each face uses the same dimensions, CSS perspective, `transform-style: preserve-3d`, and hidden backfaces. The back face keeps content within the tile and scrolls internally when needed.
- Each tile has independent flip state, so multiple tiles may remain flipped at the same time. Its visible close control flips only that tile back; Escape flips all currently open tiles back. Closing restores keyboard focus to each tile's front control.
- Keep the existing category-colored hover heat map and floating tooltips on the front faces.
- Respect `prefers-reduced-motion` by removing breathing, hover transitions, and 3D flip transitions while retaining all content and controls.
- Every tile has visible text, keyboard activation, and visible keyboard focus. Do not make essential information available only through hover.

## Quality checks

- Verify the 4 project, 6 profile, and 8 skill tile counts and each destination.
- Check desktop, tablet, and mobile layout without changing existing proportions or palette.
- Test the in-place flip and close control on all tile categories, Escape-to-close, mobile activation, and reduced motion.
- Check internal scrolling for longer tile content, resume preview/download when the WEBP asset is present, browser console, and page overflow.
