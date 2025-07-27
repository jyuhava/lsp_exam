import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import CKEditor from '@/Components/CKEditor';

export default function Edit({ exam, unit }) {
    const { data, setData, put, processing, errors } = useForm({
        nama_unit: unit.nama_unit || '',
        kode_unit: unit.kode_unit || '',
        deskripsi: unit.deskripsi || '',
        panduan: unit.panduan || '',
        urutan: unit.urutan || 1,
        time: unit.time || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('exam.units.update', [exam.id, unit.id]));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Edit Unit
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Exam: {exam.judul}
                        </p>
                    </div>
                    <Link
                        href={route('exam.units.index', exam.id)}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                    >
                        <ion-icon name="arrow-back" class="text-lg"></ion-icon>
                        <span>Kembali</span>
                    </Link>
                </div>
            }
        >
            <Head title={`Edit Unit - ${unit.nama_unit}`} />

            <div className="space-y-6">
                <div className="max-w-5xl mx-auto">
                    {/* Header Info */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                                        <span className="text-white text-sm font-bold">{unit.urutan}</span>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Mengedit: {unit.nama_unit}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Exam: {exam.judul} • Dibuat pada {new Date(unit.created_at).toLocaleDateString('id-ID')}
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
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Unit</h3>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Nama Unit <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.nama_unit}
                                                    onChange={(e) => setData('nama_unit', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Masukkan nama unit"
                                                    required
                                                />
                                                {errors.nama_unit && <p className="mt-1 text-sm text-red-600">{errors.nama_unit}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Kode Unit
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.kode_unit}
                                                    onChange={(e) => setData('kode_unit', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Contoh: U001, UNIT-01"
                                                />
                                                {errors.kode_unit && <p className="mt-1 text-sm text-red-600">{errors.kode_unit}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                    Urutan unit dalam exam. Jika urutan sudah ada, unit lain akan digeser otomatis.
                                                </p>
                                            </div>

                                            {exam.use_unit_timer && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Waktu Pengerjaan (Menit)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={data.time || ''}
                                                        onChange={(e) => setData('time', parseInt(e.target.value) || null)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="Masukkan waktu dalam menit"
                                                    />
                                                    {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Waktu yang diberikan untuk menyelesaikan unit ini (dalam menit). Kosongkan jika tidak ada batasan waktu.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Deskripsi
                                            </label>
                                            <CKEditor
                                                value={data.deskripsi}
                                                onChange={(value) => setData('deskripsi', value)}
                                                placeholder="Masukkan deskripsi unit (opsional). Contoh: Unit ini berisi soal-soal tentang..."
                                                style={{ minHeight: '350px' }}
                                            />
                                            {errors.deskripsi && <p className="mt-1 text-sm text-red-600">{errors.deskripsi}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Panduan Section */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Panduan Unit</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Panduan
                                        </label>
                                        <CKEditor
                                            value={data.panduan}
                                            onChange={(value) => setData('panduan', value)}
                                            placeholder="Masukkan panduan untuk unit ini (opsional). Contoh: 1. Bacalah setiap soal dengan teliti, 2. Pilih jawaban yang paling tepat, 3. Waktu pengerjaan: 60 menit"
                                            style={{ minHeight: '350px' }}
                                        />
                                        {errors.panduan && <p className="mt-1 text-sm text-red-600">{errors.panduan}</p>}
                                        <p className="mt-1 text-xs text-gray-500">
                                            Panduan ini akan ditampilkan kepada peserta sebelum mengerjakan unit.
                                        </p>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end space-x-3 pt-6">
                                    <Link
                                        href={route('exam.units.show', [exam.id, unit.id])}
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
