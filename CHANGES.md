# CHANGES.md – Portfolio Redesign V3.0

This document lists all the major changes and upgrades implemented in the Version 3.0 redesign of the portfolio.

## 🚀 Visual Upgrades
- **Mohanad ElAdl Wordmark Logo**: Replaced the "M." token with a full-name wordmark styled with a neon blue glow (`text-shadow`).
- **Floating Orbs**: Added 4 semi-transparent glowing orbs (blue and purple) in the hero section that move slowly and pulse via CSS animations.
- **Neuron Particle Network**: Implemented a responsive vanilla JS canvas background in the hero section showing connected dots (neurons) that reinforce the AI theme.
- **Neon Cursor Trail**: Added a JavaScript-based neon streak (blue-to-purple) that follows the mouse cursor on desktop devices.
- **Section Headings**: Applied a neon `text-shadow` glow to all `<h2>` section titles.
- **Nav Underline**: Added an animated, glowing gradient underline that expands on hover for all nav links.
- **Skill Badge Glow**: Each technology badge now features a soft, pulsing glow animation.
- **Parallax Background**: The hero background now moves at a slower rate than the foreground during scrolling for depth.

## 📁 Project Card Overhaul
- **Project Screenshots**: Integrated user-provided screenshots (`fire-escape.png`, `stock-analysis.png`, `article-api.png`) into each project card.
- **Neon Border Frames**: Each project image is encased in a subtle neon-bordered frame.
- **Hover Overlay**: Project images now feature a dark semi-transparent overlay on hover that displays the tech stack tags centered.
- **Card Motion**: Project cards lift (`translateY(-8px)`) and gain an external neon glow on hover.

## 📝 Content & Fixes
- **Hero Slogan**: Updated to "Building Intelligent Systems. Solving Real Problems."
- **About Me**: Rewritten to be more personal and narrative-driven.
- **Additional Skills**: Added TensorFlow, NLP, Computer Vision, JavaScript, React.js, and Pygame as glowing badge pills.
- **Contact Info**: Completely removed the phone number for privacy.
- **Article API Card**: Removed the "View Project" button entirely as requested.
- **Resume Button**: Verified link to `resume.pdf` in the root directory.

## ⚙️ Performance & Accessibility
- **GPU Acceleration**: All animations are restricted to `transform` and `opacity` properties for smoothness.
- **Reduced Motion**: Added a `prefers-reduced-motion` media query to disable all intensive animations (orbs, particles, cursor trail, reveals) for accessibility.
- **Responsive Animations**: Reduced particle count and disabled cursor trail on mobile screens (< 768px) to save battery and maintain performance.
- **Semantic HTML**: Added proper ARIA labels and alt text to all new visual elements and images.
