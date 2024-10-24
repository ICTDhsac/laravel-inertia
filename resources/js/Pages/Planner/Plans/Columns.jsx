
import { Command, CopyIcon, Edit3Icon, MoreHorizontal, ViewIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DataTableColumnHeader from "@/components/reusable_components/DataTableColumnHeader";
import { Badge } from "flowbite-react";
import { router } from "@inertiajs/react";

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
            <DataTableColumnHeader column={column} title="Plan Name" />
        ),
    },
    {
        accessorKey: 'privacy',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Privacy" />
        ),
    },
    {
        accessorKey: 'is_group_plan',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Group Plan" />
        ),
        cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
    },
    {
        id: 'actions',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Action" />
        ),
        cell: ({ row }) => {
            const plan = row.original;

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
                            onClick={() => navigator.clipboard.writeText(plan.id)}
                        >
                            <CopyIcon className="w-4 h-4" />
                            <span>Copy plan ID</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex items-center space-x-2"
                            // onClick={() => router.get(`/plans/${plan.id}`)}
                        >
                            <ViewIcon className="w-4 h-4" />
                            <span>View plan</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex items-center space-x-2"
                            onClick={() => router.get(`/plans/${plan.id}/edit`)}
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
