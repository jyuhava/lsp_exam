import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ asesors }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id, name) => {
        if (confirm(`Apakah Anda yakin ingin menghapus data asesor ${name}?`)) {
            router.delete(route('asesor.destroy', id));
        }
    };

    const filteredAsesors = asesors && asesors.data ? asesors.data.filter(asesor =>
        asesor.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asesor.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (asesor.nip && asesor.nip.toLowerCase().includes(searchTerm.toLowerCase()))
    ) : [];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Data Asesor
                    </h2>
                    <Link
                        href={route('asesor.create')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                    >
                        <ion-icon name="add" class="text-lg"></ion-icon>
                        <span>Tambah Asesor</span>
                    </Link>
                </div>
            }
        >
            <Head title="Data Asesor" />

            <div className="space-y-6">
                <div className="w-full">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Search Bar */}
                            <div className="mb-6">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <ion-icon name="search" class="text-gray-400"></ion-icon>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Cari asesor..."
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Asesor
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                NIP
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Bidang Keahlian
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredAsesors.length > 0 ? (
                                            filteredAsesors.map((asesor) => (
                                                <tr key={asesor.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                                                                    <span className="text-sm font-medium text-white">
                                                                        {asesor.nama_lengkap.charAt(0).toUpperCase()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {asesor.nama_lengkap}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {asesor.user.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {asesor.nip || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {asesor.bidang_keahlian || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                            asesor.status === 'aktif' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {asesor.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                        <Link
                                                            href={route('asesor.show', asesor.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                                                        >
                                                            <ion-icon name="eye" class="text-lg"></ion-icon>
                                                        </Link>
                                                        <Link
                                                            href={route('asesor.edit', asesor.id)}
                                                            className="text-yellow-600 hover:text-yellow-900 inline-flex items-center"
                                                        >
                                                            <ion-icon name="create" class="text-lg"></ion-icon>
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(asesor.id, asesor.nama_lengkap)}
                                                            className="text-red-600 hover:text-red-900 inline-flex items-center"
                                                        >
                                                            <ion-icon name="trash" class="text-lg"></ion-icon>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                    {searchTerm ? 'Tidak ada data yang sesuai dengan pencarian' : 'Belum ada data asesor'}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {asesors && asesors.links && (
                                <div className="mt-6 flex justify-between items-center">
                                    <div className="text-sm text-gray-700">
                                        Menampilkan {asesors.from || 0} sampai {asesors.to || 0} dari {asesors.total || 0} data
                                    </div>
                                    <div className="flex space-x-1">
                                        {asesors.links.map((link, index) => (
                                            link.url ? (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className={`px-3 py-2 text-sm rounded-md ${
                                                        link.active
                                                            ? 'bg-indigo-600 text-white'
                                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ) : (
                                                <span
                                                    key={index}
                                                    className="px-3 py-2 text-sm rounded-md bg-gray-100 text-gray-400 cursor-not-allowed"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
