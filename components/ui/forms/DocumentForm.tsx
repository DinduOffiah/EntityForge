"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { documentSchema, DocumentFormValues } from "@/lib/validations";
import { useEntityStore } from "@/store/useEntityStore";
import { useRouter } from "next/navigation";
import { Document } from "@/lib/types";

interface Props {
  subsidiaryId: string;
  projectId: string;
}

export default function DocumentForm({ subsidiaryId, projectId }: Props) {
  const router = useRouter();
  const { addDocument } = useEntityStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      type: "pdf",
      uploadedBy: "Current User",
    },
  });

  const onSubmit = (data: DocumentFormValues) => {
    const newDocument: Document = {
      id: crypto.randomUUID(),
      name: data.name,
      type: data.type,
      size: data.size,
      uploadedBy: data.uploadedBy,
      uploadedAt: new Date().toISOString(),
    };

    addDocument(subsidiaryId, projectId, newDocument);
    router.push(`/subsidiaries/${subsidiaryId}/projects/${projectId}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1.5">Document Name</label>
        <input
          {...register("name")}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="e.g. Brand Guidelines v2.pdf"
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">File Type</label>
          <select
            {...register("type")}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="pdf">PDF</option>
            <option value="docx">DOCX</option>
            <option value="xlsx">XLSX</option>
            <option value="pptx">PPTX</option>
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">File Size</label>
          <input
            {...register("size")}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="e.g. 2.4 MB"
          />
          {errors.size && (
            <p className="text-red-400 text-xs mt-1">{errors.size.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Uploaded By</label>
        <input
          {...register("uploadedBy")}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
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
          Upload Document
        </button>
      </div>
    </form>
  );
}