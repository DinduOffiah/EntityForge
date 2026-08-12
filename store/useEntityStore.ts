"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Subsidiary, UserRole, Project, Milestone, Document } from "@/lib/types";
import { mockSubsidiaries } from "@/lib/mock-data";

interface EntityState {
  currentUserRole: UserRole;
  subsidiaries: Subsidiary[];

  setUserRole: (role: UserRole) => void;

  // Subsidiary CRUD
  addSubsidiary: (subsidiary: Subsidiary) => void;
  updateSubsidiary: (id: string, data: Partial<Subsidiary>) => void;
  deleteSubsidiary: (id: string) => void;

  // Project CRUD
  addProject: (subsidiaryId: string, project: Project) => void;
  updateProject: (subsidiaryId: string, projectId: string, data: Partial<Project>) => void;
  deleteProject: (subsidiaryId: string, projectId: string) => void;

  // Milestone helpers
  addMilestone: (subsidiaryId: string, projectId: string, milestone: Milestone) => void;
  updateMilestone: (
    subsidiaryId: string,
    projectId: string,
    milestoneId: string,
    data: Partial<Milestone>
  ) => void;
  
  
  addDocument: (subsidiaryId: string, projectId: string, document: Document) => void;
  deleteDocument: (subsidiaryId: string, projectId: string, documentId: string) => void;
}

export const useEntityStore = create<EntityState>()(
  persist(
    (set, get) => ({
      currentUserRole: "admin",
      subsidiaries: mockSubsidiaries,

      setUserRole: (role) => set({ currentUserRole: role }),

      addSubsidiary: (subsidiary) =>
        set((state) => ({
          subsidiaries: [...state.subsidiaries, subsidiary],
        })),

      updateSubsidiary: (id, data) =>
        set((state) => ({
          subsidiaries: state.subsidiaries.map((s) =>
            s.id === id ? { ...s, ...data } : s
          ),
        })),

      deleteSubsidiary: (id) =>
        set((state) => ({
          subsidiaries: state.subsidiaries.filter((s) => s.id !== id),
        })),

      addProject: (subsidiaryId, project) =>
        set((state) => ({
          subsidiaries: state.subsidiaries.map((s) =>
            s.id === subsidiaryId
              ? { ...s, projects: [...s.projects, project] }
              : s
          ),
        })),

      updateProject: (subsidiaryId, projectId, data) =>
        set((state) => ({
          subsidiaries: state.subsidiaries.map((s) =>
            s.id === subsidiaryId
              ? {
                  ...s,
                  projects: s.projects.map((p) =>
                    p.id === projectId ? { ...p, ...data } : p
                  ),
                }
              : s
          ),
        })),

      deleteProject: (subsidiaryId, projectId) =>
        set((state) => ({
          subsidiaries: state.subsidiaries.map((s) =>
            s.id === subsidiaryId
              ? {
                  ...s,
                  projects: s.projects.filter((p) => p.id !== projectId),
                }
              : s
          ),
        })),

      addMilestone: (subsidiaryId, projectId, milestone) =>
        set((state) => ({
          subsidiaries: state.subsidiaries.map((s) =>
            s.id === subsidiaryId
              ? {
                  ...s,
                  projects: s.projects.map((p) =>
                    p.id === projectId
                      ? { ...p, milestones: [...p.milestones, milestone] }
                      : p
                  ),
                }
              : s
          ),
        })),

      updateMilestone: (subsidiaryId, projectId, milestoneId, data) =>
        set((state) => ({
          subsidiaries: state.subsidiaries.map((s) =>
            s.id === subsidiaryId
              ? {
                  ...s,
                  projects: s.projects.map((p) =>
                    p.id === projectId
                      ? {
                          ...p,
                          milestones: p.milestones.map((m) =>
                            m.id === milestoneId ? { ...m, ...data } : m
                          ),
                        }
                      : p
                  ),
                }
              : s
          ),
        })),

      addDocument: (subsidiaryId, projectId, document) =>
        set((state) => ({
          subsidiaries: state.subsidiaries.map((s) =>
            s.id === subsidiaryId
              ? {
                  ...s,
                  projects: s.projects.map((p) =>
                    p.id === projectId
                      ? { ...p, documents: [...p.documents, document] }
                      : p
                  ),
                }
              : s
          ),
        })),

      deleteDocument: (subsidiaryId, projectId, documentId) =>
        set((state) => ({
          subsidiaries: state.subsidiaries.map((s) =>
            s.id === subsidiaryId
              ? {
                  ...s,
                  projects: s.projects.map((p) =>
                    p.id === projectId
                      ? {
                          ...p,
                          documents: p.documents.filter((d) => d.id !== documentId),
                        }
                      : p
                  ),
                }
              : s
          ),
        })),
    }),
    {
      name: "entityforge-storage",
    }
  )
);