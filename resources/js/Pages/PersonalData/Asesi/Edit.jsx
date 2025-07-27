import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ asesi }) {
    const { data, setData, put, processing, errors } = useForm({
        nama_lengkap: asesi.nama_lengkap || '',
        email: asesi.user.email || '',
        password: '',
        nim: asesi.nim || '',
        tempat_lahir: asesi.tempat_lahir || '',
        tanggal_lahir: asesi.tanggal_lahir || '',
        jenis_kelamin: asesi.jenis_kelamin || '',
        alamat: asesi.alamat || '',
        no_telepon: asesi.no_telepon || '',
        program_studi: asesi.program_studi || '',
        semester: asesi.semester || '',
        ipk: asesi.ipk || '',
        instansi_asal: asesi.instansi_asal || '',
        status: asesi.status || 'aktif',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('asesi.update', asesi.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit Asesi
                    </h2>
                    <Link
                        href={route('asesi.index')}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                    >
                        <ion-icon name="arrow-back" class="text-lg"></ion-icon>
                        <span>Kembali</span>
                    </Link>
                </div>
            }
        >
            <Head title={`Edit Asesi - ${asesi.nama_lengkap}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Account Information */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Akun</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                required
                                            />
                                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Password Baru <span className="text-gray-500">(kosongkan jika tidak ingin mengubah)</span>
                                            </label>
                                            <input
                                                type="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Information */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Pribadi</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nama Lengkap <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.nama_lengkap}
                                                onChange={(e) => setData('nama_lengkap', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                required
                                            />
                                            {errors.nama_lengkap && <p className="mt-1 text-sm text-red-600">{errors.nama_lengkap}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                NIM
                                            </label>
                                            <input
                                                type="text"
                                                value={data.nim}
                                                onChange={(e) => setData('nim', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.nim && <p className="mt-1 text-sm text-red-600">{errors.nim}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tempat Lahir
                                            </label>
                                            <input
                                                type="text"
                                                value={data.tempat_lahir}
                                                onChange={(e) => setData('tempat_lahir', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.tempat_lahir && <p className="mt-1 text-sm text-red-600">{errors.tempat_lahir}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tanggal Lahir
                                            </label>
                                            <input
                                                type="date"
                                                value={data.tanggal_lahir}
                                                onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.tanggal_lahir && <p className="mt-1 text-sm text-red-600">{errors.tanggal_lahir}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Jenis Kelamin
                                            </label>
                                            <select
                                                value={data.jenis_kelamin}
                                                onChange={(e) => setData('jenis_kelamin', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                            >
                                                <option value="">Pilih Jenis Kelamin</option>
                                                <option value="L">Laki-laki</option>
                                                <option value="P">Perempuan</option>
                                            </select>
                                            {errors.jenis_kelamin && <p className="mt-1 text-sm text-red-600">{errors.jenis_kelamin}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                No. Telepon
                                            </label>
                                            <input
                                                type="text"
                                                value={data.no_telepon}
                                                onChange={(e) => setData('no_telepon', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.no_telepon && <p className="mt-1 text-sm text-red-600">{errors.no_telepon}</p>}
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Alamat
                                            </label>
                                            <textarea
                                                value={data.alamat}
                                                onChange={(e) => setData('alamat', e.target.value)}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.alamat && <p className="mt-1 text-sm text-red-600">{errors.alamat}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Academic Information */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Akademik</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Program Studi
                                            </label>
                                            <input
                                                type="text"
                                                value={data.program_studi}
                                                onChange={(e) => setData('program_studi', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.program_studi && <p className="mt-1 text-sm text-red-600">{errors.program_studi}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Semester
                                            </label>
                                            <input
                                                type="text"
                                                value={data.semester}
                                                onChange={(e) => setData('semester', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Contoh: 6"
                                            />
                                            {errors.semester && <p className="mt-1 text-sm text-red-600">{errors.semester}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                IPK
                                            </label>
                                            <input
                                                type="text"
                                                value={data.ipk}
                                                onChange={(e) => setData('ipk', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Contoh: 3.75"
                                            />
                                            {errors.ipk && <p className="mt-1 text-sm text-red-600">{errors.ipk}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Instansi Asal
                                            </label>
                                            <input
                                                type="text"
                                                value={data.instansi_asal}
                                                onChange={(e) => setData('instansi_asal', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Contoh: Universitas ABC"
                                            />
                                            {errors.instansi_asal && <p className="mt-1 text-sm text-red-600">{errors.instansi_asal}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Status */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Status</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        >
                                            <option value="aktif">Aktif</option>
                                            <option value="non_aktif">Non Aktif</option>
                                        </select>
                                        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end space-x-3 pt-6">
                                    <Link
                                        href={route('asesi.index')}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
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
