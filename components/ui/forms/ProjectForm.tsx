"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, ProjectFormValues } from "@/lib/validations";
import { useEntityStore } from "@/store/useEntityStore";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/types";

interface Props {
  subsidiaryId: string;
  initialData?: Project;
  mode?: "create" | "edit";
}

export default function ProjectForm({
  subsidiaryId,
  initialData,
  mode = "create",
}: Props) {
  const router = useRouter();
  const { addProject, updateProject } = useEntityStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          type: initialData.type,
          description: initialData.description || "",
          startDate: initialData.startDate,
          targetEndDate: initialData.targetEndDate,
          status: initialData.status,
        }
      : {
          type: "rebranding",
          status: "planning",
        },
  });

  const onSubmit = (data: ProjectFormValues) => {
    if (mode === "edit" && initialData) {
      updateProject(subsidiaryId, initialData.id, data);
      router.push(`/subsidiaries/${subsidiaryId}/projects/${initialData.id}`);
    } else {
      const newProject: Project = {
        id: crypto.randomUUID(),
        ...data,
        description: data.description || undefined,
        milestones: [],
        documents: [],
      };
      addProject(subsidiaryId, newProject);
      router.push(`/subsidiaries/${subsidiaryId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1.5">Project Name</label>
        <input
          {...register("name")}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="e.g. Complete Brand Overhaul 2026"
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Project Type</label>
        <select
          {...register("type")}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="rebranding">Rebranding</option>
          <option value="digital_implementation">Digital Implementation</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Description</label>
        <textarea
          {...register("description")}
          rows={3}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Brief description of the project..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Start Date</label>
          <input
            type="date"
            {...register("startDate")}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {errors.startDate && (
            <p className="text-red-400 text-xs mt-1">{errors.startDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Target End Date</label>
          <input
            type="date"
            {...register("targetEndDate")}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {errors.targetEndDate && (
            <p className="text-red-400 text-xs mt-1">
              {errors.targetEndDate.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Status</label>
        <select
          {...register("status")}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="planning">Planning</option>
          <option value="active">Active</option>
          <option value="on_hold">On Hold</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 text-sm rounded-lg bg-slate-800 hover:bg-slate-700 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 text-sm rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition disabled:opacity-50"
        >
          {mode === "edit" ? "Save Changes" : "Create Project"}
        </button>
      </div>
    </form>
  );
}