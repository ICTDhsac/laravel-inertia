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

                        </div>
                    </div>


                </header>

    </>
  )
}
