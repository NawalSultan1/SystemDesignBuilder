"use client";

import { useState } from "react";

export interface Project {
  id: string;
  name: string;
}

export type ProjectDialog = "create" | "rename" | "delete" | null;

const initialProjects: Project[] = [
  { id: "checkout-platform", name: "Checkout Platform" },
  { id: "event-pipeline", name: "Event Pipeline" },
];

const initialSharedProjects: Project[] = [
  { id: "identity-platform", name: "Identity Platform" },
];

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function useProjectDialogs() {
  const [projects, setProjects] = useState(initialProjects);
  const [dialog, setDialog] = useState<ProjectDialog>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const slug = toSlug(projectName);

  function openCreate() {
    setSelectedProject(null);
    setProjectName("");
    setDialog("create");
  }

  function openRename(project: Project) {
    setSelectedProject(project);
    setProjectName(project.name);
    setDialog("rename");
  }

  function openDelete(project: Project) {
    setSelectedProject(project);
    setDialog("delete");
  }

  function closeDialog() {
    if (!isLoading) {
      setDialog(null);
    }
  }

  async function submitCreate() {
    const name = projectName.trim();

    if (!name) {
      return;
    }

    setIsLoading(true);
    await Promise.resolve();
    setProjects((currentProjects) => [
      { id: crypto.randomUUID(), name },
      ...currentProjects,
    ]);
    setIsLoading(false);
    setDialog(null);
  }

  async function submitRename() {
    const name = projectName.trim();

    if (!name || !selectedProject) {
      return;
    }

    setIsLoading(true);
    await Promise.resolve();
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === selectedProject.id ? { ...project, name } : project
      )
    );
    setIsLoading(false);
    setDialog(null);
  }

  async function submitDelete() {
    if (!selectedProject) {
      return;
    }

    setIsLoading(true);
    await Promise.resolve();
    setProjects((currentProjects) =>
      currentProjects.filter((project) => project.id !== selectedProject.id)
    );
    setIsLoading(false);
    setDialog(null);
  }

  return {
    dialog,
    isLoading,
    projectName,
    projects,
    selectedProject,
    sharedProjects: initialSharedProjects,
    slug,
    closeDialog,
    openCreate,
    openDelete,
    openRename,
    setProjectName,
    submitCreate,
    submitDelete,
    submitRename,
  };
}