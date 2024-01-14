'use client';
import { Checkbox } from "@/core/components/ui/checkbox";
import { type AppRouter } from "@/server/api/root";
import { type ColumnDef } from "@tanstack/react-table";
import { type inferProcedureOutput } from "@trpc/server";
import { DataTableColumnHeader } from "./data-table-column-header";
import { PROPERTY_STATUS_OPTIONS } from "@/features/properties/schema";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<
  inferProcedureOutput<AppRouter["propertyRouter"]["getMyProperties"]>[0]
>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
//   {
//     accessorKey: "id",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Task" />
//     ),
//     cell: ({ row }) => null,//<div className="w-[80px]">{row.getValue("id")}</div>,
//     enableSorting: false,
//     enableHiding: false,
//   },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = PROPERTY_STATUS_OPTIONS.find(
        (status) => status === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center capitalize">
          <span>{status}</span>
        </div>
      );
    },
    // filterFn: (row, id, value) => {
    //   return value.includes(row.getValue(id))
    // },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center capitalize gap-1">
          <span className = "font-semibold">{"PKR"}</span>
          <span>{row.getValue("price")}</span>
        </div>
      );
    },
    // filterFn: (row, id, value) => {
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    //   return value.includes(row.getValue(id) ?? '')
    // },
  },
  {
    accessorKey: "purpose",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property Purpose" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center capitalize">
          <span>{row.getValue("purpose")}</span>
        </div>
      );
    },
    // filterFn: (row, id, value) => {
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    //   return value.includes(row.getValue(id) ?? '')
    // },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("type")}</span>
        </div>
      );
    },
    // filterFn: (row, id, value) => {
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    //   return value.includes(row.getValue(id) ?? '')
    // },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
