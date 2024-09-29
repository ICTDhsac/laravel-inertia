import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "@/components/reusable_components/DataTablePagination";
import { DataTableViewOptions } from "@/components/reusable_components/DataTableViewOptions";

export function DataTable({ data, columns }) {

    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    
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
                    console.log(selectedOptions)
                    table.getColumn("email")?.setFilterValue(selectedOptions);
                }}
                className="max-w-sm bg-slate-50"
            >
                <option value="test@example.com">test@example.com</option>
                <option value="user@example.com">user@example.com</option>
                <option value="email3@example.com">email3@example.com</option>
            </select>
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
