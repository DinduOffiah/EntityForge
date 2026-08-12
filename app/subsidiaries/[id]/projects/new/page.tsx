"use client";

import { useParams } from "next/navigation";
import ProjectForm from "@/components/ui/forms/ProjectForm";

export default function NewProjectPage() {
  const params = useParams();
  const subsidiaryId = params.id as string;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Project</h1>
      <ProjectForm subsidiaryId={subsidiaryId} mode="create" />
    </div>
  );
}