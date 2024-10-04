import React from 'react';
import { DataTable } from "./DataTable";
import { columns } from "./Columns";

export default function Index({offices}) {
    
    return (
        <>
            <DataTable data={offices} columns={columns} />
        </>
    )
}
