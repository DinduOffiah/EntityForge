"use client";

import { useEntityStore } from "@/store/useEntityStore";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Calendar } from "lucide-react";
import MilestoneTimeline from "@/components/ui/MilestoneTimeline";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { subsidiaries, currentUserRole, deleteDocument } = useEntityStore();

  const subsidiaryId = params.id as string;
  const projectId = params.projectId as string;

  const subsidiary = subsidiaries.find((s) => s.id === subsidiaryId);
  const project = subsidiary?.projects.find((p) => p.id === projectId);

  const canEdit = currentUserRole === "admin" || currentUserRole === "committee";

  if (!subsidiary || !project) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">Project not found</h2>
        <button
          onClick={() => router.push(`/subsidiaries/${subsidiaryId}`)}
          className="text-emerald-400 text-sm mt-3 hover:underline"
        >
          Back to Subsidiary
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <button
        onClick={() => router.push(`/subsidiaries/${subsidiaryId}`)}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {subsidiary.name}
      </button>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-slate-400 mt-1 capitalize">
            {project.type.replace("_", " ")} • {project.status.replace("_", " ")}
          </p>
          {project.description && (
            <p className="text-sm text-slate-400 mt-3 max-w-2xl">
              {project.description}
            </p>
          )}
        </div>

        {canEdit && (
          <Link
            href={`/subsidiaries/${subsidiaryId}/projects/${projectId}/milestones/new`}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            <Plus className="w-4 h-4" />
            Add Milestone
          </Link>
        )}
      </div>

      {/* Timeline */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          Milestone Timeline
        </h2>

        {project.milestones.length === 0 ? (
          <div className="text-center py-14 border border-dashed border-slate-800 rounded-xl">
            <p className="text-slate-500">No milestones yet</p>
          </div>
        ) : (
          <MilestoneTimeline milestones={project.milestones} />
        )}
      </div>

      {/* Milestone List */}
      <div>
        <h2 className="text-lg font-semibold mb-4">All Milestones</h2>

        <div className="space-y-3">
          {project.milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{milestone.title}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(milestone.startDate).toLocaleDateString()} →{" "}
                  {new Date(milestone.endDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-32">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Progress</span>
                    <span>{milestone.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded-full capitalize ${
                    milestone.status === "completed"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : milestone.status === "in_progress"
                      ? "bg-blue-500/10 text-blue-400"
                      : milestone.status === "delayed"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {milestone.status.replace("_", " ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Documents</h2>

          {canEdit && (
            <Link
              href={`/subsidiaries/${subsidiaryId}/projects/${projectId}/documents/new`}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-sm px-3 py-2 rounded-lg transition"
            >
              <Plus className="w-4 h-4" />
              Upload Document
            </Link>
          )}
        </div>

        {project.documents.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl">
            <p className="text-slate-500 text-sm">No documents uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {project.documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl p-4"
              >
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {doc.type.toUpperCase()} • {doc.size} • Uploaded by {doc.uploadedBy}
                  </p>
                </div>

                {canEdit && (
                  <button
                    onClick={() =>
                      deleteDocument(subsidiaryId, projectId, doc.id)
                    }
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}