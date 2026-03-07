# CHANGES.md – Portfolio Redesign

## Version 2.0 — March 2026

### Visual Upgrades
- **Floating orbs**: Electric blue, purple, and cyan animated light orbs in the hero section that float and pulse via CSS keyframe animations
- **Cursor trail**: Canvas-based neon cursor streak that follows mouse movement with a gradient blue → purple → cyan trail (disabled on mobile/touch)
- **Neon section headings**: `text-shadow` pulse animation applied to all section titles (`.neon-heading`)
- **Glowing nav underline**: Navbar links have a gradient underline with glow on hover
- **Project card border glow**: Animated conic-gradient neon border lights up card edges on hover
- **Card hover overlay**: Hovering a project card reveals a translucent panel showing the tech stack prominently
- **Skill badge pulse**: Each technology badge softly pulses with a blue/purple glow, staggered per badge
- **Particle network**: Re-added connected-neuron particle animation in the hero (fewer particles on mobile)

### New Animations & Interactions
- **Loading screen** (1.5s): "M." logo glows and a progress bar fills before fading out to the homepage
- **Hero name typewriter**: "Mohanad ElAdl" types character by character on load, then hands off to the role typer
- **Role typed text**: AI Engineer / Researcher / Innovator / Builder cycles as before
- **Parallax hero**: Hero CSS gradient background moves at 40% scroll speed using `requestAnimationFrame`
- **Lift on hover**: Project cards lift 10px with a coloured shadow on hover (GPU-accelerated)

### Content Improvements
- **New slogan**: "Building Intelligent Systems. Solving Real Problems."
- **Rewritten About Me**: Personal, first-person narrative replacing the CV-style summary
- **6 new skill badges**: TensorFlow, NLP, Computer Vision, JavaScript, React.js, Pygame (total: 12 badges)
- **Section order**: Home → Projects → About → Skills → Contact (Projects now first for recruiters)

### Fixes
- **Download Résumé button**: Points directly to `resume.pdf` with `download` attribute
- **Article Management API card**: "View Project" replaced with greyed-out "Link Coming Soon" label — no dead `#` href
- **Phone number removed**: Contact section and footer now show only email and LinkedIn

### Performance & Accessibility
- All animations use `transform` and `opacity` only (GPU-accelerated)
- `prefers-reduced-motion` disables orbs, cursor trail, typewriters, and all keyframe animations
- Touch/hover detection disables cursor trail on mobile
- Particle count halved on screens < 768px
- Proper `aria-hidden`, `aria-label`, and `role` attributes on all decorative new elements
- Loading screen sets `aria-hidden="true"` and removes body scroll lock on dismiss
