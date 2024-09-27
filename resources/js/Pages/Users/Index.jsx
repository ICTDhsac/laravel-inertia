import { Head, usePage } from '@inertiajs/react'
import React from 'react'

export default function Index({users, title}) {

    console.log(usePage());

    return (
        <>
            <Head title={title} />
            <div>Index</div>
        </>
    )
}
