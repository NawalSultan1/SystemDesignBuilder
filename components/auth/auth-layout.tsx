import type { ReactNode } from "react";
import { dark } from "@clerk/ui/themes";

interface AuthLayoutProps {
  children: ReactNode;
  mode: "sign-in" | "sign-up";
}

const features = [
  "Design systems in one shared workspace",
  "Keep decisions visible and connected",
  "Move from first sketch to clear architecture",
];

export const authAppearance = {
  ...dark,
  variables: {
    ...dark.variables,
    colorPrimary: "var(--text-primary)",
    colorPrimaryForeground: "var(--bg-base)",
    colorBackground: "var(--bg-surface)",
    colorInput: "var(--bg-elevated)",
    colorInputForeground: "var(--text-primary)",
    colorForeground: "var(--text-primary)",
    colorMuted: "var(--bg-elevated)",
    colorMutedForeground: "var(--text-secondary)",
    colorNeutral: "var(--text-secondary)",
    colorBorder: "var(--border-default)",
    colorRing: "var(--text-primary)",
    colorDanger: "var(--state-error)",
    colorSuccess: "var(--state-success)",
    colorWarning: "var(--state-warning)",
  },
};

export function AuthLayout({ children, mode }: AuthLayoutProps) {
  const title = mode === "sign-in" ? "Welcome back" : "Start designing clearly";

  return (
    <main className="grid min-h-dvh bg-base font-sans text-copy-primary lg:grid-cols-2">
      <section className="hidden border-r border-surface-border auth-brand-panel px-10 py-10 lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="flex items-center gap-3 text-sm font-semibold tracking-wide text-copy-primary">
            <span className="size-2 rounded-full bg-copy-primary" aria-hidden="true" />
            System Builder
          </div>
          <div className="mt-24 max-w-lg">
            <h1 className="font-heading text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-copy-primary xl:text-6xl">
              System Builder
            </h1>
            <p className="mt-6 text-base font-medium text-copy-primary/85">System design, without the noise.</p>
            <h2 className="mt-14 font-heading text-xl font-medium tracking-tight text-copy-primary">
              {title}
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-copy-secondary">
              A focused space for turning complex ideas into systems your team can understand.
            </p>
            <ul className="mt-7 space-y-4 text-sm text-copy-secondary">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-copy-secondary" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-xs text-copy-muted">A calm canvas for better technical decisions.</p>
      </section>

      <section className="flex min-h-dvh items-center justify-center bg-base px-6 py-10 font-sans sm:px-10">
        <div className="w-full max-w-md">{children}</div>
      </section>
    </main>
  );
}