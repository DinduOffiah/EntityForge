import { z } from "zod";

export const subsidiarySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  industry: z.string().min(2, "Industry is required"),
  country: z.string().min(2, "Country is required"),
  foundedYear: z.coerce
    .number()
    .min(1800, "Invalid year")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  status: z.enum(["active", "inactive", "divested"]),
});

export type SubsidiaryFormValues = z.infer<typeof subsidiarySchema>;

export const projectSchema = z.object({
  name: z.string().min(3, "Project name is required"),
  type: z.enum(["rebranding", "digital_implementation", "other"]),
  description: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  targetEndDate: z.string().min(1, "Target end date is required"),
  status: z.enum(["planning", "active", "on_hold", "completed"]),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export const milestoneSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  status: z.enum(["not_started", "in_progress", "completed", "delayed"]),
  progress: z.coerce.number().min(0).max(100),
});

export type MilestoneFormValues = z.infer<typeof milestoneSchema>;

export const documentSchema = z.object({
  name: z.string().min(2, "Document name is required"),
  type: z.string().min(1, "File type is required"),
  size: z.string().min(1, "File size is required"),
  uploadedBy: z.string().min(2, "Uploader name is required"),
});

export type DocumentFormValues = z.infer<typeof documentSchema>;