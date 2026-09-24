"use client";

import { useState } from "react";

import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";

/**
 * Client boundary for the reusable editor chrome.
 *
 * Sidebar state intentionally lives in the shell that coordinates the navbar
 * and overlay, keeping both presentational components reusable across editor
 * screens. The canvas remains an empty surface until a later unit defines it.
 */
export function EditorShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div
      data-slot="editor-shell"
      className="flex h-dvh min-h-0 w-full flex-col overflow-hidden bg-base text-copy-primary"
    >
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((isOpen) => !isOpen)}
      />

      <main
        data-slot="editor-canvas"
        aria-label="Editor canvas"
        className="min-h-0 flex-1 overflow-hidden bg-base"
      />

      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
}
