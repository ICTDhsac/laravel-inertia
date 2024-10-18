import React, { useEffect, useState } from 'react';
import SideNav from './SideNav';

import { lucideReactIcons } from '@/Data/PreloadedIcons';
import { Breadcrumb } from 'flowbite-react';
import { Head, usePage, router } from '@inertiajs/react';

import { Flowbite } from "flowbite-react";
import { Lines } from 'react-preloaders';

import Header from '../Header';

/* SweetAlert */
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);


export default function PlannerLayout({ children }) {

    const { url } = usePage();
    const { title, navigationLinks, sessionTimeOut } = usePage().props;
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true); 
    const [timeLeft, setTimeLeft] = useState(sessionTimeOut * 60);

    const handleLogOut = () => {
        MySwal.fire({
            title: <p>Log Out?</p>,
            text: 'Do you want to proceed?',
            icon: 'question',
            showCancelButton: true,  // Show the cancel button
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                router.get('/logout', {
                    onFinish: () => window.location.href = '/login',
                });
            }
        });
    }

    useEffect(() => {
        const handleSession = () => {
            console.log("Session refresh");
            setTimeLeft(sessionTimeOut * 60);
        };

        const removeSuccessListener = router.on('success', handleSession);
        const removeErrorListener = router.on('error', handleSession);

        return () => {
            removeSuccessListener();
            removeErrorListener();
        };
    }, [sessionTimeOut]);

    /* for session timeout */
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => Math.max(prev - 10, 0));
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleLogOut();
        }
    }, [timeLeft]);

    /* for preloader */
    useEffect(() => {
        const timeout = setTimeout(() => setIsAnimating(false), 2000); 
        return () => clearTimeout(timeout); 
    }, []);

    const isActive = (path) => url === path ? 'active-link' : '';

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
        <Head title={title} />
        <React.Fragment >
            <Flowbite>
                <Head title={title} />
                <Header onLogOut={handleLogOut} />
                <section>

                    <SideNav isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} isActive={isActive} timeLeft={timeLeft} />
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
            {isAnimating && <Lines animation="slide-right" />}
        </React.Fragment>
        </>
    );
}
