import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export const typeColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    id: "index",
    header: "No",
    cell: ({ row }) => <span className="text-slate-500 font-medium">{row.index + 1}</span>,
  },
  { accessorKey: "name", header: "Type Name" },
  {
    accessorKey: "group",
    header: "Group",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.original.group?.name || "—"}</Badge>
    ),
  },
  { 
    accessorKey: "description", 
    header: "Description",
    cell: ({ row }) => (
      <span className="text-slate-500 text-sm truncate max-w-50 inline-block">
        {row.original.description || "—"}
      </span>
    )
  },
];

export const groupColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    id: "index",
    header: "No",
    cell: ({ row }) => <span className="text-slate-500 font-medium">{row.index + 1}</span>,
  },
  { accessorKey: "name", header: "Group Name" },
  { 
    accessorKey: "description", 
    header: "Description",
    cell: ({ row }) => (
      <span className="italic text-slate-500 text-sm truncate max-w-100 inline-block">
        {row.original.description || "No description"}
      </span>
    ),
  },
];