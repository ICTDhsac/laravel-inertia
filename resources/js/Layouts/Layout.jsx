import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

import { Flowbite, Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Lines } from 'react-preloaders';
import { FaHome, FaFile, FaPlus, FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoLogoCodepen } from "react-icons/io";
import { GiToggles } from "react-icons/gi";
import Header from './Header';
// import { BsThreeDots } from "react-icons/bs";
// import ThemeToggle from './ThemeToggle';

export default function Layout({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const { url } = usePage();

    // Function to check if a link is active
    const isActive = (path) => url === path ? 'active-link' : '';

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <React.Fragment >
            <Flowbite>
                <Header />

                <section>
                    {/* Side Navigation Bar */}
                    <aside className={`fixed flex flex-col px-0 pt-10 h-screen border-r border-neutral-300 dark:border-neutral-600 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 p-6 space-y-6 transition-all duration-300 ${isCollapsed ? 'min-w-auto' : 'min-w-64'} `}>
                        
                        {/* Logo */}
                        <div className={`hidden items-center space-x-2 justify-center`}>
                            <IoLogoCodepen size={40} />
                            {!isCollapsed && <span className="text-3xl font-bold text-primary">MyApp</span>}
                        </div>
                        <button onClick={toggleSidebar} className="block p-3 text-right border-b border-gray-300 dark:border-neutral dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300">
                            <GiToggles className='inline-block' title="Collapse the left navigation pane" />
                        </button>

                        {/* Divider */}
                        {/* <div className="divider divider-neutral"></div> */}

                        {/* Avatar and Username */}
                        {/* <div className={`flex items-center mb-6 space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
                            <div className="avatar">
                                <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User Avatar" />
                                </div>
                            </div>
                            {!isCollapsed && <span className="text-lg">John Doe</span>}
                        </div> */}

                        {/* Divider */}
                        {/* <div className="divider divider-neutral"></div> */}

                        {/* Navigation Links */}
                        <ul className='border-b dark:border-neutral'>
                            <li>
                                <Link className={`side-nav-link`} href="/">
                                    <FaPlus />
                                    {!isCollapsed && <span>New Plan</span>}
                                </Link>
                            </li>
                            <li>
                                <Link className={`side-nav-link ${isActive('/')}`} href="/">
                                    <FaHome />
                                    {!isCollapsed && <span>Hub</span>}
                                </Link>
                            </li>
                            <li>
                                <Link className={`side-nav-link ${isActive('/posts')}`} href="/posts">
                                    <FaUser />
                                    {!isCollapsed && <span>Assign to me</span>}
                                </Link>
                            </li>
                        </ul>
                        <ul className="flex-grow">
                            <li>
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="btn m-1">Click</div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <li><a>Item 1</a></li>
                                        <li><a>Item 2</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <Link className={`side-nav-link ${isActive('/drawer')}`} href="/drawer">
                                    <FaFile />
                                    {!isCollapsed && <span>Reports</span>}
                                </Link>
                            </li>
                            <li>
                                <Link className={`side-nav-link ${isActive('/settings')}`} href="#">
                                    <FaGear />
                                    {!isCollapsed && <span>Settings</span>}
                                </Link>
                            </li>
                        </ul>

                        {/* Footer */}
                        <div className="mt-auto absolute bottom-0 left-0 w-full p-6">
                            {!isCollapsed && <span className="text-sm text-gray-400">&copy; 2024 MyApp</span>}
                        </div>
                    
                    </aside>

                    {/* Main Content Area */}
                    <div className={`bg-gray-200 dark:bg-gray-900 pt-20 ${isCollapsed ? '!pl-16' : '!pl-[270px]'}`}>

                        {/* Content Header */}
                        <section className='flex justify-between items-center'>
                            <h1 className='text-slate-900 dark:text-slate-300 font-bold text-3xl flex-1'>Page Title<small className='text-gray-400'> Control panel</small></h1>
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

                </section>

            </Flowbite>
            <Lines animation="slide-right" />
        </React.Fragment>
    );
}
