"use client";

import { useParams } from "next/navigation";
import DocumentForm from "@/components/ui/forms/DocumentForm";

export default function NewDocumentPage() {
  const params = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Upload Document</h1>
      <DocumentForm
        subsidiaryId={params.id as string}
        projectId={params.projectId as string}
      />
    </div>
  );
}