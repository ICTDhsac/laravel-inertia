import React from 'react'
import { DataTable } from "./DataTable";
import { columns } from "./Columns";

export default function Index({positions}) {

    return (
        <>
            <DataTable data={positions} columns={columns} />
        </>
    )
}
