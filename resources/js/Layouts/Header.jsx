import React from 'react';
import { DarkThemeToggle, MegaMenu } from "flowbite-react";
import { HiCog, HiLogout, HiViewGrid, HiUserCircle } from "react-icons/hi";

export default function Header() {

  return (
    <>
    
                <header>
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
                                                Home Page
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
                                            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                                Pro Version
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
                            <div className="dropdown dropdown-end dropdown-hover dark:text-gray-200">
                                <div className={`p-1 rounded-full flex items-center hover:bg-slate-50 dark:hover:bg-slate-600`}>
                                    <div className="avatar">
                                        <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="John Doe" />
                                        </div>
                                    </div>
                                </div>
                                {/* <div tabIndex={0} role="button" className='btn m-1 btn-square btn-ghost'><BsThreeDots /></div> */}
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 text-gray-200 rounded-box z-[1] w-52 p-2 shadow">
                                    <li><a><HiUserCircle /> View Profile</a></li>
                                    <li><a><HiCog /> Change Password</a></li>
                                    <li><a><HiLogout/> Log Out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>


                </header>

    </>
  )
}
