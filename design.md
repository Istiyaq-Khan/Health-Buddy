# Design System — স্বাস্থ্যসাথী (Health Buddy)

A locked design system for the **স্বাস্থ্যসাথী** medical AI and health assistance platform. All frontend pages share this core visual language, color tokens, typography, and component styling.

## Genre
**modern-minimal / dark-tech medical** (Sleek, trustworthy, high-contrast, emerald-accented dark mode optimized for readability in Bengali and English).

## Macrostructure Families
- **Landing / Marketing Page (Home)**: Marquee Hero + Feature Grid + Interactive Workflow Showcase + Benefits Section + Modern Footer.
- **Application Pages (Dashboard, Analyze, TalkWithDoctor, NearHospitals)**: Workbench layout with glassmorphic cards, clear visual hierarchy, quick-filter chips, sticky sidebars, and real-time interaction states.
- **Information / About Page**: Content Document with tech stack badges, mission callouts, and credit cards.

## Color Tokens & Palette
- `--color-paper`: `oklch(0.14 0.025 165)` (`#09100e`) — Deep midnight emerald canvas
- `--color-paper-surface`: `oklch(0.18 0.03 165)` (`#0f1916`) — Card surface background
- `--color-paper-elevated`: `oklch(0.22 0.035 165)` (`#162420`) — Hover & active cards
- `--color-ink`: `oklch(0.96 0.01 165)` (`#f0fdf4`) — Primary high-contrast text
- `--color-ink-muted`: `oklch(0.70 0.03 165)` (`#94a3b8`) — Secondary supporting text
- `--color-rule`: `oklch(0.25 0.035 165 / 0.6)` — Subtle card borders
- `--color-accent`: `oklch(0.72 0.19 155)` (`#10b981`) — Vibrant medical emerald accent
- `--color-accent-glow`: `rgba(16, 185, 129, 0.15)` — Glassmorphism glow
- `--color-accent-hover`: `oklch(0.78 0.18 155)` (`#34d399`) — Active / hover emerald
- `--color-danger`: `oklch(0.65 0.22 25)` (`#f43f5e`) — Disease risk / urgent alerts
- `--color-warning`: `oklch(0.78 0.16 75)` (`#f59e0b`) — Doctor alerts / warnings
- `--color-cyan`: `oklch(0.75 0.15 210)` (`#06b6d4`) — Vitamin & supplement highlights
- `--color-focus`: `oklch(0.72 0.19 155 / 0.5)` — Outline focus state

## Typography
- **Display & Headings**: `"Outfit"`, `"Poppins"`, `"Hind Siliguri"`, sans-serif
- **Body & UI**: `"Hind Siliguri"`, `"Inter"`, system-ui, sans-serif
- **Mono**: `"Fira Code"`, monospace

## Component Specifications
- **Navbar**: Translucent glassmorphism header with active link indicators, brand badge, user avatar pill, and responsive slide drawer.
- **Buttons**: Rounded-xl pills with smooth hover lift (`translateY(-2px)`), subtle glow shadow, disabled loading state spinners.
- **Cards**: Bordered glass cards (`backdrop-filter: blur(12px)`), subtle emerald hairline borders, hover lighting effects.
- **Badges**: Status chips with low-opacity pill backgrounds and matching text colors.
- **Form Controls**: Custom dark inputs with emerald glow outline on focus, quick symptom tags.

## State Discipline (8-State Compliance)
All interactive elements support:
1. `default`
2. `hover`
3. `:focus-visible`
4. `:active`
5. `disabled`
6. `loading`
7. `error`
8. `success`
