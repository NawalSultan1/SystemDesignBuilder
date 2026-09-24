"use client";

import type { ReactNode } from "react";
import { FolderOpen, Pencil, Plus, Trash2, Users, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { Project } from "@/components/editor/use-project-dialogs";

interface ProjectSidebarProps {
  /** Whether the sidebar is open. Owned by the editor shell. */
  isOpen: boolean;
  /** Called by the header close button. */
  onClose: () => void;
  projects: Project[];
  sharedProjects: Project[];
  onCreateProject: () => void;
  onRenameProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
}

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  hint: string;
}

function EmptyState({ icon, title, hint }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
      {/* Feature icon in an empty state: 32px per ui-context.md § Icons. */}
      <span className="text-copy-faint">{icon}</span>
      <p className="text-sm font-medium text-copy-secondary">{title}</p>
      <p className="text-xs text-copy-muted">{hint}</p>
    </div>
  );
}

interface ProjectListProps {
  projects: Project[];
  owned: boolean;
  onRenameProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
}

function ProjectList({
  projects,
  owned,
  onRenameProject,
  onDeleteProject,
}: ProjectListProps) {
  if (!projects.length) {
    return (
      <EmptyState
        icon={owned ? <FolderOpen className="size-8" /> : <Users className="size-8" />}
        title={owned ? "No projects yet" : "Nothing shared with you"}
        hint={
          owned
            ? "Projects you create will show up here."
            : "Projects a collaborator shares will show up here."
        }
      />
    );
  }

  return (
    <div className="space-y-1 p-2">
      {projects.map((project) => (
        <div
          key={project.id}
          className="group flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-copy-secondary hover:bg-subtle hover:text-copy-primary"
        >
          <FolderOpen className="size-4 shrink-0 text-copy-muted" />
          <span className="min-w-0 flex-1 truncate">{project.name}</span>
          {owned ? (
            <span className="flex shrink-0 items-center gap-1">
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label={`Rename ${project.name}`}
                onClick={() => onRenameProject(project)}
              >
                <Pencil />
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label={`Delete ${project.name}`}
                onClick={() => onDeleteProject(project)}
              >
                <Trash2 />
              </Button>
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/**
 * Floating project shell that slides in from the left over the canvas.
 *
 * It is `fixed`, so opening it never reflows the editor content, and it starts
 * at `top-14` — the `h-14` navbar above it (see `editor-navbar.tsx`). While
 * closed it is `inert`, so its buttons stay out of the tab order and the
 * accessibility tree.
 */
export function ProjectSidebar({
  isOpen,
  onClose,
  projects,
  sharedProjects,
  onCreateProject,
  onRenameProject,
  onDeleteProject,
}: ProjectSidebarProps) {
  return (
    <>
      {isOpen ? (
        <button
          type="button"
          aria-label="Close projects sidebar"
          className="fixed inset-x-0 top-14 bottom-0 z-20 bg-base/60 md:hidden"
          onClick={onClose}
        />
      ) : null}
      <aside
        data-slot="project-sidebar"
        aria-label="Projects"
        inert={!isOpen}
        className={cn(
          "fixed top-14 bottom-0 left-0 z-30 flex w-72 flex-col border-r border-surface-border bg-surface/95 backdrop-blur-md transition-transform duration-200 ease-out motion-reduce:transition-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-surface-border px-3">
        <h2 className="font-heading text-sm font-medium text-copy-primary">
          Projects
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close projects sidebar"
        >
          <XIcon className="size-5" />
        </Button>
      </div>

      <Tabs defaultValue="my-projects" className="min-h-0 flex-1 gap-0">
        <div className="shrink-0 border-b border-surface-border px-3 py-2">
          <TabsList className="w-full">
            <TabsTrigger value="my-projects">My Projects</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
          </TabsList>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <TabsContent value="my-projects">
            <ProjectList
              projects={projects}
              owned
              onRenameProject={onRenameProject}
              onDeleteProject={onDeleteProject}
            />
          </TabsContent>
          <TabsContent value="shared">
            <ProjectList
              projects={sharedProjects}
              owned={false}
              onRenameProject={onRenameProject}
              onDeleteProject={onDeleteProject}
            />
          </TabsContent>
        </div>
      </Tabs>

      <div className="shrink-0 border-t border-surface-border p-3">
        <Button className="w-full" onClick={onCreateProject}>
          {/* Inline icon next to a label: the generated Button's default size-4. */}
          <Plus data-icon="inline-start" />
          New Project
        </Button>
      </div>
      </aside>
    </>
  );
}
