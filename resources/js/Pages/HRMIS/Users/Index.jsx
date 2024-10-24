import React from 'react';
import { DataTable } from "./DataTable";
import { columns } from "./Columns";

export default function Index({users, departments}) {

    return (
        <>
            <DataTable data={users} departments={departments} columns={columns} />
        </>
    )
}
