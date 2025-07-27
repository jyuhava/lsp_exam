import { useState, useEffect } from 'react';
import Sidebar from '@/Components/Sidebar';
import TopNavbar from '@/Components/TopNavbar';

export default function AuthenticatedLayout({ header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false); // Default closed on mobile
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) {
                setSidebarOpen(true); // Always open on desktop
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const toggleSidebar = () => {
        // On mobile: toggle open/close
        // On desktop: toggle collapsed/expanded
        if (isMobile) {
            setSidebarOpen(!sidebarOpen);
        } else {
            setSidebarCollapsed(!sidebarCollapsed);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar 
                isOpen={sidebarOpen} 
                isCollapsed={sidebarCollapsed}
                toggleSidebar={toggleSidebar} 
            />
            
            {/* Main content - Dynamic margin based on sidebar state */}
            <div className={`transition-all duration-300 ${
                sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'
            }`}>
                {/* Top Navigation */}
                <TopNavbar toggleSidebar={toggleSidebar} />
                
                {/* Page Header */}
                {header && (
                    <header className="bg-white shadow-sm border-b border-gray-200">
                        <div className="px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                
                {/* Main Content */}
                <main className="p-3 sm:p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
