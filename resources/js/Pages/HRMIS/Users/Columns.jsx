
import { cn } from "@/lib/utils";
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
        ),
    },
    {
        accessorKey: 'employee_id',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Employee ID" />
        ),
    },
    {
        accessorKey: 'fullname',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        filterFn: "columnFilter",
    },
    {
        id: 'department_name',
        accessorKey: 'department.name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Department" />
        ),
        filterFn: "columnFilter",
    },
    {
        accessorKey: 'user_status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = row.getValue('user_status');
            const badgeLabel = status === 'A' ? 'Active' : 'Inactive';
            const badgeColor = status === 'A' ? 'success' : 'failure'; 

            return (
                <div className="flex justify-center">
                    <Badge className="justify-center max-w-min" color={badgeColor}>
                        {badgeLabel}
                    </Badge>
                </div>
            );
        },
        filterFn: "columnFilter",
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const employee = row.original;

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
                            onClick={() => navigator.clipboard.writeText(employee.employee_id)}
                        >
                            <CopyIcon className="w-4 h-4" />
                            <span>Copy employee ID</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex items-center space-x-2"
                        >
                            <ViewIcon className="w-4 h-4" />
                            <span>View employee</span>
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
