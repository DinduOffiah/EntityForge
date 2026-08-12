export type UserRole = "admin" | "committee" | "viewer";

export type ProjectType = "rebranding" | "digital_implementation" | "other";

export type MilestoneStatus = "not_started" | "in_progress" | "completed" | "delayed";

export interface Document {
  id: string;
  name: string;
  type: string; // pdf, docx, etc.
  uploadedAt: string;
  uploadedBy: string;
  size: string;
}

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  startDate: string; // ISO
  endDate: string;   // ISO
  status: MilestoneStatus;
  progress: number; // 0-100
}

export interface Project {
  id: string;
  name: string;
  type: ProjectType;
  description?: string;
  startDate: string;
  targetEndDate: string;
  status: "planning" | "active" | "on_hold" | "completed";
  milestones: Milestone[];
  documents: Document[];
}

export interface Subsidiary {
  id: string;
  name: string;
  industry: string;
  country: string;
  foundedYear: number;
  website?: string;
  status: "active" | "inactive" | "divested";
  projects: Project[];
}

export interface AppState {
  currentUserRole: UserRole;
  subsidiaries: Subsidiary[];
}