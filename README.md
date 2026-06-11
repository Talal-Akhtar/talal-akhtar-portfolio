# Muhammad Talal Akhtar — Developer Portfolio

A personal portfolio website built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools — just clean, production-ready front-end code designed and animated to showcase full-stack development and C++ engineering work.

---

## Live Preview

> Replace this line with your deployed URL once hosted.

---

## Project Structure

```
portfolio/
├── index.html                     # All markup and page structure
├── style.css                      # All styles including animations
├── script.js                      # All interactions and motion logic
├── Muhammad Talal.png             # Profile photo (about section)
└── Muhammad_Talal_Akhtar_Resume.pdf   # Downloadable résumé
```

---

## Sections

| Section | ID | Description |
|---|---|---|
| Loader | `#loader` | Animated progress counter, slides up on complete |
| Hero | `#hero` | Name, typewriter role, CTA buttons, floating orbs |
| Marquee | — | Scrolling tech stack ticker |
| About | `#about` | Photo, bio, skill tags |
| Skills | `#skills` | Four gradient cards with icon and tag breakdown |
| Projects | `#projects` | Three project cards with GitHub links |
| Education | `#education` | Timeline layout with FAST-NUCES degree |
| Contact | `#contact` | Email link, GitHub, LinkedIn, résumé download |
| Footer | `<footer>` | Copyright and back-to-top |

---

## Tech Stack

- **HTML5** — semantic markup, ARIA attributes, accessible mobile menu
- **CSS3** — custom properties, clamp(), Grid, Flexbox, `@keyframes`, `will-change`
- **Vanilla JavaScript** — no libraries, no dependencies
- **Google Fonts** — Space Grotesk · Inter · JetBrains Mono (loaded via `<link>`)

---

## Features

### Animations & Motion
All animations follow the **Motion-Driven** design system:
- Micro-interactions run at **150–300ms** with `ease-out` easing
- Scroll reveals run at **350–400ms** max
- `prefers-reduced-motion` is respected — all animations disable cleanly
- GPU acceleration via `will-change: transform` on interactive cards only

### Custom Cursor (desktop)
- Small dot snaps to mouse position instantly (no lag)
- Outer ring follows with a `0.35` lerp factor — fast but premium-feeling
- Both elements expand on hover over links and buttons
- Hidden automatically on touch devices

### Scroll Reveal
- `IntersectionObserver` triggers `.visible` class on elements as they enter the viewport
- Skill cards and project cards stagger in with 100–110ms delay between each
- Education items slide in from the left
- Hero elements reveal sequentially after the loader exits

### Typewriter
- Cycles through three role strings: `Full-Stack Developer`, `CS Student @ FAST-NUCES`, `Open to Internships and Junior Roles`
- Types at 72ms per character, deletes at 42ms, holds for 1800ms at full string
- Starts after loader finishes (2200ms delay)

### Navigation
- Sticky nav with glassmorphism blur on scroll (`scrolled` class at `scrollY > 50`)
- Active section highlighted via `IntersectionObserver` with `-40%/-55%` root margin
- Hamburger menu on mobile — slides in from the right with staggered link entrance

### Other Interactions
- **3D card tilt** on project cards — `perspective(900px)` rotateX/Y tracking mouse position
- **Skill card sibling dim** — non-hovered cards drop to 50% opacity
- **Orb parallax** — hero background orbs drift at different speeds on scroll
- **Scroll progress bar** — 2px gradient line at the top of the viewport
- **Magnetic hover** — buttons subtly follow the mouse (±4px), desktop only
- **Marquee pause** — tech ticker pauses on hover

---

## Customisation

### Update personal details
All content lives in `index.html`. No JavaScript config needed.

| What | Where in `index.html` |
|---|---|
| Name and title | `<title>` tag and `.hero-name` |
| Typewriter roles | `roles` array in `script.js` (line ~151) |
| About text | `#about .about-body` |
| Skill cards | `#skills .sk-card` (×4) |
| Projects | `#projects .proj-card` (×3) — update `href` on `.proj-link` and `.proj-gh` |
| Education | `#education .edu-card` |
| Email | `href` on `.email-link` (Gmail compose URL) |
| GitHub / LinkedIn | `href` on `.social-btn` |
| Resume file | Replace `Muhammad_Talal_Akhtar_Resume.pdf`, keep the same filename or update all `download` attributes |
| Profile photo | Replace `Muhammad Talal.png`, keep the same filename or update the `src` in `#about img` |

### Change accent color
One variable controls the primary accent throughout:

```css
/* style.css — :root */
--accent: #6B5CE7;   /* purple — change this */
--accent2: #0099CC;  /* blue   — used in gradients */
--accent3: #7C4DFF;  /* violet — used in headings */
```

### Add a project card
Copy any `.proj-card` block in `index.html` and update:
- `.proj-num` — e.g. `04`
- `.proj-stack span` — tech tags
- `.proj-title` — project name
- `.proj-desc` — one-paragraph description
- `.proj-link` and `.proj-gh` `href` — your GitHub URL

---

## Deployment

This is a static site — no server, no build step required. Drop the four files into any static host.

### Recommended hosts (free tier)
- **Vercel** — drag and drop the folder at vercel.com/new
- **Netlify** — drag and drop at app.netlify.com/drop
- **GitHub Pages** — push to a repo, enable Pages under Settings → Pages → Deploy from branch

### Custom domain
After deploying, add a custom domain in your host's dashboard. Update the `<meta name="description">` and any canonical URL tags in `<head>` if you add SEO meta tags later.

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 90+ | ✅ Full |
| Safari 15+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile (iOS/Android) | ✅ Full — cursor disabled, touch targets ≥44px |

`backdrop-filter` (nav blur) degrades gracefully in unsupported browsers — the nav background becomes solid instead of frosted.

---

## Accessibility

- Keyboard navigable — all interactive elements are focusable
- `aria-label` on burger button and mobile menu
- `aria-hidden="true"` on the cursor element
- `alt` text on the profile photo
- `prefers-reduced-motion` disables all transitions and keyframe animations
- Color contrast passes WCAG AA for all body text against section backgrounds

---

## License

This portfolio is personal work. Feel free to use the code structure as a reference or starting point for your own portfolio — just replace the content, name, and branding with your own.
