import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ asesi }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Detail Asesi
                    </h2>
                    <div className="flex space-x-2">
                        <Link
                            href={route('asesi.edit', asesi.id)}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <ion-icon name="create" class="text-lg"></ion-icon>
                            <span>Edit</span>
                        </Link>
                        <Link
                            href={route('asesi.index')}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <ion-icon name="arrow-back" class="text-lg"></ion-icon>
                            <span>Kembali</span>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Detail Asesi - ${asesi.nama_lengkap}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Profile Header */}
                            <div className="flex items-center mb-8">
                                <div className="flex-shrink-0 h-20 w-20">
                                    <div className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">
                                            {asesi.nama_lengkap.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-6">
                                    <h3 className="text-2xl font-bold text-gray-900">{asesi.nama_lengkap}</h3>
                                    <p className="text-lg text-gray-600">{asesi.user.email}</p>
                                    <div className="mt-2">
                                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                                            asesi.status === 'aktif' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {asesi.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Information Sections */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Personal Information */}
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <ion-icon name="person" class="text-xl mr-2 text-green-600"></ion-icon>
                                        Informasi Pribadi
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">NIM</label>
                                            <p className="text-sm text-gray-900">{asesi.nim || '-'}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Tempat Lahir</label>
                                            <p className="text-sm text-gray-900">{asesi.tempat_lahir || '-'}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Tanggal Lahir</label>
                                            <p className="text-sm text-gray-900">
                                                {asesi.tanggal_lahir ? new Date(asesi.tanggal_lahir).toLocaleDateString('id-ID') : '-'}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Jenis Kelamin</label>
                                            <p className="text-sm text-gray-900">
                                                {asesi.jenis_kelamin === 'L' ? 'Laki-laki' : asesi.jenis_kelamin === 'P' ? 'Perempuan' : '-'}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">No. Telepon</label>
                                            <p className="text-sm text-gray-900">{asesi.no_telepon || '-'}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Alamat</label>
                                            <p className="text-sm text-gray-900">{asesi.alamat || '-'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Academic Information */}
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <ion-icon name="school" class="text-xl mr-2 text-green-600"></ion-icon>
                                        Informasi Akademik
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Program Studi</label>
                                            <p className="text-sm text-gray-900">{asesi.program_studi || '-'}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Semester</label>
                                            <p className="text-sm text-gray-900">{asesi.semester || '-'}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">IPK</label>
                                            <p className="text-sm text-gray-900">{asesi.ipk || '-'}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Instansi Asal</label>
                                            <p className="text-sm text-gray-900">{asesi.instansi_asal || '-'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Account Information */}
                            <div className="mt-8 bg-gray-50 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <ion-icon name="key" class="text-xl mr-2 text-green-600"></ion-icon>
                                    Informasi Akun
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Email</label>
                                        <p className="text-sm text-gray-900">{asesi.user.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Role</label>
                                        <p className="text-sm text-gray-900 capitalize">{asesi.user.role}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Dibuat</label>
                                        <p className="text-sm text-gray-900">
                                            {new Date(asesi.created_at).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Terakhir Diupdate</label>
                                        <p className="text-sm text-gray-900">
                                            {new Date(asesi.updated_at).toLocaleDateString('id-ID')}
                                        </p>
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
