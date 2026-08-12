import SubsidiaryForm from "@/components/ui/forms/SubsidiaryForm";

export default function NewSubsidiaryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Subsidiary</h1>
      <SubsidiaryForm mode="create" />
    </div>
  );
}