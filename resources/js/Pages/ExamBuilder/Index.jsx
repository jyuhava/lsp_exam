import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ exams }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id, judul) => {
        if (confirm(`Apakah Anda yakin ingin menghapus exam "${judul}"?`)) {
            router.delete(route('exam.destroy', id));
        }
    };

    const filteredExams = exams && exams.data ? exams.data.filter(exam =>
        exam.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (exam.deskripsi && exam.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())) ||
        exam.creator.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    const getStatusBadge = (status) => {
        const statusConfig = {
            'draft': { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Draft' },
            'aktif': { bg: 'bg-green-100', text: 'text-green-800', label: 'Aktif' },
            'non_aktif': { bg: 'bg-red-100', text: 'text-red-800', label: 'Non Aktif' }
        };
        
        const config = statusConfig[status] || statusConfig['draft'];
        return (
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Exam Builder
                    </h2>
                    <Link
                        href={route('exam.create')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                    >
                        <ion-icon name="add" class="text-lg"></ion-icon>
                        <span>Buat Exam Baru</span>
                    </Link>
                </div>
            }
        >
            <Head title="Exam Builder" />

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
                                        placeholder="Cari exam..."
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
                                                Exam
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Deskripsi
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Dibuat Oleh
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal Dibuat
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredExams.length > 0 ? (
                                            filteredExams.map((exam) => (
                                                <tr key={exam.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                                                                    <ion-icon name="document-text" class="text-white text-lg"></ion-icon>
                                                                </div>
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {exam.judul}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900 max-w-xs truncate">
                                                            {exam.deskripsi || '-'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {exam.creator.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {getStatusBadge(exam.status)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {new Date(exam.created_at).toLocaleDateString('id-ID')}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                        <Link
                                                            href={route('exam.show', exam.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                                                        >
                                                            <ion-icon name="eye" class="text-lg"></ion-icon>
                                                        </Link>
                                                        <Link
                                                            href={route('exam.edit', exam.id)}
                                                            className="text-yellow-600 hover:text-yellow-900 inline-flex items-center"
                                                        >
                                                            <ion-icon name="create" class="text-lg"></ion-icon>
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(exam.id, exam.judul)}
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
                                                    {searchTerm ? 'Tidak ada data yang sesuai dengan pencarian' : 'Belum ada exam yang dibuat'}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {exams && exams.links && (
                                <div className="mt-6 flex justify-between items-center">
                                    <div className="text-sm text-gray-700">
                                        Menampilkan {exams.from || 0} sampai {exams.to || 0} dari {exams.total || 0} data
                                    </div>
                                    <div className="flex space-x-1">
                                        {exams.links.map((link, index) => (
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
