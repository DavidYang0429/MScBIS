# Design QA

## Inputs

- Selected design: `design/selected-homepage-reference.png`
- Desktop implementation: `design/implementation-home-desktop.png`
- Mobile implementation: `design/implementation-home-mobile.png`
- Tablet implementation: `design/implementation-home-tablet.png`
- Same-frame comparisons: `design/desktop-comparison-pass-1.png`, `design/desktop-comparison-pass-2.png`
- Desktop viewport: 1440 × 1024
- Tablet viewport: 768 × 1024
- Mobile viewport: 390 × 844

## Pass 1

- P1 · Responsiveness: the decorative compass extended past the tablet hero and increased the document width from 768 px to 908 px.
  - Fix: made the hero the illustration’s positioned and clipped container, then reduced the tablet offset.
  - Verification: tablet document width now equals the 768 px viewport.
- P2 · Fidelity: VuePress’s default top padding and the first illustration size pushed the section divider about 80 px below the selected design.
  - Fix: added a homepage-specific page offset, reduced the desktop illustration slot, and rebalanced the hero minimum height.
  - Verification: the first section divider is at y=560 px in the implementation and approximately y=559 px in the normalized selected design.
- P2 · Asset fidelity: the inherited red/yellow project logo did not match the editorial compass system.
  - Fix: generated and installed a real navy/burgundy compass-and-book logo asset; no CSS art, inline SVG, emoji, or placeholder was used.
- P2 · Core journey: the primary CTA originally landed on a page titled “建设中”.
  - Fix: promoted it to the 2026/27 新生指南 and added an official-source warning plus a three-step onboarding path.

## Pass 2

- Typography, burgundy/navy/ivory palette, editorial grid, hero art, dividers, border treatment, and three-column hierarchy match the selected direction.
- The CityU institutional wordmark shown in the concept was intentionally not reproduced because this is an explicitly unofficial student-maintained site; the implementation keeps a clear non-official trust label instead.
- Desktop, tablet, and mobile layouts have no horizontal overflow, clipping, overlap, or unusable controls.
- Primary CTA, desktop navigation dropdown, mobile navigation drawer, and internal route base paths work.
- Mobile CTA targets are 50 px high; visible content remains keyboard-addressable and uses semantic links and headings.
- Generated hero and logo assets retain their intended aspect ratios and remain sharp at their rendered sizes.
- Browser console contains no runtime errors. Remaining development warnings are inherited VuePress sidebar notices and Lit development-mode notices.

final result: passed
