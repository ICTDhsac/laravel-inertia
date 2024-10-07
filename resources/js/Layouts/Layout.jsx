import React, { useState } from 'react';
import SideNav from './SideNav';

import { lucideReactIcons } from '@/Data/PreloadedIcons';
import { Breadcrumb } from 'flowbite-react';
import { Head, usePage } from '@inertiajs/react';

import { Flowbite } from "flowbite-react";
import { Lines } from 'react-preloaders';

import Header from './Header';

// import { BsThreeDots } from "react-icons/bs";
// import ThemeToggle from './ThemeToggle';

export default function Layout({ children }) {

    const { url } = usePage();
    const { title, navigationLinks } = usePage().props;
    const [isCollapsed, setIsCollapsed] = useState(false);

    const isActive = (path) => url === path ? 'active-link' : '';

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
        <Head title={title} />
        <React.Fragment >
            <Flowbite>
                <Header />
                <main>
                    {children}
                </main>

            </Flowbite>
            <Lines animation="slide-right" />
        </React.Fragment>
        </>
    );
}
