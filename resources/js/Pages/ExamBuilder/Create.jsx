import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        deskripsi: '',
        peraturan: '',
        status: 'draft',
        use_unit_timer: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('exam.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Buat Exam Baru
                    </h2>
                    <Link
                        href={route('exam.index')}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                    >
                        <ion-icon name="arrow-back" class="text-lg"></ion-icon>
                        <span>Kembali</span>
                    </Link>
                </div>
            }
        >
            <Head title="Buat Exam Baru" />

            <div className="space-y-6">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Basic Information */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Dasar</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Judul Exam <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.judul}
                                                onChange={(e) => setData('judul', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Masukkan judul exam"
                                                required
                                            />
                                            {errors.judul && <p className="mt-1 text-sm text-red-600">{errors.judul}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Deskripsi
                                            </label>
                                            <textarea
                                                value={data.deskripsi}
                                                onChange={(e) => setData('deskripsi', e.target.value)}
                                                rows={4}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Masukkan deskripsi exam (opsional)"
                                            />
                                            {errors.deskripsi && <p className="mt-1 text-sm text-red-600">{errors.deskripsi}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Rules and Regulations */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Peraturan Exam</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Peraturan
                                        </label>
                                        <textarea
                                            value={data.peraturan}
                                            onChange={(e) => setData('peraturan', e.target.value)}
                                            rows={6}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Masukkan peraturan exam (opsional)&#10;Contoh:&#10;1. Peserta wajib mengikuti exam sesuai waktu yang ditentukan&#10;2. Dilarang membuka buku atau catatan selama exam&#10;3. Peserta yang terlambat tidak diperkenankan mengikuti exam"
                                        />
                                        {errors.peraturan && <p className="mt-1 text-sm text-red-600">{errors.peraturan}</p>}
                                    </div>
                                </div>

                                {/* Status and Timer Settings */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Pengaturan Exam</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Status Exam <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                required
                                            >
                                                <option value="draft">Draft</option>
                                                <option value="aktif">Aktif</option>
                                                <option value="non_aktif">Non Aktif</option>
                                            </select>
                                            {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                                            <p className="mt-1 text-xs text-gray-500">
                                                Draft: Exam masih dalam tahap pembuatan | Aktif: Exam dapat diakses peserta | Non Aktif: Exam tidak dapat diakses
                                            </p>
                                        </div>

                                        <div>
                                            <div className="flex items-center">
                                                <input
                                                    id="use_unit_timer"
                                                    name="use_unit_timer"
                                                    type="checkbox"
                                                    checked={data.use_unit_timer}
                                                    onChange={(e) => setData('use_unit_timer', e.target.checked)}
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor="use_unit_timer" className="ml-2 block text-sm font-medium text-gray-900">
                                                    Gunakan Timer per Unit
                                                </label>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Jika diaktifkan, setiap unit akan memiliki waktu pengerjaan yang dapat diatur secara terpisah
                                            </p>
                                            {errors.use_unit_timer && <p className="mt-1 text-sm text-red-600">{errors.use_unit_timer}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end space-x-3 pt-6">
                                    <Link
                                        href={route('exam.index')}
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
                                                <span>Simpan Exam</span>
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
