import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Dropdown from './Dropdown';

export default function TopNavbar({ toggleSidebar }) {
    const user = usePage().props.auth.user;

    return (
        <nav className="bg-white navbar-shadow border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
                {/* Left side - Menu toggle and breadcrumb */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus-ring lg:hidden transition-colors duration-200"
                    >
                        <ion-icon name="menu-outline" class="w-6 h-6"></ion-icon>
                    </button>
                    
                    {/* Desktop menu toggle */}
                    <button
                        onClick={toggleSidebar}
                        className="hidden lg:block p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus-ring transition-colors duration-200"
                    >
                        <ion-icon name="menu-outline" class="w-5 h-5"></ion-icon>
                    </button>
                    
                    <div className="hidden sm:block">
                        <nav className="flex space-x-2 text-sm text-gray-500">
                            <span>Admin</span>
                            <span>/</span>
                            <span className="text-gray-900 font-medium">Dashboard</span>
                        </nav>
                    </div>
                </div>

                {/* Right side - Search, notifications, and user menu */}
                <div className="flex items-center space-x-4">
                    {/* Search */}
                    <div className="hidden md:block relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <ion-icon name="search-outline" class="w-4 h-4 text-gray-400"></ion-icon>
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Notifications */}
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md focus-ring transition-colors duration-200 relative">
                        <ion-icon name="notifications-outline" class="w-5 h-5"></ion-icon>
                        {/* Notification badge */}
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        </span>
                    </button>

                    {/* User dropdown */}
                    <div className="relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center space-x-3 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus-ring transition-colors duration-200">
                                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                                        <ion-icon name="person" class="text-white text-sm"></ion-icon>
                                    </div>
                                    <div className="hidden md:block text-left">
                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                        <div className="text-xs text-gray-500">Administrator</div>
                                    </div>
                                    <ion-icon name="chevron-down-outline" class="w-4 h-4 text-gray-400"></ion-icon>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                                <Dropdown.Link href={route('profile.edit')}>
                                    <ion-icon name="person-outline" class="w-4 h-4 mr-2"></ion-icon>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link href="#">
                                    <ion-icon name="settings-outline" class="w-4 h-4 mr-2"></ion-icon>
                                    Settings
                                </Dropdown.Link>
                                <div className="border-t border-gray-100"></div>
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    <ion-icon name="log-out-outline" class="w-4 h-4 mr-2"></ion-icon>
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
    );
}
