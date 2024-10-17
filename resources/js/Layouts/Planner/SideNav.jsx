import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

import { FaHome, FaFile, FaPlus, FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoIosArrowDropdownCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { GiToggles } from "react-icons/gi";
import { SquareKanban } from 'lucide-react';

export default function SideNav({ isCollapsed, toggleSidebar, isActive, timeLeft  }) {

    const minutes = Math.floor(timeLeft / 60);
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
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
                        <span className="flex-item-center">
                            <FaHome />
                            {!isCollapsed && <span>Hub</span>}
                        </span>
                    </Link>
                </li>
                <li>
                    <Link className={`side-nav-link ${isActive('/plans/create')}`} href="/plans/create">
                        <span className="flex-item-center">
                            <FaPlus />
                            {!isCollapsed && <span>New Plan</span>}
                        </span>
                    </Link>
                </li>
                <li>
                    <Link className={`side-nav-link ${isActive('/posts')}`} href="/posts">
                        <span className="flex-item-center">
                            <FaUser />
                            {!isCollapsed && <span>Assign to me</span>}
                        </span>
                    </Link>
                </li>
            </ul>
            <ul className="flex-grow">
                <li>
                    <div>
                        <div onClick={() => setDropdownToggle(!dropDownToggle)} className='side-nav-link'>
                            {!isCollapsed &&
                                <span className='flex-item-center'>
                                    <SquareKanban className='w-4 h-4' />
                                    <span>All</span>
                                </span>
                            }
                            {dropDownToggle ? <IoIosArrowDropdownCircle /> : <IoIosArrowDroprightCircle />}
                        </div>
                        <ul className={`transition-all duration-500 ease-in-out ${isCollapsed ? '' : 'pl-2'} ${dropDownToggle ? 'opacity-100' : 'opacity-0'} ${dropDownToggle ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
                            <li>
                                <Link className={`side-nav-link ${isActive('/item1')}`} href="/item1">
                                    <span className='flex-item-center'>
                                        <FaFile />
                                        {!isCollapsed && <span>Plan 1</span>}
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link className={`side-nav-link ${isActive('/Plan2')}`} href="/Plan2">
                                    <span className='flex-item-center'>
                                        <FaFile />
                                        {!isCollapsed && <span>Plan 2</span>}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <Link className={`side-nav-link ${isActive('/drawer')}`} href="/drawer">
                        <span className='flex-item-center'>
                            <FaFile />
                            {!isCollapsed && <span>Reports</span>}
                        </span>
                    </Link>
                </li>
                <li>
                    <Link className={`side-nav-link ${isActive('/settings')}`} href="#">
                        <span className="flex-item-center">
                            <FaGear />
                            {!isCollapsed && <span>Settings</span>}
                        </span>
                    </Link>
                </li>
            </ul>

            {/* Footer */}
            <div className={`text-xs absolute bottom-0 left-0 w-full ${!isCollapsed ? 'p-6' : 'p-2'}`}>
                <p>
                    {!isCollapsed && <span>Session expires in:</span>}<br/><b>{minutes}:{seconds}</b>
                </p>
                {!isCollapsed && <span className="text-sm text-gray-400">&copy; 2024 MyApp</span>}
            </div>
        
        </aside>

    </>
  )
}
