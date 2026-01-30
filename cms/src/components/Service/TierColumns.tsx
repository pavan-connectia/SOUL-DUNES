import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export const tierColumns: ColumnDef<any>[] = [
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
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <span className="text-slate-500 text-sm truncate max-w-50 inline-block">
                {row.original.description || "—"}
            </span>
        )
    },
    {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => (
            <Badge variant={row.original.isActive ? "default" : "secondary"}>
                {row.original.isActive ? "Active" : "Inactive"}
            </Badge>
        )
    }

];
