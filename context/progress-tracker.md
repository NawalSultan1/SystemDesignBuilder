# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Phase 1 — Foundation (design system + app shell)

## Current Goal

- Feature units `01-design-system` and `02-editor` are complete.
- Begin the next approved unit only after its scope is defined; editor canvas behavior and concrete
  dialog flows are intentionally outside the completed `02-editor` unit.

## Completed

- Boilerplate cleanup: `app/globals.css` reduced to the Tailwind import, default SVGs
  removed from `public/`, `app/page.tsx` replaced with a minimal `Ghost AI` component,
  and the app shell centered.
- Dark-only token layer + Geist typography (`app/globals.css`, `app/layout.tsx`), documented in
  `context/ui-context.md` § Token Mapping and verified through a production build
  (`.bg-base{background-color:var(--bg-base)}`, `.text-copy-primary{color:var(--text-primary)}`).
  This is the prerequisite `01-design-system.md` refers to when it requires the components to
  "match the dark theme in `global.css`".
- Feature unit `01-design-system` — shadcn/ui component library, per
  `context/feature-specs/01-design-system.md`:
  - Initialized with the `shadcn` CLI (v4.21.0): `npx shadcn@latest init -y -b radix --no-monorepo`,
    preset "Nova - Lucide / Geist". It created `components.json`, `lib/utils.ts` and
    `components/ui/button.tsx`, added `class-variance-authority`, `cn`, `lucide-react`, `radix-ui`,
    `tw-animate-css` and `shadcn` to `package.json`, and rewrote `app/globals.css`.
  - Added the remaining components with the CLI: `card`, `dialog`, `input`, `tabs`, `textarea`,
    `scroll-area`. Generated files were left unmodified.
  - `lucide-react` installed (icons per `ui-context.md` § Icons).
  - `cn()` helper: `lib/utils.ts` re-exports it from the `cn` package (twMerge + clsx semantics).
  - `app/globals.css` reconciled with the unit 01 token layer: shadcn semantic tokens declared on
    `:root` and mapped onto Ghost AI tokens, the CLI's light `:root` values and inert `.dark` block
    removed, the `dark:` variant re-scoped to the document, and two CLI-introduced defects fixed
    (see Architecture Decisions).
  - Verified end to end: `npm run build` compiles and type-checks, `npm run lint` is clean, all seven
    components were rendered through a temporary route and asserted in the prerendered HTML and the
    built CSS, and `cn()` merge behaviour was confirmed both in node and in rendered markup. The
    temporary route and scripts were removed afterwards.
- Feature unit `02-editor` — reusable base editor chrome, per
  `context/feature-specs/02-editor.md`:
  - Added `components/editor/editor-navbar.tsx`: a 56px dark navbar with equal left, centre, and
    right regions, an accessible sidebar toggle, and `PanelLeftOpen`/`PanelLeftClose` driven by
    caller-owned state. The right region is intentionally empty.
  - Added `components/editor/project-sidebar.tsx`: a fixed, left-sliding 18rem overlay beginning
    below the navbar, so opening it never reflows the canvas. It provides an accessible Projects
    header and close action, shadcn `My Projects`/`Shared` tabs with distinct empty states, and a
    full-width `New Project` button. Closed-sidebar content is inert and excluded from the tab order.
  - Added `components/editor/editor-dialog.tsx`: a reusable controlled dialog pattern supporting
    title, optional description, body content, footer actions, and surface overrides. It composes
    the protected shadcn primitives, uses the existing dark global tokens, and applies the
    documented `rounded-3xl` modal radius without modifying `components/ui/*`. No concrete dialog
    was built, as required by the spec.
  - Added `components/editor/editor-shell.tsx` and mounted the editor at `/` through `app/page.tsx`.
    The client shell owns sidebar state, starts with the overlay open, and coordinates the navbar
    toggle and header close action around an empty viewport-filling canvas. `app/layout.tsx` now
    provides a full dynamic viewport instead of centering the former placeholder page.
  - Verified with a production build, clean ESLint and standalone TypeScript checks, a live `/` route
    check, a 1440×900 headless-Chrome visual review, and 19 real-browser interaction assertions.
    Checks covered initial layout, toggle icon and ARIA changes, inertness, non-reflowing overlay
    geometry, tab switching, both close paths, and absence of browser runtime errors. All temporary
    routes and verification scripts were removed.

## In Progress

- Nothing. Feature units `01-design-system` and `02-editor` are closed.

## Next Up

- Define and review the next feature unit before implementation.
- `types/canvas.ts` with `NODE_COLORS` (8 pairs) and `NODE_SHAPES` (6 shapes) from
  `context/ui-context.md` is the next known foundation task, but it must be included in an approved
  unit scope before work begins.

## Open Questions

- The `shadcn` CLI rewrites `app/globals.css` on `init`, and a future `shadcn add` can touch it again
  (component-specific tokens). Re-verify the tokens after any CLI run: dark values on `:root`, no
  `.dark` block, no circular `--font-sans: var(--font-sans)`.
