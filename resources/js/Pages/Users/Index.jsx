import { Head, usePage } from '@inertiajs/react'
import React from 'react'
import Main from './Main';

export default function Index({users, title}) {

    console.log(usePage());
    console.log(users);

    return (
        <>
            <Head title={title} />
            <Main>
                <div>Index</div>
                {/* {users && users.map((user, index) => (
                    <div key={index}>
                        {user.first_name} {user.last_name}
                    </div>
                ))} */}
            </Main>
        </>
    )
}
