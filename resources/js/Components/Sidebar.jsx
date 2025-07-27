import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import SidebarItem from './SidebarItem';
import ApplicationLogo from './ApplicationLogo';

export default function Sidebar({ isOpen, isCollapsed, toggleSidebar }) {
    const { url, props } = usePage();
    const userRole = props.auth.user.role || 'user';

    // Filter menu items based on user role
    const getMenuItems = () => {
        const baseMenuItems = [
            {
                name: 'Dashboard',
                href: route('dashboard'),
                icon: 'grid-outline',
                activeIcon: 'grid',
                active: route().current('dashboard'),
                badge: null,
                color: 'blue',
                roles: ['admin', 'asesor', 'asesi', 'user']
            }
        ];

        // Admin/Asesor menus
        if (userRole === 'user' || userRole === 'asesor') {
            baseMenuItems.push(
                {
                    name: 'Personal Data',
                    href: '#',
                    icon: 'people-outline',
                    activeIcon: 'people',
                    active: route().current('asesor.*') || route().current('asesi.*'),
                    color: 'green',
                    roles: ['user', 'asesor'],
                    submenu: [
                        {
                            name: 'Asesor',
                            href: route('asesor.index'),
                            active: route().current('asesor.*'),
                            icon: 'person-outline'
                        },
                        {
                            name: 'Asesi',
                            href: route('asesi.index'),
                            active: route().current('asesi.*'),
                            icon: 'school-outline'
                        }
                    ]
                },
                {
                    name: 'Exam Builder',
                    href: route('exam.index'),
                    icon: 'document-text-outline',
                    activeIcon: 'document-text',
                    active: route().current('exam.*'),
                    badge: 'New',
                    color: 'purple',
                    roles: ['user', 'asesor']
                },
                {
                    name: 'Assign Exam',
                    href: route('exam-assignment.index'),
                    icon: 'clipboard-outline',
                    activeIcon: 'clipboard',
                    active: route().current('exam-assignment.*'),
                    color: 'indigo',
                    roles: ['user', 'asesor']
                },
                {
                    name: 'PIN Management',
                    href: route('pin-management.index'),
                    icon: 'key-outline',
                    activeIcon: 'key',
                    active: route().current('pin-management.*'),
                    color: 'yellow',
                    roles: ['user', 'asesor']
                }
            );
        }

        // Asesi menus
        if (userRole === 'asesi') {
            baseMenuItems.push({
                name: 'Asesi Menu',
                href: '#',
                icon: 'school-outline',
                activeIcon: 'school',
                active: route().current('asesi.available-exams') || route().current('asesi.registrations') || route().current('asesi.assignments'),
                color: 'green',
                roles: ['asesi'],
                submenu: [
                    {
                        name: 'Daftar Asesmen',
                        href: route('asesi.available-exams'),
                        active: route().current('asesi.available-exams'),
                        icon: 'add-circle-outline'
                    },
                    {
                        name: 'Pendaftaran Saya',
                        href: route('asesi.registrations'),
                        active: route().current('asesi.registrations'),
                        icon: 'document-text-outline'
                    },
                    {
                        name: 'Assignment Saya',
                        href: route('asesi.assignments'),
                        active: route().current('asesi.assignments'),
                        icon: 'clipboard-outline'
                    }
                ]
            });
        }

        // Admin only menus
        if (userRole === 'user') {
            baseMenuItems.push(
                {
                    name: 'Admin',
                    href: '#',
                    icon: 'shield-outline',
                    activeIcon: 'shield',
                    active: route().current('admin.assessment-registrations.*'),
                    color: 'red',
                    roles: ['user'],
                    submenu: [
                        {
                            name: 'Kelola Pendaftaran',
                            href: route('admin.assessment-registrations.index'),
                            active: route().current('admin.assessment-registrations.*'),
                            icon: 'people-outline'
                        }
                    ]
                }
            );
        }

        return baseMenuItems.filter(item => 
            !item.roles || item.roles.includes(userRole)
        );
    };

    const menuItems = getMenuItems();

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden backdrop-blur-sm"
                    onClick={toggleSidebar}
                ></div>
            )}
            
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-30 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl sidebar-transition ${
                isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            } ${isCollapsed ? 'lg:w-20' : 'lg:w-72'} w-72`}>
                
                {/* Header */}
                <div className="relative">
                    <div className="flex items-center justify-center h-20 px-6 border-b border-slate-700/50 bg-gradient-to-r from-indigo-600 to-purple-600">
                        {!isCollapsed ? (
                            <Link href="/" className="flex items-center space-x-3 group">
                                <div className="relative">
                                    <ApplicationLogo className="block h-10 w-auto fill-current text-white drop-shadow-lg" />
                                    <div className="absolute -inset-1 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-white tracking-wide">AssessmentPro</span>
                                    <span className="text-xs text-indigo-200 font-medium">Management System</span>
                                </div>
                            </Link>
                        ) : (
                            <Link href="/" className="flex items-center justify-center group">
                                <div className="relative">
                                    <ApplicationLogo className="block h-10 w-auto fill-current text-white drop-shadow-lg" />
                                    <div className="absolute -inset-1 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </Link>
                        )}
                    </div>
                    {/* Decorative gradient line */}
                    <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                </div>
                
                {/* User Profile Section */}
                {!isCollapsed && (
                    <div className="px-6 py-6 border-b border-slate-700/50">
                        <div className="flex items-center space-x-4 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200 group cursor-pointer">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <ion-icon name="person" class="text-white text-xl"></ion-icon>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white truncate">
                                    {props.auth.user.name}
                                </p>
                                <p className="text-xs text-slate-400 truncate capitalize">
                                    {userRole}
                                </p>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <ion-icon name="chevron-forward" class="text-slate-400 text-sm"></ion-icon>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Navigation */}
                <nav className={`flex-1 sidebar-scroll overflow-y-auto ${isCollapsed ? 'px-3 py-6' : 'px-6 py-6'}`}>
                    {!isCollapsed && (
                        <div className="mb-6">
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                Main Menu
                            </h3>
                        </div>
                    )}
                    <div className="space-y-2">
                        {menuItems.map((item, index) => (
                            <SidebarItem
                                key={`${item.name}-${isCollapsed ? 'collapsed' : 'expanded'}`}
                                name={item.name}
                                href={item.href}
                                icon={item.icon}
                                activeIcon={item.activeIcon}
                                active={item.active}
                                isCollapsed={isCollapsed}
                                submenu={item.submenu}
                                badge={item.badge}
                                color={item.color}
                            />
                        ))}
                    </div>
                    
                    {/* Quick Actions */}
                    {!isCollapsed && (userRole === 'user' || userRole === 'asesor') && (
                        <div className="mt-8 pt-6 border-t border-slate-700/50">
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                Quick Actions
                            </h3>
                            <div className="space-y-2">
                                <Link
                                    href={route('exam.create')}
                                    className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-200 group shadow-lg hover:shadow-xl"
                                >
                                    <ion-icon name="add-circle" class="text-lg"></ion-icon>
                                    <span className="text-sm font-medium">New Exam</span>
                                    <ion-icon name="arrow-forward" class="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-auto"></ion-icon>
                                </Link>
                            </div>
                        </div>
                    )}
                </nav>
                
                {/* Bottom section - Collapsed user */}
                {isCollapsed && (
                    <div className="p-3 border-t border-slate-700/50">
                        <div className="flex items-center justify-center group cursor-pointer">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                                    <ion-icon name="person" class="text-white text-lg"></ion-icon>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
                                
                                {/* Tooltip */}
                                <div className="absolute left-full ml-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl">
                                    {props.auth.user.name}
                                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Decorative elements */}
                <div className="absolute top-32 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-50"></div>
                <div className="absolute bottom-32 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-50"></div>
            </div>
        </>
    );
}
