import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ asesor }) {
    const { data, setData, put, processing, errors } = useForm({
        nama_lengkap: asesor.nama_lengkap || '',
        email: asesor.user.email || '',
        password: '',
        nip: asesor.nip || '',
        tempat_lahir: asesor.tempat_lahir || '',
        tanggal_lahir: asesor.tanggal_lahir || '',
        jenis_kelamin: asesor.jenis_kelamin || '',
        alamat: asesor.alamat || '',
        no_telepon: asesor.no_telepon || '',
        pendidikan_terakhir: asesor.pendidikan_terakhir || '',
        bidang_keahlian: asesor.bidang_keahlian || '',
        sertifikat_asesor: asesor.sertifikat_asesor || '',
        masa_berlaku_sertifikat: asesor.masa_berlaku_sertifikat || '',
        status: asesor.status || 'aktif',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('asesor.update', asesor.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit Asesor
                    </h2>
                    <Link
                        href={route('asesor.index')}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                    >
                        <ion-icon name="arrow-back" class="text-lg"></ion-icon>
                        <span>Kembali</span>
                    </Link>
                </div>
            }
        >
            <Head title={`Edit Asesor - ${asesor.nama_lengkap}`} />

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
                                                NIP
                                            </label>
                                            <input
                                                type="text"
                                                value={data.nip}
                                                onChange={(e) => setData('nip', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.nip && <p className="mt-1 text-sm text-red-600">{errors.nip}</p>}
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

                                {/* Professional Information */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Profesional</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Pendidikan Terakhir
                                            </label>
                                            <input
                                                type="text"
                                                value={data.pendidikan_terakhir}
                                                onChange={(e) => setData('pendidikan_terakhir', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.pendidikan_terakhir && <p className="mt-1 text-sm text-red-600">{errors.pendidikan_terakhir}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Bidang Keahlian
                                            </label>
                                            <input
                                                type="text"
                                                value={data.bidang_keahlian}
                                                onChange={(e) => setData('bidang_keahlian', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.bidang_keahlian && <p className="mt-1 text-sm text-red-600">{errors.bidang_keahlian}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Sertifikat Asesor
                                            </label>
                                            <input
                                                type="text"
                                                value={data.sertifikat_asesor}
                                                onChange={(e) => setData('sertifikat_asesor', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.sertifikat_asesor && <p className="mt-1 text-sm text-red-600">{errors.sertifikat_asesor}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Masa Berlaku Sertifikat
                                            </label>
                                            <input
                                                type="date"
                                                value={data.masa_berlaku_sertifikat}
                                                onChange={(e) => setData('masa_berlaku_sertifikat', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.masa_berlaku_sertifikat && <p className="mt-1 text-sm text-red-600">{errors.masa_berlaku_sertifikat}</p>}
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
                                        href={route('asesor.index')}
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