- `components.json` records `style: "radix-nova"` and `baseColor: "neutral"` from the CLI preset. The
  base color is inert because every shadcn token is overridden with a Ghost AI value. Confirm the
  `radix` component library (rather than the newer `base`/`aria` options) is intended.
- `--chart-*` and `--sidebar-*` tokens were mapped onto the existing palette although no Chart or
  generated shadcn Sidebar component is installed. The feature-specific project sidebar does not
  use this token family. Keep the mappings for future generated components, or remove them when
  their scope is defined?
- `README.md` still contains unresolved git conflict markers from the "Merge local project with
  GitHub repository" commit (`<<<<<<< HEAD`, `=======`, `>>>>>>> cee925b`). The two sides disagree
  on the product name (Next.js boilerplate text vs. `SystemDesignBuilder`), which conflicts with
  `context/project-overview.md` (Ghost AI). Needs a naming decision before it can be resolved.
- Confirm the token utility naming bridge documented in `ui-context.md` § Token Mapping
  (`--text-primary` -> `text-copy-primary`), now that a third family of shadcn/ui semantic tokens
  also exists.
- Tailwind v4 also scans `context/*.md`, so utility names quoted in the docs (`rounded-xl`, `h-4`,
  `bg-warning`) end up in the built CSS. Exclude the docs with `@source not "context"` in
  `globals.css`, or leave as-is?

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
- Generated shadcn/ui files (`components/ui/*`) are protected foundation components per
  `ai-workflow-rules.md` § Protected Foundation Components and `01-design-system.md` — they stay
  default and unmodified after installation. Project-specific styling, layout, and feature logic go
  in app-level components.
- Unit order: design system / component library first, then the editor workspace
  (`ui-context.md` § Component Library designates shadcn/ui as the library later units build on).
- shadcn/ui semantic tokens are declared once on `:root` in `globals.css` and each resolves to a
  Ghost AI token. The palette stays single-source and the generated components match the theme
  without being modified.
- Dark only, enforced through tokens instead of a theme provider: `:root` holds the dark values, the
  `.dark` block the CLI generated was deleted, and `@custom-variant dark (&:where(html, html *))`
  re-scopes the shadcn `dark:` variant to the whole document (no toggle, no `prefers-color-scheme`).
- `--radius-sm` … `--radius-3xl` are declared explicitly with Tailwind's default values rather than
  scaled off `--radius`: `rounded-xl/2xl/3xl` keep 12/16/24px from `ui-context.md`, and the token
  names generated components reference (`min(var(--radius-md), 12px)`) stay resolvable.
- Two defects introduced by `shadcn init` were fixed at the root in `app/globals.css`:
  1. it wrote light `:root` values plus an inert `.dark` block, so components would have rendered
     light (`--background: oklch(1 0 0)` = white);
  2. it replaced the font mapping with a circular `--font-sans: var(--font-sans)`, which broke
     `font-sans` and `font-heading` (used by `CardTitle`/`DialogTitle`).
  `--font-sans` and `--font-heading` now both resolve to `--font-geist-sans`.
- `cn()` is consumed from the `cn` package through `lib/utils.ts` instead of hand-rolling
  `twMerge(clsx(...))`: the package documents itself as a drop-in replacement, and the generated
  components import `cn` from `"cn"` directly, so the re-export keeps one implementation.
- Editor chrome keeps open-state ownership outside the presentation components. `EditorNavbar` and
  `ProjectSidebar` receive controlled state and callbacks, while `EditorDialog` is a controlled Radix
  composition. This lets a future editor shell coordinate all three without embedding product or
  canvas behavior in the reusable components.
- The navbar and floating project sidebar form a shared 56px geometry contract: the navbar uses
  `h-14`, and the fixed sidebar uses `top-14`. The sidebar is positioned rather than participating in
  document flow so opening it overlays the canvas without reflow.
- Modal radius and editor-specific surface styling are applied by app-level wrappers through token
  utilities; protected `components/ui/*` primitives remain unchanged.

## Session Notes

- Repository state: branch `main`, HEAD `519509c` "Merge local project with GitHub repository". The
  working tree contains the unit 01 foundation (`components.json`, `components/ui`, `lib`,
  dependency and token changes) and the new unit 02 files in `components/editor`.
- `app/page.tsx` no longer contains the local `click me` test placeholder; it now mounts the editor
  shell. `context/feature-specs/02-editor.md` and the new `components/editor/*` files are currently
  untracked and will need to be included when the work is committed.
- Temporary editor verification routes and scripts were removed after the unit passed production
  build, ESLint, server-rendered HTML/CSS checks, and headless-browser interaction checks.
- Tooling: Next.js 16.3.6 (Turbopack), Tailwind CSS v4.3.3, React 19.2.8, `shadcn` CLI 4.21.0,
  `radix-ui` 1.6.7, `lucide-react` 1.48.0, `cn` 0.4.0.
- `shadcn init` prompts interactively for a preset; it was driven non-interactively by piping an
  empty line to accept the default. Without input the CLI hangs indefinitely.
- `context/feature-specs/01-design-system.md` was filled in after unit 01 was first drafted and
  specifies the shadcn/ui setup implemented above, superseding the earlier "unit 01 = token layer
  only" reading.

