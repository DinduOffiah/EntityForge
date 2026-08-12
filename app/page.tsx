"use client";

import { useEntityStore } from "@/store/useEntityStore";

export default function DashboardPage() {
  const { subsidiaries } = useEntityStore();

  const totalProjects = subsidiaries.reduce(
    (acc, s) => acc + s.projects.length,
    0
  );

  const activeProjects = subsidiaries.reduce(
    (acc, s) => acc + s.projects.filter((p) => p.status === "active").length,
    0
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-sm text-slate-400 mb-1">Subsidiaries</p>
          <p className="text-3xl font-bold">{subsidiaries.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-sm text-slate-400 mb-1">Total Projects</p>
          <p className="text-3xl font-bold">{totalProjects}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-sm text-slate-400 mb-1">Active Projects</p>
          <p className="text-3xl font-bold text-emerald-400">{activeProjects}</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Recent Subsidiaries</h2>
      <div className="space-y-3">
        {subsidiaries.map((sub) => (
          <div
            key={sub.id}
            className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl"
          >
            <div>
              <p className="font-medium">{sub.name}</p>
              <p className="text-sm text-slate-400">
                {sub.industry} • {sub.country}
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
              {sub.projects.length} projects
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}