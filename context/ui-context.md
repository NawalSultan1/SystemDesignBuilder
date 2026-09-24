# UI Context

## Theme

Dark only. No light mode. The visual language is a dark technical workspace — near-black backgrounds, layered surfaces, and vivid accent colors for interactive elements.

All colors are defined as CSS custom properties in `globals.css` and mapped to Tailwind tokens via `@theme inline`. Components must use these tokens — no hardcoded hex values or raw Tailwind color classes like `zinc-*`.

| Role             | CSS Variable           | Hex / Value               |
| ---------------- | ---------------------- | ------------------------- |
| Page background  | `--bg-base`            | `#080809`                 |
| Surface          | `--bg-surface`         | `#111114`                 |
| Elevated surface | `--bg-elevated`        | `#18181c`                 |
| Subtle surface   | `--bg-subtle`          | `#1e1e23`                 |
| Default border   | `--border-default`     | `#2a2a30`                 |
| Subtle border    | `--border-subtle`      | `#3a3a42`                 |
| Primary text     | `--text-primary`       | `#f0f0f4`                 |
| Secondary text   | `--text-secondary`     | `#c0c0cc`                 |
| Muted text       | `--text-muted`         | `#808090`                 |
| Faint text       | `--text-faint`         | `#505060`                 |
| Brand accent     | `--accent-primary`     | `#00c8d4` (cyan)          |
| Brand dim        | `--accent-primary-dim` | `rgba(0, 200, 212, 0.12)` |
| AI accent        | `--accent-ai`          | `#6457f9` (indigo-purple) |
| AI text          | `--accent-ai-text`     | `#8b82ff`                 |
| Error            | `--state-error`        | `#ff4d4f`                 |
| Success          | `--state-success`      | `#34d399`                 |
| Warning          | `--state-warning`      | `#fbbf24`                 |

Tailwind utility names map to these variables. Use `bg-base`, `bg-surface`, `text-copy-primary`, `text-copy-muted`, `border-surface-border`, `text-brand`, `bg-accent-dim`, etc.

### Token Mapping

The role variables above are declared on `:root` in `globals.css`; the `@theme inline` block
maps each one to a Tailwind `--color-*` token, which generates the utilities components use.

| CSS Variable             | Tailwind token                    | Utilities                                  |
| ------------------------ | --------------------------------- | ------------------------------------------ |
| `--bg-base`              | — (explicit `@utility bg-base`)   | `bg-base`                                  |
| `--bg-surface`           | `--color-surface`                 | `bg-surface`                               |
| `--bg-elevated`          | `--color-elevated`                | `bg-elevated`                              |
| `--bg-subtle`            | `--color-subtle`                  | `bg-subtle`                                |
| `--border-default`       | `--color-surface-border`          | `border-surface-border`                    |
| `--border-subtle`        | `--color-surface-border-subtle`   | `border-surface-border-subtle`             |
| `--text-primary`         | `--color-copy-primary`            | `text-copy-primary`                        |
| `--text-secondary`       | `--color-copy-secondary`          | `text-copy-secondary`                      |
| `--text-muted`           | `--color-copy-muted`              | `text-copy-muted`                          |
| `--text-faint`           | `--color-copy-faint`              | `text-copy-faint`                          |
| `--accent-primary`       | `--color-brand`                   | `text-brand`, `bg-brand`, `border-brand`   |
| `--accent-primary-dim`   | `--color-accent-dim`              | `bg-accent-dim`                            |
| `--accent-ai`            | `--color-ai`                      | `text-ai`, `bg-ai`, `border-ai`            |
| `--accent-ai-text`       | `--color-ai-text`                 | `text-ai-text`                             |
| `--state-error`          | `--color-error`                   | `text-error`, `bg-error`                   |
| `--state-success`        | `--color-success`                 | `text-success`, `bg-success`               |
| `--state-warning`        | `--color-warning`                 | `text-warning`, `bg-warning`               |

Notes:

- `--text-base` is already taken by the Tailwind font-size scale, so `bg-base` is declared as an
  explicit `@utility` in `globals.css` instead of a `--color-base` token. Adding `--color-base`
  would take over the `text-base` candidate and replace the font-size utility with a text color.
- `color-scheme: dark` is set on `html` in `globals.css`, and `body` uses Geist Sans via
  `--font-geist-sans`.

### shadcn/ui Token Mapping

`components/ui/*` are generated shadcn/ui components and consume shadcn's own semantic tokens.
Those tokens are declared once on `:root` in `globals.css` and **each one resolves to a Ghost AI
token**, so no color value is duplicated and the components match the theme without being edited.

| shadcn/ui token                           | Resolves to                         | Drives                             |
| ----------------------------------------- | ----------------------------------- | ---------------------------------- |
| `--background` / `--foreground`           | `--bg-base` / `--text-primary`      | Page shell and default text        |
| `--card` / `--card-foreground`            | `--bg-surface` / `--text-primary`   | `Card` panels                      |
| `--popover` / `--popover-foreground`      | `--bg-elevated` / `--text-primary`  | `Dialog` and other overlays        |
| `--primary` / `--primary-foreground`      | `--accent-primary` / `--bg-base`    | Default `Button`, active states    |
| `--secondary` / `--secondary-foreground`  | `--bg-subtle` / `--text-secondary`  | Secondary buttons                  |
| `--muted` / `--muted-foreground`          | `--bg-elevated` / `--text-muted`    | Tab list, hover fills, helper text |
| `--accent` / `--accent-foreground`        | `--bg-subtle` / `--text-primary`    | Hover and selected surfaces        |
| `--destructive`                           | `--state-error`                     | Destructive actions, invalid input |
| `--border` / `--input`                    | `--border-default`                  | Borders and field outlines         |
| `--ring`                                  | `--accent-primary`                  | Focus rings                        |
| `--chart-1` … `--chart-5`                 | Brand, AI and state hues            | Data series                        |
| `--sidebar*`                              | `--bg-surface` family               | Sidebar surfaces                   |

