import React, { useState } from 'react';
import Profile from '@/Layouts/Profile';
import { DarkThemeToggle, MegaMenu, Dropdown, Avatar } from "flowbite-react";
import { HiViewGrid } from "react-icons/hi";
import { usePage } from '@inertiajs/react';

export default function Header({onLogOut}) {

    const { auth, assetUrl } = usePage().props;
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    
  return (
    <>
            <header>
                { auth.status && <Profile isOpen={isProfileOpen} handleClose={() => setIsProfileOpen(false)}  /> }

                <div className="navbar text-black">
                    <div className="flex-none custom-toggle">
        
                        <MegaMenu.Dropdown
                            toggle={
                                <span className="btn btn-square text-gray-800 text-3xl btn-ghost hover:bg-slate-300 dark:text-gray-200 dark:hover:bg-neutral">
                                    <HiViewGrid />
                                </span>
                            }
                        >
                            <ul className="grid grid-cols-3">
                                <div className="space-y-4 p-4">
                                    <li>
                                        <a href="/users" className="hover:text-primary-600 dark:hover:text-primary-500">
                                            HRMIS
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/tasks" className="hover:text-primary-600 dark:hover:text-primary-500">
                                            Planner
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                            Resources
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/register" className="hover:text-primary-600 dark:hover:text-primary-500">
                                            Registration
                                        </a>
                                    </li>
                                </div>
                                <div className="space-y-4 p-4">
                                    <li>
                                        <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                            Contact Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                            Support Center
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                            Terms
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                            Blog
                                        </a>
                                    </li>
                                </div>
                                <div className="space-y-4 p-4">
                                    <li>
                                        <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                            Newsletter
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                            Playground
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                            License
                                        </a>
                                    </li>
                                </div>
                            </ul>
                        </MegaMenu.Dropdown>
                        
                    </div>
                    <div className="flex-1">
                        <a className="btn btn-ghost dark:text-gray-200 text-xl">MyApp</a>
                    </div>
                    <div className="flex-none space-x-2">
                        <DarkThemeToggle />
                        {auth.status &&
                            <Dropdown
                                label={<Avatar alt="User Photo" size="xs" img={`${assetUrl}/${auth.user.user_photo || 'uploads/user_photo/avatar.png' }`} rounded />}
                                arrowIcon={false}
                                inline
                            >
                            <Dropdown.Header>
                                <span className="block text-sm">{auth.user.full_name}</span>
                                <span className="link block truncate text-sm font-medium">{auth.user.email || ''}</span>
                            </Dropdown.Header>
                            <Dropdown.Item onClick={()=>setIsProfileOpen(true)}>Profile</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={onLogOut}>Sign out</Dropdown.Item>
                            </Dropdown>
                        }

                    </div>
                </div>


            </header>

    </>
  )
}
