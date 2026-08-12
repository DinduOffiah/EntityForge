"use client";

import Link from "next/link";
import { useEntityStore } from "@/store/useEntityStore";
import { Plus, Building2, Trash2 } from "lucide-react";
import { useState } from "react";

export default function SubsidiariesPage() {
  const { subsidiaries, deleteSubsidiary, currentUserRole } = useEntityStore();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const canEdit = currentUserRole === "admin" || currentUserRole === "committee";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Subsidiaries</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage all entities under the holding company
          </p>
        </div>

        {canEdit && (
          <Link
            href="/subsidiaries/new"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition"
          >
            <Plus className="w-4 h-4" />
            Add Subsidiary
          </Link>
        )}
      </div>

      {subsidiaries.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <Building2 className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p>No subsidiaries yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {subsidiaries.map((sub) => (
            <div
              key={sub.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Link
                    href={`/subsidiaries/${sub.id}`}
                    className="font-semibold text-lg hover:text-emerald-400 transition"
                  >
                    {sub.name}
                  </Link>
                  <p className="text-sm text-slate-400 mt-1">
                    {sub.industry} • {sub.country}
                  </p>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded-full ${
                    sub.status === "active"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : sub.status === "inactive"
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {sub.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>{sub.projects.length} projects</span>
                <span>Founded {sub.foundedYear}</span>
              </div>

              {canEdit && (
                <div className="mt-4 pt-4 border-t border-slate-800 flex gap-2">
                  <Link
                    href={`/subsidiaries/${sub.id}/edit`}
                    className="text-sm text-slate-400 hover:text-white transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setConfirmDeleteId(sub.id)}
                    className="text-sm text-red-400 hover:text-red-300 transition ml-auto"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Simple Delete Confirmation */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-sm w-full mx-4">
            <h3 className="font-semibold text-lg mb-2">Delete Subsidiary?</h3>
            <p className="text-sm text-slate-400 mb-6">
              This will also delete all projects and milestones under it. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 text-sm rounded-lg bg-slate-800 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteSubsidiary(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="px-4 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}