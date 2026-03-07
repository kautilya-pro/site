# ADR-0002: Hybrid Reading Experience (Theme-Aware Typography)

- **Status**: Accepted
- **Date**: 2026-03-07
- **Author**: Antigravity (on behalf of Kautilya Bhardwaj)

## Context

The repository hosts long-form articles (2,000+ words). The original design used an AMOLED black background (`#000000`) with high-contrast amber accents. While visually striking and power-efficient for mobile OLED displays, pure black backgrounds present clear accessibility and readability challenges for sustained, long-form reading:

1. **Halation (Glow/Blur)**: High-contrast light text on pure black often creates a "glow" or "haloing" effect for readers with astigmatism (approx. 33% of the population).
2. **Visual Fatigue**: Extreme contrast ratios increase eye strain over time.
3. **Black Smearing**: Slow pixel transition times on many OLED screens cause "ghosting" or "smearing" when scrolling text on pure black.
4. **Cognitive Load**: Complex background textures (like blueprint grids) distract from deep reading flow.

## Decision

Implement a **"Hybrid" Reading Surface** that separates the site's brand "shell" from the article's reading "canvas."

### 1. Scoped Theme-Aware Palette

Instead of a site-wide light/dark toggle that might break established branding for the header, footer, and homepage, we implement a theme-aware palette scoped **only** to the `.article-content` container in `BlogPost.astro`.

- **Site Shell**: Retains the branded dark theme (#09090b canvas, amber accents).
- **Reading Surface**: Uses CSS `light-dark()` with `color-scheme: light dark` on the article container.
- **Colors (Light)**: Soft paper background (`#fdfdfc`), dark charcoal text (`#2c2c2c`), blue accents (`#2563eb`).
- **Colors (Dark)**: Soft slate background (`#1a1a1a` — avoid pure black), off-white text (`#e0e0e0`), muted blue accents (`#60a5fa`).

### 2. Premium Typography and Fluid Rhythm

- **Font Stack**: Shift from `Merriweather` to `Lora` (serif) for body text for improved legibility. Use `Inter` (sans-serif) for headings to provide clear structural hierarchy.
- **Fluid Scaling**: Use `clamp(1.125rem, 1vw + 1rem, 1.25rem)` to ensure the font size feels "premium" and appropriate for the screen size without being overwhelming.
- **Advanced Line Height**: Set to `1.75` for optimal vertical rhythm.
- **Modern Wrapping**: Apply `text-wrap: pretty` to paragraphs and `text-wrap: balance` to headings to prevent orphans and widows.

### 3. Visual Anchors (Drop Caps and Blockquotes)

- **Drop Caps**: Use robust CSS (`:first-of-type::first-letter`) to provide high-quality visual entry points for the first paragraph and paragraphs following `h2` headings.
- **Rich Blockquotes**: Use high-visibility left borders and subtle background tints to clearly demarcate secondary content without breaking flow.

### 4. Native Progress Tracking

Implement a **scroll-driven progress bar** fixed to the top of the viewport using native CSS `animation-timeline: scroll(root)`. This provides immediate, low-latency feedback on reading progress without requiring heavy client-side JavaScript.

## Rejected Alternatives

| Alternative              | Rejection Reason                                                                                                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Global Light/Dark Toggle | Excessive design debt for the initial launch. Requires auditing every component (homepage, bio, social links) for light-mode contrast.                                        |
| Pure AMOLED Black        | Rejected on readability grounds for long-form (2,000+ words) content as per modern accessibility best practices.                                                              |
| Heavy background texture | Grid/blueprint textures are kept for the site "shell" background but removed from the article canvas to reduce cognitive load and visual noise while reading.                 |
| JS-based Progress Bar    | Violates the architectural goal of "Near-zero client JS." Native CSS `scroll()` is faster, smoother, and handles graceful degradation in non-Chromium browsers automatically. |

## Consequences

- **Improved Readability**: The site now supports high-quality reading in both light and dark system preferences.
- **Design Consistency**: The brand remains "dark-first" on navigation and home surfaces, while providing a professional, low-fatigue surface for content.
- **Modern Browser Dependency**: Features like `light-dark()` and `animation-timeline` require modern evergreen browsers (circa 2024+). Fallbacks (standard dark theme behaviors) are used for older clients.
- **Content Authoring**: Markdown authors must use `h2` for major sections to benefit from the automatic drop-cap logic.
