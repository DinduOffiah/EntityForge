"use client";

import { useEntityStore } from "@/store/useEntityStore";
import { UserRole } from "@/lib/types";

export default function Header() {
  const { currentUserRole, setUserRole } = useEntityStore();

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-6">
      <div className="font-semibold text-lg tracking-tight">EntityForge</div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-400">Role:</span>
        <select
          value={currentUserRole}
          onChange={(e) => setUserRole(e.target.value as UserRole)}
          className="bg-slate-900 border border-slate-700 text-sm rounded-md px-3 py-1.5"
        >
          <option value="admin">Admin</option>
          <option value="committee">Committee</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>
    </header>
  );
}