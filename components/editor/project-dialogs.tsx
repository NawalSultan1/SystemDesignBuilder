"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditorDialog } from "@/components/editor/editor-dialog";

interface ProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
  onProjectNameChange: (name: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

interface CreateProjectDialogProps extends ProjectFormProps {
  slug: string;
}

interface RenameProjectDialogProps extends ProjectFormProps {
  currentName: string;
}

function submitForm(event: FormEvent<HTMLFormElement>, onSubmit: () => void) {
  event.preventDefault();
  onSubmit();
}

function CancelButton({ onClick }: { onClick: () => void }) {
  return (
    <Button type="button" variant="outline" onClick={onClick}>
      Cancel
    </Button>
  );
}

export function CreateProjectDialog({
  open,
  onOpenChange,
  projectName,
  onProjectNameChange,
  slug,
  isLoading,
  onSubmit,
}: CreateProjectDialogProps) {
  return (
    <EditorDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Project"
      description="Start a new architecture workspace."
      footer={
        <>
          <CancelButton onClick={() => onOpenChange(false)} />
          <Button
            type="submit"
            form="create-project-form"
            disabled={!projectName.trim() || isLoading}
          >
            {isLoading ? "Creating..." : "Create Project"}
          </Button>
        </>
      }
    >
      <form
        id="create-project-form"
        className="space-y-4"
        onSubmit={(event) => submitForm(event, onSubmit)}
      >
        <label className="block space-y-2 text-sm font-medium text-copy-primary" htmlFor="create-project-name">
          Project name
          <Input
            id="create-project-name"
            value={projectName}
            onChange={(event) => onProjectNameChange(event.target.value)}
            placeholder="e.g. Payments Platform"
            autoFocus
          />
        </label>
        <div className="rounded-xl border border-surface-border bg-surface px-3 py-2 text-xs">
          <span className="text-copy-muted">Slug preview</span>
          <span className="mt-1 block font-mono text-copy-secondary">
            {slug || "your-project-slug"}
          </span>
        </div>
      </form>
    </EditorDialog>
  );
}

export function RenameProjectDialog({
  open,
  onOpenChange,
  projectName,
  currentName,
  onProjectNameChange,
  isLoading,
  onSubmit,
}: RenameProjectDialogProps) {
  return (
    <EditorDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Rename Project"
      description={`Rename ${currentName} to keep your workspace organized.`}
      footer={
        <>
          <CancelButton onClick={() => onOpenChange(false)} />
          <Button
            type="submit"
            form="rename-project-form"
            disabled={!projectName.trim() || isLoading}
          >
            {isLoading ? "Saving..." : "Save Name"}
          </Button>
        </>
      }
    >
      <form
        id="rename-project-form"
        onSubmit={(event) => submitForm(event, onSubmit)}
      >
        <label className="block space-y-2 text-sm font-medium text-copy-primary" htmlFor="rename-project-name">
          Project name
          <Input
            id="rename-project-name"
            value={projectName}
            onChange={(event) => onProjectNameChange(event.target.value)}
            autoFocus
          />
        </label>
      </form>
    </EditorDialog>
  );
}

interface DeleteProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
  isLoading: boolean;
  onSubmit: () => void;
}

export function DeleteProjectDialog({
  open,
  onOpenChange,
  projectName,
  isLoading,
  onSubmit,
}: DeleteProjectDialogProps) {
  return (
    <EditorDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Project"
      description={`Delete ${projectName}? This action cannot be undone.`}
      footer={
        <>
          <CancelButton onClick={() => onOpenChange(false)} />
          <Button
            type="button"
            variant="destructive"
            disabled={isLoading}
            onClick={onSubmit}
          >
            {isLoading ? "Deleting..." : "Delete Project"}
          </Button>
        </>
      }
    />
  );
}