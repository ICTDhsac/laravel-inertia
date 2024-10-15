import React, { useEffect, useState } from 'react';
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
    const { title } = usePage().props;
    const [isCollapsed, setIsCollapsed] = useState(false);

    const isActive = (path) => url === path ? 'active-link' : '';

    const [isAnimating, setIsAnimating] = useState(true); 

    useEffect(() => {
        const timeout = setTimeout(() => setIsAnimating(false), 2000); 
        return () => clearTimeout(timeout); 
    }, []);

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
            {isAnimating && <Lines animation="slide-right" />}
        </React.Fragment>
        </>
    );
}
