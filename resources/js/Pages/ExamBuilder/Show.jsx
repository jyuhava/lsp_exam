import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ exam }) {
    const getStatusBadge = (status) => {
        const statusConfig = {
            'draft': { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Draft' },
            'aktif': { bg: 'bg-green-100', text: 'text-green-800', label: 'Aktif' },
            'non_aktif': { bg: 'bg-red-100', text: 'text-red-800', label: 'Non Aktif' }
        };
        
        const config = statusConfig[status] || statusConfig['draft'];
        return (
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Detail Exam
                    </h2>
                    <div className="flex space-x-2">
                        <Link
                            href={route('exam.units.index', exam.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <ion-icon name="construct" class="text-lg"></ion-icon>
                            <span>Build</span>
                        </Link>
                        <Link
                            href={route('exam.edit', exam.id)}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <ion-icon name="create" class="text-lg"></ion-icon>
                            <span>Edit</span>
                        </Link>
                        <Link
                            href={route('exam.index')}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <ion-icon name="arrow-back" class="text-lg"></ion-icon>
                            <span>Kembali</span>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Detail Exam - ${exam.judul}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center mb-8">
                                <div className="flex-shrink-0 h-16 w-16">
                                    <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center">
                                        <ion-icon name="document-text" class="text-white text-2xl"></ion-icon>
                                    </div>
                                </div>
                                <div className="ml-6">
                                    <h3 className="text-2xl font-bold text-gray-900">{exam.judul}</h3>
                                    <div className="mt-2 flex items-center space-x-4">
                                        {getStatusBadge(exam.status)}
                                        <span className="text-sm text-gray-500">
                                            Dibuat oleh: {exam.creator.name}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Content Sections */}
                            <div className="space-y-8">
                                {/* Basic Information */}
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <ion-icon name="information-circle" class="text-xl mr-2 text-blue-600"></ion-icon>
                                        Informasi Dasar
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Judul Exam</label>
                                            <p className="text-sm text-gray-900 mt-1">{exam.judul}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Status</label>
                                            <div className="mt-1">
                                                {getStatusBadge(exam.status)}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Dibuat Oleh</label>
                                            <p className="text-sm text-gray-900 mt-1">{exam.creator.name}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Tanggal Dibuat</label>
                                            <p className="text-sm text-gray-900 mt-1">
                                                {new Date(exam.created_at).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                {exam.deskripsi && (
                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                            <ion-icon name="document" class="text-xl mr-2 text-blue-600"></ion-icon>
                                            Deskripsi
                                        </h4>
                                        <div className="prose prose-sm max-w-none">
                                            <p className="text-gray-700 whitespace-pre-wrap">{exam.deskripsi}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Rules and Regulations */}
                                {exam.peraturan && (
                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                            <ion-icon name="list" class="text-xl mr-2 text-blue-600"></ion-icon>
                                            Peraturan Exam
                                        </h4>
                                        <div className="prose prose-sm max-w-none">
                                            <div className="text-gray-700 whitespace-pre-wrap">{exam.peraturan}</div>
                                        </div>
                                    </div>
                                )}

                                {/* Metadata */}
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <ion-icon name="time" class="text-xl mr-2 text-blue-600"></ion-icon>
                                        Informasi Tambahan
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Terakhir Diupdate</label>
                                            <p className="text-sm text-gray-900 mt-1">
                                                {new Date(exam.updated_at).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">ID Exam</label>
                                            <p className="text-sm text-gray-900 mt-1">#{exam.id}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-center space-x-4 pt-6">
                                    <Link
                                        href={route('exam.edit', exam.id)}
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                                    >
                                        <ion-icon name="create" class="text-lg"></ion-icon>
                                        <span>Edit Exam</span>
                                    </Link>
                                    <Link
                                        href={route('exam.index')}
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                                    >
                                        <ion-icon name="list" class="text-lg"></ion-icon>
                                        <span>Lihat Semua Exam</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
