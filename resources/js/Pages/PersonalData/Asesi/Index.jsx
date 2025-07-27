import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ asesis }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id, name) => {
        if (confirm(`Apakah Anda yakin ingin menghapus data asesi ${name}?`)) {
            router.delete(route('asesi.destroy', id));
        }
    };

    const filteredAsesis = asesis && asesis.data ? asesis.data.filter(asesi =>
        asesi.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asesi.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (asesi.nim && asesi.nim.toLowerCase().includes(searchTerm.toLowerCase()))
    ) : [];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Data Asesi
                    </h2>
                    <Link
                        href={route('asesi.create')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                    >
                        <ion-icon name="add" class="text-lg"></ion-icon>
                        <span>Tambah Asesi</span>
                    </Link>
                </div>
            }
        >
            <Head title="Data Asesi" />

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
                                        placeholder="Cari asesi..."
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
                                                Asesi
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                NIM
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Program Studi
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Instansi
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
                                        {filteredAsesis.length > 0 ? (
                                            filteredAsesis.map((asesi) => (
                                                <tr key={asesi.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                                                                    <span className="text-sm font-medium text-white">
                                                                        {asesi.nama_lengkap.charAt(0).toUpperCase()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {asesi.nama_lengkap}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {asesi.user.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {asesi.nim || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {asesi.program_studi || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {asesi.instansi_asal || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                            asesi.status === 'aktif' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {asesi.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                        <Link
                                                            href={route('asesi.show', asesi.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                                                        >
                                                            <ion-icon name="eye" class="text-lg"></ion-icon>
                                                        </Link>
                                                        <Link
                                                            href={route('asesi.edit', asesi.id)}
                                                            className="text-yellow-600 hover:text-yellow-900 inline-flex items-center"
                                                        >
                                                            <ion-icon name="create" class="text-lg"></ion-icon>
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(asesi.id, asesi.nama_lengkap)}
                                                            className="text-red-600 hover:text-red-900 inline-flex items-center"
                                                        >
                                                            <ion-icon name="trash" class="text-lg"></ion-icon>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                                    {searchTerm ? 'Tidak ada data yang sesuai dengan pencarian' : 'Belum ada data asesi'}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {asesis && asesis.links && (
                                <div className="mt-6 flex justify-between items-center">
                                    <div className="text-sm text-gray-700">
                                        Menampilkan {asesis.from || 0} sampai {asesis.to || 0} dari {asesis.total || 0} data
                                    </div>
                                    <div className="flex space-x-1">
                                        {asesis.links.map((link, index) => (
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
