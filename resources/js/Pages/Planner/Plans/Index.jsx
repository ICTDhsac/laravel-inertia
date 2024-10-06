import React from 'react';
import { DataTable } from "./DataTable";
import { columns } from "./Columns";

export default function Index({plans}) {
    
    return (
        <>
            <DataTable data={plans} columns={columns} />
        </>
    )
}
