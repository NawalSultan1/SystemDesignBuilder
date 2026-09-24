"use client";

import type { ReactNode } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EditorNavbarProps {
  /** Whether the project sidebar is currently open. Owned by the editor shell. */
  isSidebarOpen: boolean;
  /** Toggles the project sidebar. */
  onToggleSidebar: () => void;
  /**
   * Centre section content. Empty until later chapters fill it with the active
   * project name and canvas controls.
   */
  children?: ReactNode;
}

/**
 * Fixed-height top bar that frames every editor screen.
 *
 * The height is `h-14` (56px) and `project-sidebar.tsx` starts directly below it
 * (`top-14`) — keep the two in sync.
 *
 * `relative z-40` keeps the bar above the sidebar (`z-30`) and the canvas while
 * the transient Radix overlays (dialogs, z-50) stay on top of everything.
 */
export function EditorNavbar({
  isSidebarOpen,
  onToggleSidebar,
  children,
}: EditorNavbarProps) {
  return (
    <header
      data-slot="editor-navbar"
      className="relative z-40 flex h-14 shrink-0 items-center gap-2 border-b border-surface-border bg-surface px-3"
    >
      <div className="flex flex-1 items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          aria-label={
            isSidebarOpen ? "Hide projects sidebar" : "Show projects sidebar"
          }
          aria-expanded={isSidebarOpen}
        >
          {/* `size-5` instead of `h-5 w-5`: the generated Button only applies its
           * default `size-4` to icons without a `size-*` class, and `size-5` is
           * 1.25rem — the 20px button icon from ui-context.md § Icons. */}
          {isSidebarOpen ? (
            <PanelLeftClose className="size-5" />
          ) : (
            <PanelLeftOpen className="size-5" />
          )}
        </Button>
      </div>

      <div className="flex flex-1 items-center justify-center">{children}</div>

      {/* Right section is intentionally empty for now. */}
      <div className="flex flex-1 items-center justify-end" />
    </header>
  );
}
