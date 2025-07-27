import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    const stats = [
        {
            name: 'Total Users',
            value: '2,651',
            change: '+12%',
            changeType: 'increase',
            icon: 'people'
        },
        {
            name: 'Total Orders',
            value: '1,429',
            change: '+8%',
            changeType: 'increase',
            icon: 'receipt'
        },
        {
            name: 'Revenue',
            value: '$89,400',
            change: '+23%',
            changeType: 'increase',
            icon: 'card'
        },
        {
            name: 'Products',
            value: '156',
            change: '+3%',
            changeType: 'increase',
            icon: 'cube'
        }
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold leading-tight text-gray-900">
                        Dashboard
                    </h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <ion-icon name="calendar-outline" class="w-4 h-4"></ion-icon>
                        <span>{new Date().toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</span>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* Welcome Message */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">Welcome back!</h3>
                            <p className="text-indigo-100 mt-1">Here's what's happening with your business today.</p>
                        </div>
                        <div className="hidden sm:block">
                            <ion-icon name="analytics" class="w-12 h-12 text-indigo-200"></ion-icon>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                </div>
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <ion-icon name={stat.icon} class="w-6 h-6 text-indigo-600"></ion-icon>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center">
                                <span className={`text-sm font-medium ${
                                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {stat.change}
                                </span>
                                <span className="text-sm text-gray-500 ml-2">from last month</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {[
                                    { action: 'New user registered', time: '2 minutes ago', icon: 'person-add' },
                                    { action: 'Order #1234 completed', time: '15 minutes ago', icon: 'checkmark-circle' },
                                    { action: 'Product updated', time: '1 hour ago', icon: 'create' },
                                    { action: 'Payment received', time: '2 hours ago', icon: 'card' }
                                ].map((activity, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                            <ion-icon name={activity.icon} class="w-4 h-4 text-gray-600"></ion-icon>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                            <p className="text-xs text-gray-500">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { name: 'Add User', icon: 'person-add', color: 'bg-blue-500' },
                                    { name: 'New Product', icon: 'add-circle', color: 'bg-green-500' },
                                    { name: 'View Orders', icon: 'receipt', color: 'bg-yellow-500' },
                                    { name: 'Settings', icon: 'settings', color: 'bg-purple-500' }
                                ].map((action, index) => (
                                    <button
                                        key={index}
                                        className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                                    >
                                        <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-2`}>
                                            <ion-icon name={action.icon} class="w-5 h-5 text-white"></ion-icon>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">{action.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
