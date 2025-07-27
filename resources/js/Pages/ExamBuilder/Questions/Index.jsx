import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ exam, unit, questions }) {
    const handleDelete = (questionId) => {
        if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
            router.delete(route('exam.units.questions.destroy', [exam.id, unit.id, questionId]));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Daftar Soal
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            {exam.judul} • {unit.nama_unit}
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            href={route('exam.units.show', [exam.id, unit.id])}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <ion-icon name="arrow-back" class="text-lg"></ion-icon>
                            <span>Kembali ke Unit</span>
                        </Link>
                        <Link
                            href={route('exam.units.questions.create', [exam.id, unit.id])}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <ion-icon name="add" class="text-lg"></ion-icon>
                            <span>Tambah Soal</span>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Soal - ${unit.nama_unit}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Unit Info Card */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                                        <span className="text-white text-sm font-bold">{unit.urutan}</span>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">{unit.nama_unit}</h3>
                                    <p className="text-sm text-gray-600">
                                        {questions.length} soal • Exam: {exam.judul}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {questions.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                                        <ion-icon name="document-text-outline" class="text-6xl"></ion-icon>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada soal</h3>
                                    <p className="text-gray-600 mb-6">
                                        Mulai dengan menambahkan soal pertama untuk unit ini.
                                    </p>
                                    <Link
                                        href={route('exam.units.questions.create', [exam.id, unit.id])}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 inline-flex items-center space-x-2"
                                    >
                                        <ion-icon name="add" class="text-lg"></ion-icon>
                                        <span>Tambah Soal Pertama</span>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {questions.map((question) => (
                                        <div key={question.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                            <span className="text-blue-600 text-sm font-medium">{question.urutan}</span>
                                                        </div>
                                                        <h4 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                                                            <span>{question.nama_soal}</span>
                                                            {question.spreadsheet_data && (
                                                                <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                                                                    Spreadsheet
                                                                </span>
                                                            )}
                                                        </h4>
                                                    </div>
                                                    <div className="ml-11">
                                                        <div 
                                                            className="text-gray-600 text-sm line-clamp-2 rich-text-content"
                                                            dangerouslySetInnerHTML={{ __html: question.soal }}
                                                        />
                                                        <div className="mt-2 text-xs text-gray-500 flex items-center space-x-4">
                                                            <span>Dibuat pada {new Date(question.created_at).toLocaleDateString('id-ID')}</span>
                                                            <span className="flex items-center space-x-1">
                                                                <ion-icon name="document-text" class="text-xs"></ion-icon>
                                                                <span>Rich Text</span>
                                                                {question.spreadsheet_data && (
                                                                    <>
                                                                        <span>+</span>
                                                                        <ion-icon name="grid" class="text-xs"></ion-icon>
                                                                        <span>Spreadsheet</span>
                                                                    </>
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2 ml-4">
                                                    <Link
                                                        href={route('exam.units.questions.show', [exam.id, unit.id, question.id])}
                                                        className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                                                        title="Lihat Detail"
                                                    >
                                                        <ion-icon name="eye" class="text-lg"></ion-icon>
                                                    </Link>
                                                    <Link
                                                        href={route('exam.units.questions.edit', [exam.id, unit.id, question.id])}
                                                        className="text-indigo-600 hover:text-indigo-800 p-2 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
                                                        title="Edit"
                                                    >
                                                        <ion-icon name="create" class="text-lg"></ion-icon>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(question.id)}
                                                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                                                        title="Hapus"
                                                    >
                                                        <ion-icon name="trash" class="text-lg"></ion-icon>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