Dark mode is implicit. The app has no light mode, so `:root` carries the dark values, no `.dark`
block exists, and the shadcn/ui `dark:` variant is re-scoped to the whole document in
`globals.css`:

```css
@custom-variant dark (&:where(html, html *));
```

That keeps the `dark:` utilities the generated components ship working without a `.dark` ancestor
or a theme provider. There is no toggle and no `prefers-color-scheme` handling.

## Typography

| Role      | Font       | CSS Variable        |
| --------- | ---------- | ------------------- |
| UI text   | Geist Sans | `--font-geist-sans` |
| Code/mono | Geist Mono | `--font-geist-mono` |

Both fonts are loaded via `next/font/google` and applied as CSS variables on the `<html>` element. The base `body` uses Geist Sans with `antialiased`.

## Border Radius

Radius increases with surface depth — smaller for inner elements, larger for outer containers.

| Context           | Class         | Value  |
| ----------------- | ------------- | ------ |
| Inline / small UI | `rounded-xl`  | `12px` |
| Cards / panels    | `rounded-2xl` | `16px` |
| Modal / overlay   | `rounded-3xl` | `24px` |

The `--radius-sm` … `--radius-3xl` tokens in `globals.css` are set to Tailwind's default values so
these classes keep the sizes above. They must stay defined: generated components reference them,
e.g. `rounded-[min(var(--radius-md),12px)]` in `components/ui/button.tsx`.

Note: the generated `DialogContent` ships `rounded-xl` and must not be modified
(`ai-workflow-rules.md` § Protected Foundation Components). App-level dialog wrappers pass
`className="rounded-3xl"` to get the modal radius.

## Canvas

### Node Color Palette

8 defined color pairs. Each pair specifies a dark node fill and a vivid contrasting text color tuned for readability on the dark canvas. Defined in `types/canvas.ts` as `NODE_COLORS`.

| Node fill | Text color | Character              |
| --------- | ---------- | ---------------------- |
| `#1F1F1F` | `#EDEDED`  | Neutral dark (default) |
| `#10233D` | `#52A8FF`  | Blue                   |
| `#2E1938` | `#BF7AF0`  | Purple                 |
| `#331B00` | `#FF990A`  | Orange                 |
| `#3C1618` | `#FF6166`  | Red                    |
| `#3A1726` | `#F75F8F`  | Pink                   |
| `#0F2E18` | `#62C073`  | Green                  |
| `#062822` | `#0AC7B4`  | Teal                   |

Default node color: `#1F1F1F` with `#EDEDED` text.

### Edge Style

Smooth-step path with an arrow marker. Default edge color: `#f8fafc`. Stroke width is thin — edges are visually secondary to nodes.

### Node Shapes

6 supported shapes, defined in `types/canvas.ts` as `NODE_SHAPES`. Complex shapes (diamond, hexagon, cylinder) are rendered as inline SVGs rather than CSS borders.

- `rectangle` — default general-purpose node
- `diamond` — decision / gateway
- `circle` — event / endpoint
- `pill` — service / process
- `cylinder` — database / storage
- `hexagon` — external system / boundary

### Connection Handles

Small white circular handles, hidden by default, revealed on node hover. Appear at all four sides of a node.

### Canvas Background

React Flow `<Background>` component. Canvas sits on the base background color.

## Component Library

shadcn/ui on top of Tailwind. No custom design system. Components live in `components/ui/`. Use the `shadcn` CLI to add new components rather than writing them from scratch.

Installed components: `Button`, `Card`, `Dialog`, `Input`, `Tabs`, `Textarea`, `ScrollArea`.

- Configuration lives in `components.json` (`style: "radix-nova"`, `baseColor: "neutral"`,
  `cssVariables: true`, `iconLibrary: "lucide"`, `ui: "@/components/ui"`).
- `lib/utils.ts` re-exports `cn` from the `cn` package, which has `twMerge(clsx(...))` semantics —
  use it to merge class names, including any `className` passed into a component.
- `components/ui/*` are protected foundation components: they stay unmodified. Style at the call
  site with `className` instead.

## Layout Patterns

- Editor workspace: full-viewport layout — floating sidebar overlay on the left, center canvas, slide-over AI sidebar on the right.
- Sidebars: floating overlay with dark semi-transparent background and subtle border.
- Modals and dialogs: centered overlay, `rounded-3xl`, dark background with backdrop blur.
- Navbar: top bar with dark background and bottom border.

## Icons

Lucide React. Stroke-based icons only — no filled variants. Icon sizes: `h-4 w-4` for inline, `h-5 w-5` for buttons, `h-8 w-8` for feature icons in empty states.
