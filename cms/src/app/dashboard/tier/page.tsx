"use client";

import { useState } from "react";
import PageHeading from "@/components/layout/PageHeading";
import { DataTable } from "@/components/shared/DataTable";
import Toolbar from "@/components/shared/Toolbar";
import TableLoading from "@/components/shared/TableLoading";
import { useDeleteDialog } from "@/store/deleteDialogStore";

import { tierColumns } from "@/components/Service/TierColumns";
import TierForm from "@/components/shared/TierForm";
import {
  useTiers,
  useCreateTier,
  useUpdateTier,
  useDeleteTier,
} from "@/hooks/useTier";

export default function TierPage() {
  const { open } = useDeleteDialog();

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [tierModal, setTierModal] = useState(false);

  const { data: tiersData, isLoading } = useTiers();

  const { mutate: createTier } = useCreateTier();
  const { mutate: updateTier } = useUpdateTier();
  const { mutateAsync: deleteTier } = useDeleteTier();

  // Get selected tier (only when exactly one is selected)
  const selectedTier =
    Object.keys(rowSelection).length === 1
      ? tiersData?.data?.find(
          (tier: any) => tier._id === Object.keys(rowSelection)[0]
        )
      : null;

  const handleDelete = () => {
    const idsToDelete = Object.keys(rowSelection);
    if (idsToDelete.length === 0) return;

    open({
      onConfirm: async () => {
        for (const id of idsToDelete) {
          await deleteTier(id);
        }
        setRowSelection({});
      },
    });
  };

  if (isLoading) return <TableLoading />;

  return (
    <div className="p-6 space-y-10">
      <section className="space-y-4">
        <PageHeading
          title="Service Tier"
          description=""
          onClick={() => {
            setRowSelection({});
            setTierModal(true);
          }}
        />

        <DataTable
          columns={tierColumns}
          data={tiersData?.data ?? []}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
      </section>

      {/* Create / Edit Tier */}
      <TierForm
        isOpen={tierModal}
        onClose={() => setTierModal(false)}
        data={selectedTier}
        onSave={(formData: any) => {
          if (selectedTier) {
            updateTier({ id: selectedTier._id, data: formData });
          } else {
            createTier(formData);
          }
          setTierModal(false);
          setRowSelection({});
        }}
      />

      {/* Bulk Toolbar */}
      {Object.keys(rowSelection).length >= 1 && (
        <Toolbar
          number={Object.keys(rowSelection).length}
          label="Tier"
          onClose={() => setRowSelection({})}
          onView={() => setTierModal(true)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
