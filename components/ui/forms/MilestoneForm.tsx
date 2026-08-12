"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { milestoneSchema, MilestoneFormValues } from "@/lib/validations";
import { useEntityStore } from "@/store/useEntityStore";
import { useRouter } from "next/navigation";
import { Milestone } from "@/lib/types";

interface Props {
  subsidiaryId: string;
  projectId: string;
  initialData?: Milestone;
  mode?: "create" | "edit";
}

export default function MilestoneForm({
  subsidiaryId,
  projectId,
  initialData,
  mode = "create",
}: Props) {
  const router = useRouter();
  const { addMilestone, updateMilestone } = useEntityStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MilestoneFormValues>({
    resolver: zodResolver(milestoneSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description || "",
          startDate: initialData.startDate,
          endDate: initialData.endDate,
          status: initialData.status,
          progress: initialData.progress,
        }
      : {
          status: "not_started",
          progress: 0,
        },
  });

  const onSubmit = (data: MilestoneFormValues) => {
    if (mode === "edit" && initialData) {
      updateMilestone(subsidiaryId, projectId, initialData.id, data);
    } else {
      const newMilestone: Milestone = {
        id: crypto.randomUUID(),
        ...data,
        description: data.description || undefined,
      };
      addMilestone(subsidiaryId, projectId, newMilestone);
    }

    router.push(`/subsidiaries/${subsidiaryId}/projects/${projectId}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1.5">Milestone Title</label>
        <input
          {...register("title")}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="e.g. Brand Strategy Finalized"
        />
        {errors.title && (
          <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Description</label>
        <textarea
          {...register("description")}
          rows={2}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">End Date</label>
          <input
            type="date"
            {...register("endDate")}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Status</label>
          <select
            {...register("status")}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Progress (%)</label>
          <input
            type="number"
            {...register("progress")}
            min={0}
            max={100}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 text-sm rounded-lg bg-slate-800 hover:bg-slate-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 text-sm rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50"
        >
          {mode === "edit" ? "Save Changes" : "Create Milestone"}
        </button>
      </div>
    </form>
  );
}