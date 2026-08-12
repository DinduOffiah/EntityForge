"use client";

import { Milestone } from "@/lib/types";
import { format, differenceInDays, parseISO } from "date-fns";

interface Props {
  milestones: Milestone[];
}

export default function MilestoneTimeline({ milestones }: Props) {
  if (milestones.length === 0) return null;

  // Find the overall date range
  const allDates = milestones.flatMap((m) => [
    parseISO(m.startDate),
    parseISO(m.endDate),
  ]);
  const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())));
  const totalDays = differenceInDays(maxDate, minDate) || 1;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 overflow-x-auto">
      <div className="min-w-[700px]">
        {/* Month labels could be added later */}
        <div className="space-y-5">
          {milestones.map((milestone) => {
            const start = parseISO(milestone.startDate);
            const end = parseISO(milestone.endDate);

            const leftPercent =
              (differenceInDays(start, minDate) / totalDays) * 100;
            const widthPercent =
              (differenceInDays(end, start) / totalDays) * 100;

            return (
              <div key={milestone.id} className="relative">
                <div className="flex items-center gap-4 mb-1">
                  <span className="text-sm font-medium w-48 truncate">
                    {milestone.title}
                  </span>
                  <span className="text-xs text-slate-500">
                    {format(start, "MMM d")} – {format(end, "MMM d")}
                  </span>
                </div>

                <div className="h-8 bg-slate-800 rounded-lg relative overflow-hidden">
                  <div
                    className={`absolute h-full rounded-lg transition-all ${
                      milestone.status === "completed"
                        ? "bg-emerald-500"
                        : milestone.status === "in_progress"
                        ? "bg-blue-500"
                        : milestone.status === "delayed"
                        ? "bg-red-500"
                        : "bg-slate-600"
                    }`}
                    style={{
                      left: `${leftPercent}%`,
                      width: `${Math.max(widthPercent, 2)}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}