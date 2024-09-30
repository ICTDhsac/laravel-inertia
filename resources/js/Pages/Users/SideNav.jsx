import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

import { FaHome, FaFile, FaPlus, FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoIosArrowDropdownCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { GiToggles } from "react-icons/gi";

export default function SideNav({ isCollapsed, toggleSidebar, isActive  }) {

    const [dropDownToggle, setDropdownToggle] = useState(false);

    // Function to check if a link is active

  return (
    <>
            {/* Side Navigation Bar */}
        <aside className={`fixed flex flex-col px-0 pt-16 h-screen border-r border-neutral-300 dark:border-neutral-600 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 space-y-6 transition-all duration-300 ${isCollapsed ? 'min-w-auto' : 'min-w-64'} `}>
            
            {/* Logo */}
            <button onClick={toggleSidebar} className="block p-3 text-right border-b border-gray-300 dark:border-neutral dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300">
                <GiToggles className='inline-block' title="Collapse the left navigation pane" />
            </button>

            {/* Navigation Links */}
            <ul className='border-b dark:border-neutral'>
                <li>
                    <Link className={`side-nav-link ${isActive('/')}`} href="/">
                        <FaHome />
                        {!isCollapsed && <span>Dashboard</span>}
                    </Link>
                </li>
                <li>
                    <Link className={`side-nav-link ${isActive('/users')}`} href="/users">
                        <FaUser />
                        {!isCollapsed && <span>Users Account</span>}
                    </Link>
                </li>
            </ul>
            <ul className="flex-grow">
                <li>
                    <div>
                        <div onClick={() => setDropdownToggle(!dropDownToggle)} className='side-nav-link'>
                            {dropDownToggle ? <IoIosArrowDropdownCircle /> : <IoIosArrowDroprightCircle />}
                            {!isCollapsed && <span>All</span>}
                        </div>
                        <ul className={`transition-all duration-500 ease-in-out ${isCollapsed ? '' : 'pl-2'} ${dropDownToggle ? 'opacity-100' : 'opacity-0'} ${dropDownToggle ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
                            <li>
                                <Link className={`side-nav-link ${isActive('/item1')}`} href="/item1">
                                    <FaFile />
                                    {!isCollapsed && <span>Plan 1</span>}
                                </Link>
                            </li>
                            <li>
                                <Link className={`side-nav-link ${isActive('/Plan2')}`} href="/Plan2">
                                    <FaFile />
                                    {!isCollapsed && <span>Plan 2</span>}
                                </Link>
                            </li>
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

    </>
  )
}
