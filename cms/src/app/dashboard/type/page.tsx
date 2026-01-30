"use client";

import { useState } from "react";
import PageHeading from "@/components/layout/PageHeading";
import { DataTable } from "@/components/shared/DataTable";
import Toolbar from "@/components/shared/Toolbar";
import TableLoading from "@/components/shared/TableLoading";
import { useDeleteDialog } from "@/store/deleteDialogStore";

import {
  useProductTypes, useCreateProductType, useUpdateProductType, useDeleteProductType,
  useProductGroups, useCreateProductGroup, useUpdateProductGroup, useDeleteProductGroup
} from "@/hooks/useType";

import { typeColumns, groupColumns } from "@/components/Type/TypeColumns";
import ProductTypeForm from "@/components/shared/TypeForm";
import ProductGroupForm from "@/components/shared/GroupForm";

export default function ProductTypePage() {
  const { open } = useDeleteDialog();

  const [typeSelection, setTypeSelection] = useState<Record<string, boolean>>({});
  const [groupSelection, setGroupSelection] = useState<Record<string, boolean>>({});

  const [typeModal, setTypeModal] = useState(false);
  const [groupModal, setGroupModal] = useState(false);

  const { data: typesData, isLoading: typesLoading } = useProductTypes();
  const { data: groupsData, isLoading: groupsLoading } = useProductGroups();

  const { mutate: createType } = useCreateProductType();
  const { mutate: updateType } = useUpdateProductType();
  const { mutate: deleteType } = useDeleteProductType();

  const { mutate: createGroup } = useCreateProductGroup();
  const { mutate: updateGroup } = useUpdateProductGroup();
  const { mutate: deleteGroup } = useDeleteProductGroup();


  const getSelectedData = (selection: any, dataList: any[]) => {
    const ids = Object.keys(selection);
    if (ids.length !== 1) return null;
    return dataList?.find((item: any) => item._id === ids[0]) || null;
  };

  const selectedType = getSelectedData(typeSelection, typesData?.data || []);
  const selectedGroup = getSelectedData(groupSelection, groupsData?.data || []);

  const handleDelete = (mode: "type" | "group") => {
    const selection = mode === "type" ? typeSelection : groupSelection;
    const deleteFn = mode === "type" ? deleteType : deleteGroup;
    const setSelection = mode === "type" ? setTypeSelection : setGroupSelection;

   
    const idsToDelete = Object.keys(selection);

    if (idsToDelete.length === 0) return;

    open({
      onConfirm: () => {
        idsToDelete.forEach((id) => deleteFn(id));
        setSelection({}); 
      },
    });
  };

  if (typesLoading || groupsLoading) return <TableLoading />;

  return (
    <div className="p-6 space-y-10">
      <section className="space-y-4">
        <PageHeading
          title="Product Types"
          description=""
          onClick={() => { setTypeSelection({}); setTypeModal(true); }}
        />
        <DataTable
          columns={typeColumns}
          data={typesData?.data ?? []}
          rowSelection={typeSelection}
          onRowSelectionChange={setTypeSelection}
        />
      </section>

      <section className="space-y-4 border-t pt-10">
        <PageHeading
          title="Product Groups"
          description=""
          onClick={() => { setGroupSelection({}); setGroupModal(true); }}
        />
        <DataTable
          columns={groupColumns}
          data={groupsData?.data ?? []}
          rowSelection={groupSelection}
          onRowSelectionChange={setGroupSelection}
        />
      </section>

      <ProductTypeForm
        isOpen={typeModal}
        onClose={() => setTypeModal(false)}
        data={selectedType}
        groups={groupsData?.data}
        onSave={(fd: any) => {
          if (selectedType) updateType({ id: selectedType._id, data: fd });
          else createType(fd);
          setTypeModal(false);
          setTypeSelection({});
        }}
      />

      <ProductGroupForm
        isOpen={groupModal}
        onClose={() => setGroupModal(false)}
        data={selectedGroup}
        onSave={(fd: any) => {
          if (selectedGroup) updateGroup({ id: selectedGroup._id, data: fd });
          else createGroup(fd);
          setGroupModal(false);
          setGroupSelection({});
        }}
      />

      {Object.keys(typeSelection).length >= 1 && (
        <Toolbar
          number={Object.keys(typeSelection).length}
          label="Product Type"
          onClose={() => setTypeSelection({})}
          onView={() => setTypeModal(true)}
          onDelete={() => handleDelete("type")}
        />
      )}

      {Object.keys(groupSelection).length >= 1 && (
        <Toolbar
          number={Object.keys(groupSelection).length}
          label="Product Group"
          onClose={() => setGroupSelection({})}
          onView={() => setGroupModal(true)}
          onDelete={() => handleDelete("group")}
        />
      )}
    </div>
  );
}