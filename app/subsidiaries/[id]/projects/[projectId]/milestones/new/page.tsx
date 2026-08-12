"use client";

import { useParams } from "next/navigation";
import MilestoneForm from "@/components/ui/forms/MilestoneForm";

export default function NewMilestonePage() {
  const params = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add Milestone</h1>
      <MilestoneForm
        subsidiaryId={params.id as string}
        projectId={params.projectId as string}
        mode="create"
      />
    </div>
  );
}