"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subsidiarySchema, SubsidiaryFormValues } from "@/lib/validations";
import { useEntityStore } from "@/store/useEntityStore";
import { useRouter } from "next/navigation";
import { Subsidiary } from "@/lib/types";

interface Props {
  initialData?: Subsidiary;
  mode?: "create" | "edit";
}

export default function SubsidiaryForm({ initialData, mode = "create" }: Props) {
  const router = useRouter();
  const { addSubsidiary, updateSubsidiary } = useEntityStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SubsidiaryFormValues>({
    resolver: zodResolver(subsidiarySchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          industry: initialData.industry,
          country: initialData.country,
          foundedYear: initialData.foundedYear,
          website: initialData.website || "",
          status: initialData.status,
        }
      : {
          status: "active",
          foundedYear: new Date().getFullYear(),
        },
  });

  const onSubmit = (data: SubsidiaryFormValues) => {
    if (mode === "edit" && initialData) {
      updateSubsidiary(initialData.id, data);
      router.push(`/subsidiaries/${initialData.id}`);
    } else {
      const newSubsidiary: Subsidiary = {
        id: crypto.randomUUID(),
        ...data,
        website: data.website || undefined,
        projects: [],
      };
      addSubsidiary(newSubsidiary);
      router.push("/subsidiaries");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1.5">Company Name</label>
        <input
          {...register("name")}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="e.g. Nexus Digital Solutions"
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Industry</label>
          <input
            {...register("industry")}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {errors.industry && (
            <p className="text-red-400 text-xs mt-1">{errors.industry.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Country</label>
          <input
            {...register("country")}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {errors.country && (
            <p className="text-red-400 text-xs mt-1">{errors.country.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Founded Year</label>
          <input
            type="number"
            {...register("foundedYear")}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {errors.foundedYear && (
            <p className="text-red-400 text-xs mt-1">{errors.foundedYear.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Status</label>
          <select
            {...register("status")}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="divested">Divested</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Website (optional)</label>
        <input
          {...register("website")}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="https://example.com"
        />
        {errors.website && (
          <p className="text-red-400 text-xs mt-1">{errors.website.message}</p>
        )}
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
          {mode === "edit" ? "Save Changes" : "Create Subsidiary"}
        </button>
      </div>
    </form>
  );
}