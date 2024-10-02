import { Head } from '@inertiajs/react'
import React from 'react'
import Main from '../Main';
import { DataTable } from "./DataTable";
import { columns } from "./Columns";

export default function Index({users, departments, title}) {

    return (
        <>
            <Head title={title} />
            <Main>
                <div>Index</div>
                <DataTable data={users} departments={departments} columns={columns} />
            </Main>
        </>
    )
}
