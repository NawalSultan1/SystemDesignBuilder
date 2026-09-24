# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Phase 1 — Foundation (design system + app shell)

## Current Goal

- Implement feature unit `01-design-system`: the dark-only token layer in `app/globals.css`
  (CSS custom properties + `@theme inline` mapping) and Geist typography.

## Completed

- Boilerplate cleanup: `app/globals.css` reduced to the Tailwind import, default SVGs
  removed from `public/`, `app/page.tsx` replaced with a minimal `Ghost AI` component,
  and the app shell centered.

## In Progress

- Feature unit `01-design-system` — token layer implemented in `app/globals.css`
  (see `context/ui-context.md` § Token Mapping). Verified through a production build that the
  generated utilities resolve to the tokens (`.bg-base{background-color:var(--bg-base)}`,
  `.text-copy-primary{color:var(--text-primary)}`). Spec file
  `context/feature-specs/01-design-system.md` was empty — see Open Questions.

## Next Up

- Confirm the intent of `context/feature-specs/01-design-system.md` before treating unit 01
  as closed (see Open Questions).
- shadcn/ui initialization (`components.json`, `components/ui/*`, `cn` helper in `lib/`),
  which `context/ui-context.md` designates as the component library.
- `types/canvas.ts` with `NODE_COLORS` (8 pairs) and `NODE_SHAPES` (6 shapes) from
  `context/ui-context.md`.

## Open Questions

- **`context/feature-specs/01-design-system.md` is empty (0 bytes).** The task was to implement
  it "exactly as specified", but no requirements are present in the file, and it has no git
  history. Implementation was therefore derived only from the authoritative context files
  (`ui-context.md` + `code-standards.md` § Styling). Provide the intended spec content to confirm
  or extend unit 01.
- `ui-context.md` names tokens by role (`--text-primary`, `--border-default`) while
  `code-standards.md` names the utilities (`text-copy-primary`, `border-surface-border`). The
  bridge is now documented in `ui-context.md` § Token Mapping — confirm the naming is intended.
- Is shadcn/ui initialization part of the design-system unit, or a separate unit?
- Tailwind v4 auto-detects source files and also scans `context/*.md`, so utility names quoted in
  the docs (e.g. `rounded-xl`, `h-4`, `bg-warning`) end up in the built CSS. Should the docs be
  excluded with `@source not "context"` in `globals.css`, or left as-is?

## Architecture Decisions

- Colors live once as CSS custom properties on `:root`; Tailwind utilities are generated from
  them with `@theme inline` (no duplicated hex values, no `tailwind.config.*` needed on v4).
- Dark only: no `prefers-color-scheme` handling. `color-scheme: dark` is set on `html` so native
  controls and scrollbars render dark.
- Token utility naming follows `code-standards.md`: `bg-base`, `bg-surface`, `bg-elevated`,
  `bg-subtle`, `border-surface-border`, `text-copy-primary`, `text-copy-secondary`,
  `text-copy-muted`, `text-copy-faint`, `text-brand`, `bg-accent-dim`, `text-ai`, `text-ai-text`,
  `text-error`, `text-success`, `text-warning`.
- Border radius uses the Tailwind defaults (`rounded-xl`, `rounded-2xl`, `rounded-3xl`), which
  already match the depth scale in `ui-context.md`; no radius tokens were redefined.
- `bg-base` is declared with `@utility` instead of a `--color-base` token. A `--color-base` token
  takes over the `text-base` candidate and replaces Tailwind's font-size utility with a text
  color — verified in the generated CSS, then fixed. Every other token is mapped with
  `@theme inline`.

## Session Notes

- Local tooling: Tailwind CSS v4.3.3 (`@tailwindcss/postcss`), Next.js 16.3.6 (Turbopack).
  Build with `npm run build`; dev with `npm run dev`.
- The design-system unit intentionally does **not** add dependencies (no shadcn/ui, no Liveblocks,
  no React Flow). Those arrive with their own feature units.
- `app/page.tsx` stays a minimal component rendering `Ghost AI`; the app shell in `app/layout.tsx`
  carries the base surface and text tokens.

