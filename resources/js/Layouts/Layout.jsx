import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { FaHome, FaFile } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoLogoCodepen } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { GiToggles } from "react-icons/gi";
import ThemeToggle from './ThemeToggle';

export default function Layout({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const { url } = usePage();

    // Function to check if a link is active
    const isActive = (path) => url === path ? 'active-link' : '';

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="container-fluid">
            <header>
                <div className="navbar text-black">
                    <div className="flex-none">
                        <button onClick={toggleSidebar} className="btn btn-square btn-ghost dark:text-gray-200">
                            <GiToggles />
                        </button>
                    </div>
                    <div className="flex-1">
                        <a className="btn btn-ghost dark:text-gray-200 text-xl">MyApp</a>
                    </div>
                    <div className="flex-none">
                        <ThemeToggle />
                        <div className="dropdown dropdown-end dropdown-hover dark:text-gray-200">
                            <div tabIndex={0} role="button" className='btn m-1 btn-square btn-ghost'><BsThreeDots /></div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 text-gray-200 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>View Profile</a></li>
                                <li><a>Change Password</a></li>
                                <li><a>Log Out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>


            </header>

            <div>
                {/* Side Navigation Bar */}
                <aside className={`fixed flex flex-col pt-20 h-screen border-r border-neutral-300 dark:border-neutral-600 bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100 p-6 space-y-6 transition-all duration-300 ${isCollapsed ? 'min-w-20' : 'min-w-64'} `}>
                    
                    {/* Logo */}
                    <div className={`hidden items-center space-x-2 justify-center`}>
                        {/* <img src="https://your-logo-url.com/logo.png" alt="Logo" className="h-10" /> */}
                        <IoLogoCodepen size={40} />
                        {!isCollapsed && <span className="text-3xl font-bold text-primary">MyApp</span>}
                    </div>

                    {/* Divider */}
                    <div className="divider divider-neutral"></div>

                    {/* Avatar and Username */}
                    <div className={`flex items-center mb-6 space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
                        <div className="avatar">
                            <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User Avatar" />
                            </div>
                        </div>
                        {!isCollapsed && <span className="text-lg">John Doe</span>}
                    </div>

                    {/* Divider */}
                    <div className="divider divider-neutral"></div>

                    {/* Navigation Links */}
                    <ul className="space-y-4 mt-6">
                        <li className=''>
                            <Link className={`side-nav-link active-link ${isActive('/')}`} href="/">
                                <FaHome />
                                {!isCollapsed && <span>Dashboard</span>}
                            </Link>
                        </li>
                        <li>
                            <Link className={`side-nav-link ${isActive('/reports')}`} href="#">
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
                    <div className="">
                        {!isCollapsed && <span className="text-sm text-gray-400">&copy; 2024 MyApp</span>}
                    </div>
                
                </aside>

                {/* Main Content Area */}
                <div className={`bg-white dark:bg-gray-900 pt-20 ${isCollapsed ? '!pl-28' : '!pl-72'}`}>

                    {/* Main Content */}
                    <main className="overflow-x-auto min-h-lvh">
                        {children}
                    </main>
                </div>

            </div>

        </div>
    );
}
