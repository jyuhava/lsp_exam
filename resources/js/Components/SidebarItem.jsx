import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function SidebarItem({ name, href, icon, activeIcon, active = false, isCollapsed = false, submenu = null, badge = null, color = 'blue' }) {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(active);
    
    const colorClasses = {
        blue: {
            active: 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 border-l-4 border-blue-400',
            inactive: 'text-slate-300 hover:bg-slate-700/50 hover:text-white',
            icon: 'text-blue-400',
            iconInactive: 'text-slate-400 group-hover:text-slate-200'
        },
        green: {
            active: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-l-4 border-green-400',
            inactive: 'text-slate-300 hover:bg-slate-700/50 hover:text-white',
            icon: 'text-green-400',
            iconInactive: 'text-slate-400 group-hover:text-slate-200'
        },
        purple: {
            active: 'bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-300 border-l-4 border-purple-400',
            inactive: 'text-slate-300 hover:bg-slate-700/50 hover:text-white',
            icon: 'text-purple-400',
            iconInactive: 'text-slate-400 group-hover:text-slate-200'
        },
        orange: {
            active: 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 border-l-4 border-orange-400',
            inactive: 'text-slate-300 hover:bg-slate-700/50 hover:text-white',
            icon: 'text-orange-400',
            iconInactive: 'text-slate-400 group-hover:text-slate-200'
        },
        red: {
            active: 'bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-300 border-l-4 border-red-400',
            inactive: 'text-slate-300 hover:bg-slate-700/50 hover:text-white',
            icon: 'text-red-400',
            iconInactive: 'text-slate-400 group-hover:text-slate-200'
        },
        gray: {
            active: 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-300 border-l-4 border-gray-400',
            inactive: 'text-slate-300 hover:bg-slate-700/50 hover:text-white',
            icon: 'text-gray-400',
            iconInactive: 'text-slate-400 group-hover:text-slate-200'
        }
    };

    const currentColor = colorClasses[color] || colorClasses.blue;
    const baseClasses = "sidebar-item flex items-center text-sm font-medium rounded-xl transition-all duration-300 relative group";
    const activeClasses = currentColor.active;
    const inactiveClasses = currentColor.inactive;

    // If has submenu and not collapsed
    if (submenu && !isCollapsed) {
        return (
            <div>
                <button
                    onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                    className={`w-full ${baseClasses} ${active ? activeClasses : inactiveClasses} px-4 py-3 mb-1`}
                >
                    <div className="flex items-center justify-center w-5 h-5 mr-3">
                        <ion-icon 
                            key={`${name}-${isCollapsed ? 'collapsed' : 'expanded'}`}
                            name={active ? activeIcon : icon}
                            class={`w-full h-full ${active ? currentColor.icon : currentColor.iconInactive} transition-all duration-300`}
                        ></ion-icon>
                    </div>
                    <span className="flex-1 text-left font-medium transition-all duration-300">{name}</span>
                    
                    {badge && (
                        <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full mr-2 shadow-lg">
                            {badge}
                        </span>
                    )}
                    
                    <div className="flex items-center justify-center w-4 h-4">
                        <ion-icon 
                            name={isSubmenuOpen ? "chevron-up" : "chevron-down"}
                            class={`w-full h-full transition-all duration-300 ${isSubmenuOpen ? 'rotate-180' : ''} ${active ? currentColor.icon : currentColor.iconInactive}`}
                        ></ion-icon>
                    </div>
                </button>
                
                {/* Submenu */}
                <div className={`overflow-hidden transition-all duration-300 ${isSubmenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="ml-6 mt-2 space-y-1 border-l-2 border-slate-700/50 pl-4">
                        {submenu.map((subItem, index) => (
                            <Link
                                key={index}
                                href={subItem.href}
                                className={`flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                                    subItem.active 
                                        ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 font-medium shadow-lg' 
                                        : 'text-slate-400 hover:bg-slate-700/30 hover:text-slate-200'
                                }`}
                            >
                                {subItem.icon && (
                                    <ion-icon 
                                        name={subItem.icon} 
                                        class={`text-sm ${subItem.active ? 'text-indigo-400' : 'text-slate-500'}`}
                                    ></ion-icon>
                                )}
                                <span>{subItem.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Regular menu item (no submenu or collapsed)
    return (
        <Link
            href={href}
            className={`${baseClasses} ${active ? activeClasses : inactiveClasses} ${
                isCollapsed ? 'px-3 py-3 justify-center mx-1' : 'px-4 py-3 mb-1'
            }`}
            title={isCollapsed ? name : undefined}
        >
            <div className={`flex items-center justify-center ${isCollapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}`}>
                <ion-icon 
                    key={`${name}-${isCollapsed ? 'collapsed' : 'expanded'}`}
                    name={active ? activeIcon : icon}
                    class={`w-full h-full ${active ? currentColor.icon : currentColor.iconInactive} transition-all duration-300 group-hover:scale-110`}
                ></ion-icon>
            </div>
            
            {!isCollapsed && (
                <div className="flex items-center justify-between flex-1">
                    <span className="font-medium transition-all duration-300">{name}</span>
                    {badge && (
                        <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full shadow-lg animate-pulse">
                            {badge}
                        </span>
                    )}
                </div>
            )}
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
                <div className="absolute left-full ml-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 shadow-xl border border-slate-700">
                    <div className="flex items-center space-x-2">
                        <span>{name}</span>
                        {badge && (
                            <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full">
                                {badge}
                            </span>
                        )}
                    </div>
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45 border-l border-b border-slate-700"></div>
                </div>
            )}
        </Link>
    );
}
