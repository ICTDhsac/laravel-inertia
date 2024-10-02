import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MultiSelect from "@/components/reusable_components/MultiSelect";
import { Cat, Dog, Fish, Rabbit, Turtle, Filter, UserRoundX, UserCheck } from "lucide-react";

import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "@/components/reusable_components/DataTablePagination";
import { DataTableViewOptions } from "@/components/reusable_components/DataTableViewOptions";


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
    const [emails, setEmails] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [status, setStatus] = useState([]);
    
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
            columnFilter: (row, columnId, filterValue) => {
              if (filterValue.length === 0) return true; // No filter, return all
              return filterValue.includes(row.getValue(columnId)); // Match selected emails
            },
            multipleEmailFilter: (row, columnId, filterValue) => {
              if (filterValue.length === 0) return true; // No filter, return all
              return filterValue.includes(row.getValue(columnId)); // Match selected emails
            },
            multipleDepartmentFilter: (row, columnId, filterValue) => {
                if (filterValue.length === 0) return true; // No filter, return all
                const departmentName = row.getValue(columnId); // Access the nested property
                return filterValue.includes(departmentName); // Match selected department names
            },
        },
    });

    useEffect(() => {
        setEmails(() => {
            return table.getFilteredRowModel().rows
            .filter(row => row.original.email !== null)
            .map((row, index) => ({
                label: row.original.email,
                value: row.original.email,
                icon: Turtle,
                number: 10,
                key: index
            }));
        })
        setDepartments(() => {
            return table.getFilteredRowModel().rows
            .filter(row => row.original.department.name !== null)
            .map((row, index) => ({
                label: row.original.department.name,
                value: row.original.department.name,
                icon: Dog,
                number: 10,
                key: index
            }));
        })

        setStatus(() => {
            const filteredRows = table.getFilteredRowModel().rows.filter(row => row.original.user_status !== null);
        
            const activeCount = filteredRows.filter(row => row.original.user_status === 'A').length;
            const inactiveCount = filteredRows.length - activeCount; // or you can filter for 'Inactive'
        
            return [
                {
                    label: 'Active',
                    value: 'A',
                    icon: UserCheck,
                    number: activeCount,
                },
                {
                    label: 'Inactive',
                    value: 'I',
                    icon: UserRoundX,
                    number: inactiveCount,
                }
            ];
        });
        
    }, []);

    const getSelectedRows = () => {
        const selectedRows = table.getFilteredSelectedRowModel().rows;
        return selectedRows.map((row) => row.original);
    };

    return (
        <div className="p-2">


            <div className="flex items-center py-4 space-x-2">
                <input
                    placeholder="Search all .."
                    // value={{globalFilter}}
                    onChange={e => table.setGlobalFilter(e.target.value)}
                    className="input input-sm bg-slate-50 flex-none dark:text-slate-800"
                />
                
                <div className="flex-1 flex justify-end pr-2">
                    <div className="flex space-x-2">
                        <label className="dark:text-slate-400 flex items-center space-x-1">
                            <Filter className="h-4 w-4" />
                        </label>
                        <MultiSelect
                            options={departments}
                            onValueChange={(selectedOptions) => {
                                table.getColumn("department_name")?.setFilterValue(selectedOptions);
                            }}
                            value={table.getColumn("department_name")?.getFilterValue() ?? []}
                            placeholder="Department"
                            // variant="inverted"
                            className="text-slate-700 bg-slate-100 hover:bg-white"
                            animation={2}
                            maxCount={1}
                        />
                        <MultiSelect
                            options={status}
                            onValueChange={(selectedOptions) => {
                                table.getColumn("user_status")?.setFilterValue(selectedOptions);
                            }}
                            value={table.getColumn("user_status")?.getFilterValue() ?? []}
                            placeholder="Status"
                            // variant="inverted"
                            className="text-slate-700 bg-slate-100 hover:bg-white"
                            animation={2}
                            maxCount={1}
                        />
                        <DataTableViewOptions table={table} />
                    </div>
                </div>

            </div>
            <div className="rounded-md">
                <Table className="dark:text-slate-800">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead className="dark:text-slate-800" key={header.id}>
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
                <DataTablePagination table={table} />
            </div>
            
        </div>
    );
}
