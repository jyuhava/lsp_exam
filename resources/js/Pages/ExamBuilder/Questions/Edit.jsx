import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import CKEditor from '@/Components/CKEditor';

export default function Edit({ exam, unit, question }) {
    const { data, setData, put, processing, errors } = useForm({
        nama_soal: question.nama_soal || '',
        soal: question.soal || '',
        lembar_jawaban: question.lembar_jawaban || '',
        urutan: question.urutan || 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('exam.units.questions.update', [exam.id, unit.id, question.id]));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Edit Soal
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            {exam.judul} • {unit.nama_unit}
                        </p>
                    </div>
                    <Link
                        href={route('exam.units.questions.show', [exam.id, unit.id, question.id])}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                    >
                        <ion-icon name="arrow-back" class="text-lg"></ion-icon>
                        <span>Kembali</span>
                    </Link>
                </div>
            }
        >
            <Head title={`Edit Soal - ${question.nama_soal}`} />

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
                                        Mengedit: {question.nama_soal}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Unit: {unit.nama_unit} • Exam: {exam.judul} • Dibuat pada {new Date(question.created_at).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Basic Information */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Soal</h3>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Nama Soal <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.nama_soal}
                                                    onChange={(e) => setData('nama_soal', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Contoh: Soal Essay Tentang Komunikasi"
                                                    required
                                                />
                                                {errors.nama_soal && <p className="mt-1 text-sm text-red-600">{errors.nama_soal}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Urutan <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={data.urutan}
                                                    onChange={(e) => setData('urutan', parseInt(e.target.value) || 1)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                    required
                                                />
                                                {errors.urutan && <p className="mt-1 text-sm text-red-600">{errors.urutan}</p>}
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Urutan soal dalam unit. Jika urutan sudah ada, soal lain akan digeser otomatis.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Soal Section */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Pertanyaan Soal</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Soal <span className="text-red-500">*</span>
                                        </label>
                                        <CKEditor
                                            value={data.soal}
                                            onChange={(value) => setData('soal', value)}
                                            placeholder="Masukkan pertanyaan soal essay/uraian..."
                                            style={{ minHeight: '350px' }}
                                        />
                                        {errors.soal && <p className="mt-1 text-sm text-red-600">{errors.soal}</p>}
                                        <p className="mt-1 text-xs text-gray-500">
                                            Gunakan toolbar CKEditor untuk memformat teks, menambah gambar, membuat tabel, dan berbagai fitur formatting lainnya.
                                        </p>
                                    </div>
                                </div>

                                {/* Lembar Jawaban Section */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Lembar Jawaban</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Contoh Jawaban <span className="text-red-500">*</span>
                                        </label>
                                        <CKEditor
                                            value={data.lembar_jawaban}
                                            onChange={(value) => setData('lembar_jawaban', value)}
                                            placeholder="Masukkan contoh jawaban atau kunci jawaban untuk soal ini..."
                                            style={{ minHeight: '350px' }}
                                        />
                                        {errors.lembar_jawaban && <p className="mt-1 text-sm text-red-600">{errors.lembar_jawaban}</p>}
                                        <p className="mt-1 text-xs text-gray-500">
                                            Lembar jawaban ini akan digunakan sebagai referensi untuk penilaian.
                                        </p>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end space-x-3 pt-6">
                                    <Link
                                        href={route('exam.units.questions.show', [exam.id, unit.id, question.id])}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 disabled:opacity-50 flex items-center space-x-2"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                <span>Menyimpan...</span>
                                            </>
                                        ) : (
                                            <>
                                                <ion-icon name="save" class="text-lg"></ion-icon>
                                                <span>Simpan Perubahan</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
