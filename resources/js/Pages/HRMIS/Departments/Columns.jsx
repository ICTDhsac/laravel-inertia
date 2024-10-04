
import { Command, CopyIcon, Edit3Icon, MoreHorizontal, ViewIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DataTableColumnHeader from "@/components/reusable_components/DataTableColumnHeader";
import { Badge } from "flowbite-react";

// Define your Payment type structure
export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
                }
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
        accessorKey: 'id',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID#" />
        )
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Division" />
        ),
        cell: ({ row }) => {
            const department = row.original;
            return (
                <div className="flex space-x-4">
                    <span>{department.name}</span>
                    <Badge color="success">
                        {department.users_count}
                    </Badge>
                </div>
            )
        }
    },
    {
        id: 'Department Head',
        accessorKey: 'department_head.full_name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Department Head" />
        ),
    },
    {
        accessorKey: 'office.name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Office" />
        ),
        filterFn: "columnFilter",
    },
    {
        accessorKey: 'office.location.name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Location" />
        ),
        filterFn: "columnFilter",
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const department = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel className="flex items-center space-x-2"><Command className="w-3 h-3"/><span>Actions</span></DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="flex items-center space-x-2"
                            onClick={() => navigator.clipboard.writeText(department.id)}
                        >
                            <CopyIcon className="w-4 h-4" />
                            <span>Copy division ID</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex items-center space-x-2"
                        >
                            <ViewIcon className="w-4 h-4" />
                            <span>View division</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex items-center space-x-2"
                        >
                            <Edit3Icon className="w-4 h-4" />
                            <span>Edit</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
