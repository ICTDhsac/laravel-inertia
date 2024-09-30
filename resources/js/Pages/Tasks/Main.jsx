import React, { useState } from 'react';
import SideNav from '../Tasks/SideNav';

import { HiHome } from "react-icons/hi";
import { Breadcrumb } from 'flowbite-react';
import { usePage } from '@inertiajs/react';

export default function Main({children}) {

    const { url } = usePage();
    const { title } = usePage().props;
    const [isCollapsed, setIsCollapsed] = useState(false);

    
    const isActive = (path) => url === path ? 'active-link' : '';

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

  return (
    <div>
        <SideNav isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} isActive={isActive} />
        {/* Main Content Area */}
        <div className={`min-h-screen w-full bg-gray-200 dark:bg-gray-900 pt-20 ${isCollapsed ? '!pl-16' : '!pl-[270px]'}`}>
            {/* Content Header */}
            <section className='flex justify-between items-center'>
                <h1 className='text-slate-900 dark:text-slate-300 font-bold text-3xl flex-1'>{title}<small className='text-gray-400'> Control panel</small></h1>
                <Breadcrumb aria-label="Content Header" className='flex-none py-0 px-5'>
                    <Breadcrumb.Item href="#" icon={HiHome}>
                        Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#">Projects</Breadcrumb.Item>
                    <Breadcrumb.Item>Tasks</Breadcrumb.Item>
                </Breadcrumb>
            </section>
            {/* Main Content */}
            <main className='mt-6'>
                {children}
            </main>
        </div>
    </div>
  )
}
