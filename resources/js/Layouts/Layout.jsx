import React from 'react';

import { Flowbite } from "flowbite-react";
import { Lines } from 'react-preloaders';

import Header from './Header';

// import { BsThreeDots } from "react-icons/bs";
// import ThemeToggle from './ThemeToggle';

export default function Layout({ children }) {

    return (
        <>
        <React.Fragment >
            <Flowbite>
                <Header />
                <section>
                    {children}
                </section>
            </Flowbite>
            <Lines animation="slide-right" />
        </React.Fragment>
        </>
    );
}
