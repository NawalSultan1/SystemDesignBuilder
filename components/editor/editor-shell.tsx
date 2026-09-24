"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import {
  CreateProjectDialog,
  DeleteProjectDialog,
  RenameProjectDialog,
} from "@/components/editor/project-dialogs";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { useProjectDialogs } from "@/components/editor/use-project-dialogs";
import { Plus } from "lucide-react";

/**
 * Client boundary for the reusable editor chrome.
 *
 * Sidebar state intentionally lives in the shell that coordinates the navbar
 * and overlay, keeping both presentational components reusable across editor
 * screens. The canvas remains an empty surface until a later unit defines it.
 */
export function EditorShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const projectDialogs = useProjectDialogs();

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
      >
        <div className="flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="font-heading text-2xl font-medium tracking-tight text-copy-primary sm:text-3xl">
            Create a project or open an existing one
          </h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-copy-secondary">
            Start a new architecture workspace, or choose a project from the sidebar.
          </p>
          <Button className="mt-6" onClick={projectDialogs.openCreate}>
            <Plus data-icon="inline-start" />
            New Project
          </Button>
        </div>
      </main>

      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        projects={projectDialogs.projects}
        sharedProjects={projectDialogs.sharedProjects}
        onCreateProject={projectDialogs.openCreate}
        onRenameProject={projectDialogs.openRename}
        onDeleteProject={projectDialogs.openDelete}
      />

      <CreateProjectDialog
        open={projectDialogs.dialog === "create"}
        onOpenChange={(open) => (open ? projectDialogs.openCreate() : projectDialogs.closeDialog())}
        projectName={projectDialogs.projectName}
        onProjectNameChange={projectDialogs.setProjectName}
        slug={projectDialogs.slug}
        isLoading={projectDialogs.isLoading}
        onSubmit={() => void projectDialogs.submitCreate()}
      />
      <RenameProjectDialog
        open={projectDialogs.dialog === "rename"}
        onOpenChange={(open) => (open ? undefined : projectDialogs.closeDialog())}
        projectName={projectDialogs.projectName}
        currentName={projectDialogs.selectedProject?.name ?? "this project"}
        onProjectNameChange={projectDialogs.setProjectName}
        isLoading={projectDialogs.isLoading}
        onSubmit={() => void projectDialogs.submitRename()}
      />
      <DeleteProjectDialog
        open={projectDialogs.dialog === "delete"}
        onOpenChange={(open) => (open ? undefined : projectDialogs.closeDialog())}
        projectName={projectDialogs.selectedProject?.name ?? "this project"}
        isLoading={projectDialogs.isLoading}
        onSubmit={() => void projectDialogs.submitDelete()}
      />
    </div>
  );
}
