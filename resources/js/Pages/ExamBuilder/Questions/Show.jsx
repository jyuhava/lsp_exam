import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ exam, unit, question }) {
    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
            router.delete(route('exam.units.questions.destroy', [exam.id, unit.id, question.id]));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Detail Soal
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            {exam.judul} • {unit.nama_unit}
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            href={route('exam.units.questions.index', [exam.id, unit.id])}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <ion-icon name="arrow-back" class="text-lg"></ion-icon>
                            <span>Kembali</span>
                        </Link>
                        <Link
                            href={route('exam.units.questions.edit', [exam.id, unit.id, question.id])}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <ion-icon name="create" class="text-lg"></ion-icon>
                            <span>Edit</span>
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <ion-icon name="trash" class="text-lg"></ion-icon>
                            <span>Hapus</span>
                        </button>
                    </div>
                </div>
            }
        >
            <Head title={`${question.nama_soal} - ${unit.nama_unit}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Header Info */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                                        <span className="text-white text-sm font-bold">{question.urutan}</span>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {question.nama_soal}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Unit: {unit.nama_unit} • Exam: {exam.judul} • Dibuat pada {new Date(question.created_at).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Soal Section */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="border-b border-gray-200 pb-4 mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                        <ion-icon name="help-circle" class="text-indigo-500 mr-2 text-xl"></ion-icon>
                                        Pertanyaan Soal
                                    </h3>
                                </div>
                                <div 
                                    className="prose prose-sm max-w-none rich-text-content"
                                    dangerouslySetInnerHTML={{ __html: question.soal }}
                                />
                            </div>
                        </div>

                        {/* Lembar Jawaban Section */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="border-b border-gray-200 pb-4 mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                        <ion-icon name="document-text" class="text-blue-500 mr-2 text-xl"></ion-icon>
                                        Lembar Jawaban
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Contoh jawaban atau kunci jawaban untuk soal ini
                                    </p>
                                </div>
                                <div 
                                    className="prose prose-sm max-w-none rich-text-content"
                                    dangerouslySetInnerHTML={{ __html: question.lembar_jawaban }}
                                />
                            </div>
                        </div>

                        {/* Metadata Section */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="border-b border-gray-200 pb-4 mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                        <ion-icon name="information-circle" class="text-orange-500 mr-2 text-xl"></ion-icon>
                                        Informasi Soal
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nama Soal
                                        </label>
                                        <p className="text-gray-900">{question.nama_soal}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Urutan
                                        </label>
                                        <p className="text-gray-900">#{question.urutan}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tipe Soal
                                        </label>
                                        <span className="text-gray-900">Rich Text</span>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Status
                                        </label>
                                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                                            Aktif
                                        </span>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Dibuat pada
                                        </label>
                                        <p className="text-gray-900">{new Date(question.created_at).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Terakhir diperbarui
                                        </label>
                                        <p className="text-gray-900">{new Date(question.updated_at).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
