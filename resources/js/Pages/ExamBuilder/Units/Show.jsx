import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ exam, unit }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Detail Unit
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Exam: {exam.judul}
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href={route('exam.units.edit', [exam.id, unit.id])}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <ion-icon name="create" class="text-lg"></ion-icon>
                            <span>Edit</span>
                        </Link>
                        <Link
                            href={route('exam.units.index', exam.id)}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <ion-icon name="arrow-back" class="text-lg"></ion-icon>
                            <span>Kembali</span>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Detail Unit - ${unit.nama_unit}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Exam Info Card */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                                        <ion-icon name="document-text" class="text-white text-lg"></ion-icon>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">{exam.judul}</h3>
                                    <p className="text-sm text-gray-600">Detail unit dalam exam ini</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center mb-8">
                                <div className="flex-shrink-0 h-16 w-16">
                                    <div className="h-16 w-16 rounded-full bg-indigo-500 flex items-center justify-center">
                                        <span className="text-white text-xl font-bold">{unit.urutan}</span>
                                    </div>
                                </div>
                                <div className="ml-6">
                                    <div className="flex items-center space-x-3">
                                        <h3 className="text-2xl font-bold text-gray-900">{unit.nama_unit}</h3>
                                        {unit.kode_unit && (
                                            <span className="inline-flex px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full">
                                                {unit.kode_unit}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Unit #{unit.urutan} dalam exam
                                    </p>
                                </div>
                            </div>

                            {/* Content Sections */}
                            <div className="space-y-8">
                                {/* Basic Information */}
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <ion-icon name="information-circle" class="text-xl mr-2 text-indigo-600"></ion-icon>
                                        Informasi Unit
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Nama Unit</label>
                                            <p className="text-sm text-gray-900 mt-1">{unit.nama_unit}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Kode Unit</label>
                                            <p className="text-sm text-gray-900 mt-1">
                                                {unit.kode_unit || '-'}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Urutan</label>
                                            <p className="text-sm text-gray-900 mt-1">#{unit.urutan}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Tanggal Dibuat</label>
                                            <p className="text-sm text-gray-900 mt-1">
                                                {new Date(unit.created_at).toLocaleDateString('id-ID', {
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
                                {unit.deskripsi && (
                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                            <ion-icon name="document" class="text-xl mr-2 text-indigo-600"></ion-icon>
                                            Deskripsi
                                        </h4>
                                        <div className="prose prose-sm max-w-none">
                                            <div 
                                                className="text-gray-700 rich-text-content"
                                                dangerouslySetInnerHTML={{ __html: unit.deskripsi }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Panduan */}
                                {unit.panduan && (
                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                            <ion-icon name="book" class="text-xl mr-2 text-indigo-600"></ion-icon>
                                            Panduan Unit
                                        </h4>
                                        <div className="prose prose-sm max-w-none">
                                            <div 
                                                className="text-gray-700 rich-text-content"
                                                dangerouslySetInnerHTML={{ __html: unit.panduan }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Metadata */}
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <ion-icon name="time" class="text-xl mr-2 text-indigo-600"></ion-icon>
                                        Informasi Tambahan
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Terakhir Diupdate</label>
                                            <p className="text-sm text-gray-900 mt-1">
                                                {new Date(unit.updated_at).toLocaleDateString('id-ID', {
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
                                            <label className="block text-sm font-medium text-gray-500">ID Unit</label>
                                            <p className="text-sm text-gray-900 mt-1">#{unit.id}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-center space-x-4 pt-6">
                                    <Link
                                        href={route('exam.units.questions.index', [exam.id, unit.id])}
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                                    >
                                        <ion-icon name="help-circle" class="text-lg"></ion-icon>
                                        <span>Kelola Soal</span>
                                    </Link>
                                    <Link
                                        href={route('exam.units.edit', [exam.id, unit.id])}
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                                    >
                                        <ion-icon name="create" class="text-lg"></ion-icon>
                                        <span>Edit Unit</span>
                                    </Link>
                                    <Link
                                        href={route('exam.units.index', exam.id)}
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                                    >
                                        <ion-icon name="list" class="text-lg"></ion-icon>
                                        <span>Lihat Semua Unit</span>
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
