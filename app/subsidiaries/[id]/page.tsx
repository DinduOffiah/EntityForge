"use client";

import { useEntityStore } from "@/store/useEntityStore";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, ArrowLeft, FolderKanban } from "lucide-react";

export default function SubsidiaryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { subsidiaries, currentUserRole, deleteProject } = useEntityStore();

  const subsidiary = subsidiaries.find((s) => s.id === params.id);
  const canEdit = currentUserRole === "admin" || currentUserRole === "committee";

  if (!subsidiary) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">Subsidiary not found</h2>
        <button
          onClick={() => router.push("/subsidiaries")}
          className="text-emerald-400 hover:underline text-sm mt-3"
        >
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push("/subsidiaries")}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-4 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Subsidiaries
        </button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{subsidiary.name}</h1>
            <p className="text-slate-400 mt-1">
              {subsidiary.industry} • {subsidiary.country} • Founded{" "}
              {subsidiary.foundedYear}
            </p>
          </div>

          <span
            className={`text-xs px-3 py-1 rounded-full ${
              subsidiary.status === "active"
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-slate-700 text-slate-300"
            }`}
          >
            {subsidiary.status}
          </span>
        </div>
      </div>

      {/* Projects Section */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">Projects</h2>

        {canEdit && (
          <Link
            href={`/subsidiaries/${subsidiary.id}/projects/new`}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </Link>
        )}
      </div>

      {subsidiary.projects.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl">
          <FolderKanban className="w-10 h-10 mx-auto mb-3 text-slate-600" />
          <p className="text-slate-500">No projects yet</p>
          {canEdit && (
            <Link
              href={`/subsidiaries/${subsidiary.id}/projects/new`}
              className="text-emerald-400 text-sm hover:underline mt-2 inline-block"
            >
              Create the first project
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {subsidiary.projects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <Link
                    href={`/subsidiaries/${subsidiary.id}/projects/${project.id}`}
                    className="font-medium hover:text-emerald-400 transition"
                  >
                    {project.name}
                  </Link>
                  <p className="text-xs text-slate-500 mt-1 capitalize">
                    {project.type.replace("_", " ")}
                  </p>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded-full capitalize ${
                    project.status === "active"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : project.status === "completed"
                      ? "bg-blue-500/10 text-blue-400"
                      : project.status === "on_hold"
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {project.status.replace("_", " ")}
                </span>
              </div>

              <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                {project.description || "No description"}
              </p>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{project.milestones.length} milestones</span>
                <span>
                  {new Date(project.startDate).toLocaleDateString()} →{" "}
                  {new Date(project.targetEndDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}