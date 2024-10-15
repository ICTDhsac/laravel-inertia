import React, {  useEffect, useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

import { IoIosArrowDropdownCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { GiToggles } from "react-icons/gi";
import { Building, DatabaseZap, HomeIcon, Notebook, Settings, ShieldCheck, UserCircle, UserRoundCog, Users } from 'lucide-react';

export default function SideNav({ isCollapsed, toggleSidebar, isActive, timeLeft  }) {

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const [dropDownToggle, setDropdownToggle] = useState({
        system_administration: false,
        records_management: false,
        master_data: false,
    });

    const toggleDropdown = (e) => {
        const toggleName = e.currentTarget.dataset.toggle;
        setDropdownToggle(prevState => ({
            ...prevState,
            [toggleName]: !prevState[toggleName]
        }));
    }

  return (
    <>
            {/* Side Navigation Bar */}
        <aside className={`fixed flex flex-col px-0 pt-16 h-screen border-r border-neutral-300 dark:border-neutral-600 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 space-y-6 transition-all duration-300 ${isCollapsed ? 'min-w-auto' : 'max-w-64'} `}>
            
            {/* Logo */}
            <button onClick={toggleSidebar} className="block p-3 text-right border-b border-gray-300 dark:border-neutral dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300">
                <GiToggles className='inline-block' title="Collapse the left navigation pane" />
            </button>

            {/* Navigation Links */}
            <ul className='border-b dark:border-neutral'>
                <li>
                    <Link className={`side-nav-link ${isActive('/')}`} href="/">
                        <span className="flex-item-center">
                            <HomeIcon className='w-4 h-4' />
                            {isCollapsed ? '' : <span>Dashboard</span>}
                        </span>
                    </Link>
                </li>
            </ul>
            <ul className="flex-grow">
                <li>
                    <div>
                        <div
                            onClick={toggleDropdown}
                            data-toggle='system_administration'
                            className='side-nav-link'
                        >    
                            {!isCollapsed &&
                                <span className="flex-item-center">
                                    <ShieldCheck className='w-4 h-4' />
                                    <span>System Administration</span>
                                </span>
                            }
                            {dropDownToggle?.system_administration ? <IoIosArrowDropdownCircle /> : <IoIosArrowDroprightCircle />}
                        </div>
                        <ul className={`transition-all duration-500 ease-in-out overflow-hidden ${isCollapsed ? '' : 'pl-2'} ${dropDownToggle?.system_administration ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}`}>
                            <li>
                                <Link className={`side-nav-link ${isActive('/users')}`} href="/users">
                                    <span className="flex-item-center">
                                        <Users className='w-4 h-4' />
                                        {!isCollapsed && <span>Users</span>}
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link className={`side-nav-link ${isActive('/Plan2')}`} href="/Plan2">
                                    <span className="flex-item-center">
                                        <UserRoundCog className='w-4 h-4'/>
                                        {!isCollapsed && <span>Role Management</span>}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div>
                        <div
                            onClick={toggleDropdown}
                            data-toggle='master_data'
                            className='side-nav-link'
                        >    
                            {!isCollapsed &&
                                <span className='flex-item-center'>
                                    <DatabaseZap className='w-4 h-4' />
                                    <span>Master Data</span>
                                </span>
                            }
                            {dropDownToggle?.master_data ? <IoIosArrowDropdownCircle /> : <IoIosArrowDroprightCircle />}
                        </div>
                        <ul className={`transition-all duration-500 ease-in-out overflow-hidden ${isCollapsed ? '' : 'pl-2'} ${dropDownToggle?.master_data ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}`}>
                            <li>
                                <Link className={`side-nav-link ${isActive('/departments')}`} href="/departments">
                                    <span className="flex-item-center">
                                        <Building className='w-4 h-4' />
                                        {!isCollapsed && <span>Divisions</span>}
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link className={`side-nav-link ${isActive('/positions')}`} href="/positions">
                                    <span className="flex-item-center">
                                        <UserCircle className='w-4 h-4' />
                                        {!isCollapsed && <span>Positions</span>}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div>
                        <div
                            onClick={toggleDropdown}
                            data-toggle='settings'
                            className='side-nav-link'
                        >    
                            {!isCollapsed &&
                                <span className='flex-item-center'>
                                    <Settings className='w-4 h-4' />
                                    <span>Settings</span>
                                </span>
                            }
                            {dropDownToggle?.settings ? <IoIosArrowDropdownCircle /> : <IoIosArrowDroprightCircle />}
                        </div>
                        <ul className={`transition-all duration-500 ease-in-out overflow-hidden ${isCollapsed ? '' : 'pl-2'} ${dropDownToggle?.settings ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}`}>
                            <li>
                                <Link className={`side-nav-link ${isActive('/item1')}`} href="/item1">
                                    <span className="flex-item-center">
                                        <Notebook className='w-4 h-4' />
                                        {!isCollapsed && <span>Audit Trails</span>}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>

            {/* Footer */}
            <div className="mt-auto absolute bottom-0 left-0 w-full p-6">
                <p>
                    Session expires in:<br/> {minutes}m {seconds}s
                </p>
                {!isCollapsed && <span className="text-sm text-gray-400">&copy; 2024 MyApp</span>}
            </div>
        
        </aside>

    </>
  )
}
