import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MultiSelect from "@/components/reusable_components/MultiSelect";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "@/components/reusable_components/DataTablePagination";
import { DataTableViewOptions } from "@/components/reusable_components/DataTableViewOptions";

const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'success', label: 'Success' }
];

const sample_emails = [
    { label: "test@example.com", value: "test@example.com", icon: Turtle, number: 10 },
    { label: "user@example.com", value: "user@example.com", icon: Dog, number: 15 },
    { label: "email3@example.com", value: "email3@example.com", icon: Cat, number: 20 },
  ];

const frameworksList = [
    { value: "react", label: "React", icon: Turtle },
    { value: "angular", label: "Angular", icon: Cat },
    { value: "vue", label: "Vue", icon: Dog },
    { value: "svelte", label: "Svelte", icon: Rabbit },
    { value: "ember", label: "Ember", icon: Fish },
  ];

export function DataTable({ data, columns }) {

    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const [status, setStatus] = useState([]);
    const [selectedFrameworks, setSelectedFrameworks] = useState([]);
    
    const table = useReactTable({
        data,
        columns,
        // manualPagination: true,
        // pageCount: 4,
        // rowCount: 18,
        autoResetPageIndex: false,
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: { 
        sorting,
            columnFilters,
            globalFilter,
            columnVisibility,
            rowSelection,
        },
        onGlobalFilterChange: setGlobalFilter,
        filterFns: { //for multi-filter
            multipleEmailFilter: (row, columnId, filterValue) => {
              if (filterValue.length === 0) return true; // No filter, return all
              return filterValue.includes(row.getValue(columnId)); // Match selected emails
            },
        },
    });

    const getSelectedRows = () => {
        const selectedRows = table.getFilteredSelectedRowModel().rows;
        return selectedRows.map((row) => row.original);
    };

    return (
        <div>
            <Button onClick={ () => console.log(getSelectedRows()) }>Show selected data</Button>
            <select
                multiple
                value={table.getColumn("email")?.getFilterValue() ?? []}
                onChange={(event) => {
                    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
                    table.getColumn("email")?.setFilterValue(selectedOptions);
                }}
                className="max-w-sm bg-slate-50 hidden"
            >
                <option value="test@example.com">test@example.com</option>
                <option value="user@example.com">user@example.com</option>
                <option value="email3@example.com">email3@example.com</option>
            </select>

            {/* new select from shadcn ui */}
            <div className="p-4 max-w-xl">
                <h1 className="text-2xl font-bold mb-4">Filter Emails</h1>
                <MultiSelect
                    options={sample_emails}
                    onValueChange={(selectedOptions) => {
                        console.log(selectedOptions); 
                        table.getColumn("email")?.setFilterValue(selectedOptions);
                    }}
                    value={table.getColumn("email")?.getFilterValue() ?? []}
                    placeholder="Select emails"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                />
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Selected Emails:</h2>
                    <ul className="list-disc list-inside">
                    {(table.getColumn("email")?.getFilterValue() ?? []).map((email) => (
                        <li key={email}>{email}</li>
                    ))}
                    </ul>
                </div>
            </div>

            {/* new select from shadcn ui */}
            <div className="p-4 max-w-xl">
                <h1 className="text-2xl font-bold mb-4">Multi-Select Component</h1>
                <MultiSelect
                    options={sample_emails}
                    onValueChange={setSelectedFrameworks}
                    defaultValue={selectedFrameworks}
                    placeholder="Select frameworks"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                />
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Selected Frameworks:</h2>
                    <ul className="list-disc list-inside">
                    {selectedFrameworks.map((framework) => (
                        <li key={framework}>{framework}</li>
                    ))}
                    </ul>
                </div>
            </div>




            <div className="flex items-center py-4 space-x-2">
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("email")?.getFilterValue()) ?? ""}
                    onChange={(event) =>
                        table.getColumn("email")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm bg-slate-50"
                />
                <Input
                    placeholder="Search all .."
                    // value={{globalFilter}}
                    onChange={e => table.setGlobalFilter(e.target.value)}
                    className="max-w-sm bg-slate-50"
                />
                {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Show/Hide
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                    column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                                );
                        })}
                    </DropdownMenuContent>
                </DropdownMenu> */}
                <DataTableViewOptions table={table} />

            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
                                {header.isPlaceholder ? null : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                            </TableHead>
                            ))}
                        </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                            </TableRow>
                        ))
                        ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* <div className="flex px-5">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of&nbsp;
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                    Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div> */}
            <DataTablePagination table={table} />
        </div>
    );
}
