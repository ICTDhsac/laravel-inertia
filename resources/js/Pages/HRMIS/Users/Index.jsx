import { Head } from '@inertiajs/react'
import React from 'react'
import Main from '../Main';
import { DataTable } from "./DataTable";
import { columns } from "./Columns";

export default function Index({users, title}) {

    return (
        <>
            <Head title={title} />
            <Main>
                <div>Index</div>
                <DataTable data={users} columns={columns} />
            </Main>
        </>
    )
}
