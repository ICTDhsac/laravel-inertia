import React, { useState } from 'react';
import SideNav from './SideNav';

import { lucideReactIcons } from '@/Data/PreloadedIcons';
import { Breadcrumb } from 'flowbite-react';
import { Head, usePage } from '@inertiajs/react';

import { Flowbite } from "flowbite-react";
import { Lines } from 'react-preloaders';

import Header from '../Header';

// import { BsThreeDots } from "react-icons/bs";
// import ThemeToggle from './ThemeToggle';

export default function PlannerLayout({ children }) {

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
                <section>

                    <SideNav isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} isActive={isActive} />
                    {/* Main Content Area */}
                    <div className={`flex flex-col min-h-screen w-full bg-gray-200 dark:bg-gray-900 pt-20 ${isCollapsed ? '!pl-16' : '!pl-[270px]'}`}>
                        {/* Content Header */}
                        <section className='flex justify-between items-center'>
                            <h1 className='text-slate-900 dark:text-slate-100 font-bold text-3xl flex-1'>{title}<small className='text-gray-400'> Control panel</small></h1>
                            <Breadcrumb aria-label="Content Header" className='flex-none py-0 px-5'>
                                {navigationLinks && navigationLinks.map((nav, i) => (
                                    <Breadcrumb.Item key={i} href={nav.link} icon={lucideReactIcons[nav.icon]}>
                                        {nav.label}
                                    </Breadcrumb.Item>
                                ))}
                            </Breadcrumb>
                        </section>
                        {/* Main Content */}
                        <main className='flex-1 overflow-y-auto mt-6'>
                            {children}
                        </main>
                    </div>

                </section>
            </Flowbite>
            <Lines animation="slide-right" />
        </React.Fragment>
        </>
    );
}
