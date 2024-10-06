import React, { useState } from "react";

import MultiSelect from "@/components/reusable_components/MultiSelect";

import { lucideReactIcons } from "../../../Data/PreloadedIcons";

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
            columnFilter: (row, columnId, filterValue) => {
              if (filterValue.length === 0) return true; // No filter, return all
              return filterValue.includes(row.getValue(columnId)); // Match selected emails
            },
        },
    });

    // useEffect(() => {

    //     setOfficeOptions(() => {
    //         return offices.map((element, index) => ({
    //                 label: element.name,
    //                 value: element.name,
    //                 icon: lucideReactIcons.Building,
    //                 number: table.getFilteredRowModel().rows.filter(row => row.original.office.name === element.name).length,
    //                 key: index
    //             }));
    //     });

    // }, [offices]);


    const getSelectedRows = () => {
        const selectedRows = table.getFilteredSelectedRowModel().rows;
        return selectedRows.map((row) => row.original);
    };

    return (
        <div className="p-2">

            {/* <Button onClick={getSelectedRows}>Get Data</Button> */}
            <div className="flex items-center py-4 space-x-2">
                <input
                    placeholder="Search all .."
                    // value={{globalFilter}}
                    onChange={e => table.setGlobalFilter(e.target.value)}
                    className="input input-sm bg-slate-50 flex-none dark:text-slate-800"
                />
                
                <div className="flex-1 flex justify-end pr-2">
                    <div className="flex space-x-2">
                        {/* <label className="dark:text-slate-400 flex items-center space-x-1">
                            <lucideReactIcons.Filter className="h-4 w-4" />
                        </label>
                        <MultiSelect
                            options={officeOptions}
                            onValueChange={(selectedOptions) => {
                                table.getColumn("office_name")?.setFilterValue(selectedOptions);
                            }}
                            value={table.getColumn("office_name")?.getFilterValue() ?? []}
                            placeholder={<>
                                {<lucideReactIcons.Building className="h-3 w-3" />} <span>Office</span>
                            </>}
                            // variant="inverted"
                            className="text-slate-700 bg-slate-100 hover:bg-white"
                            animation={2}
                            maxCount={1}
                        /> */}
                        <DataTableViewOptions
                            table={table}
                            toggleLabels={{
                                office_name: 'Office',
                                office_location_name: 'Location'
                            }}
                        />
                    </div>
                </div>

            </div>

            {/* DataTable */}
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