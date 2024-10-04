import React from 'react';
import { DataTable } from "./DataTable";
import { columns } from "./Columns";

export default function Index({departments}) {
    
    return (
        <>
            <DataTable data={departments} columns={columns} />
        </>
    )
}
