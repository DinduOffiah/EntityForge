"use client";

import { useEntityStore } from "@/store/useEntityStore";
import { useParams, useRouter } from "next/navigation";
import SubsidiaryForm from "@/components/ui/forms/SubsidiaryForm";

export default function EditSubsidiaryPage() {
  const params = useParams();
  const router = useRouter();
  const { subsidiaries } = useEntityStore();

  const subsidiary = subsidiaries.find((s) => s.id === params.id);

  if (!subsidiary) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold mb-2">Subsidiary not found</h2>
        <button
          onClick={() => router.push("/subsidiaries")}
          className="text-emerald-400 hover:underline text-sm"
        >
          Back to Subsidiaries
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Subsidiary</h1>
      <SubsidiaryForm mode="edit" initialData={subsidiary} />
    </div>
  );
}