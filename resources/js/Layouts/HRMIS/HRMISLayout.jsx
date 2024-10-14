import React, { useEffect, useState } from 'react';
import SideNav from './SideNav';
import Header from '../Header';
import { Breadcrumb, Flowbite } from 'flowbite-react';
import { Head, usePage } from '@inertiajs/react';
import { Lines } from 'react-preloaders';
import { lucideReactIcons } from '@/Data/PreloadedIcons';

export default function HRMISLayout({children}) {

    const { url } = usePage();
    const { title, navigationLinks } = usePage().props;
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [isAnimating, setIsAnimating] = useState(true);  // Controls animation visibility

    // Stop the animation after a short delay (e.g., 2 seconds)
    useEffect(() => {
        const timeout = setTimeout(() => setIsAnimating(false), 2000);  // Adjust duration as needed
        return () => clearTimeout(timeout); 
    }, [])

    
    const isActive = (path) => url === path ? 'active-link' : '';

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

  return (
    <>
        <React.Fragment>
            <Flowbite>
                <Head title={title} />

                <Header />

                <SideNav isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} isActive={isActive} />
                
                {/* Main Content Area */}
                <div className={`min-h-screen bg-gray-200 dark:bg-gray-900 pt-20 ${isCollapsed ? '!pl-16' : '!pl-[270px]'}`}>
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
                    <main className='mt-6'>
                        {children}
                    </main>
                </div>
            </Flowbite>
            {isAnimating && <Lines animation="slide-right" />}
        </React.Fragment>
    </>
  )
}
