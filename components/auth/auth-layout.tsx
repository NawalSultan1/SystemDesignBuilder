import type { ReactNode } from "react";
import { dark } from "@clerk/ui/themes";
import { BrainCircuit, Cpu, FileText, Share2 } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

const features = [
  {
    title: "AI Architecture Generation",
    description: "Describe your system. AI maps it to nodes and edges on a live canvas.",
    icon: BrainCircuit,
  },
  {
    title: "Real-time Collaboration",
    description: "Live cursors, presence indicators, and shared node editing across your team.",
    icon: Share2,
  },
  {
    title: "Instant Spec Generation",
    description: "Export a complete Markdown technical spec directly from the canvas graph.",
    icon: FileText,
  },
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

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="grid min-h-dvh bg-base font-sans text-copy-primary lg:grid-cols-2">
      <section className="hidden border-r border-surface-border auth-brand-panel px-10 py-10 lg:flex lg:flex-col lg:justify-between">
        <div className="origin-top-left scale-[0.85]">
          <div className="flex items-center gap-3 font-heading text-sm font-semibold tracking-wide text-copy-primary">
            <span className="flex size-9 items-center justify-center rounded-xl border border-copy-primary/20 bg-base/40 text-copy-primary shadow-2xl">
              <Cpu className="size-5" aria-hidden="true" />
            </span>
            System Builder
          </div>
          <div className="mt-24 max-w-xl">
            <h1 className="max-w-[14ch] font-heading text-5xl font-semibold leading-[0.97] tracking-[-0.04em] text-copy-primary xl:text-6xl">
              Design systems at the speed of thought.
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-8 text-copy-secondary">
              Describe your architecture in plain English. System Builder maps it to a shared canvas your whole team can refine in real time.
            </p>
            <ul className="mt-16 space-y-8 text-sm text-copy-secondary">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <li key={feature.title} className="flex items-start gap-5">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-copy-primary/10 bg-base/40 text-copy-primary shadow-xl">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="pt-0.5">
                      <strong className="block font-heading text-base font-semibold text-copy-primary">
                        {feature.title}
                      </strong>
                      <span className="mt-1 block max-w-lg text-base leading-6 text-copy-secondary">
                        {feature.description}
                      </span>
                    </span>
                  </li>
                );
              })}
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