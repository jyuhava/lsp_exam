import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ auth, assignment }) {
    const { post, processing } = useForm();

    const generatePin = () => {
        post(route('pin-management.generate', assignment.id), {
            preserveScroll: true,
        });
    };

    const regeneratePin = () => {
        if (confirm('Apakah Anda yakin ingin regenerate PIN? PIN lama akan tidak berlaku.')) {
            post(route('pin-management.regenerate', assignment.id), {
                preserveScroll: true,
            });
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            'active': { bg: 'bg-green-100', text: 'text-green-800', label: 'Aktif' },
            'inactive': { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Tidak Aktif' },
            'completed': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Selesai' }
        };

        const config = statusConfig[status] || statusConfig['inactive'];
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={route('pin-management.index')}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Detail PIN Assignment
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title={`Detail PIN - ${assignment.exam?.nama_ujian}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Assignment Info */}
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Informasi Assignment</h3>
                                {getStatusBadge(assignment.status)}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-2">Nama Ujian</h4>
                                    <p className="text-lg font-semibold text-gray-900">{assignment.exam?.nama_ujian}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-2">Deskripsi</h4>
                                    <p className="text-gray-700">{assignment.exam?.deskripsi || 'Tidak ada deskripsi'}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-2">Tanggal Mulai</h4>
                                    <p className="text-gray-900">{new Date(assignment.tanggal_mulai).toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-2">Tanggal Selesai</h4>
                                    <p className="text-gray-900">{new Date(assignment.tanggal_selesai).toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-2">Jumlah Peserta</h4>
                                    <p className="text-gray-900">{assignment.asesis?.length || 0} peserta</p>
                                </div>
                                {assignment.catatan && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Catatan</h4>
                                        <p className="text-gray-700">{assignment.catatan}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* PIN Management */}
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Manajemen PIN</h3>
                                <div className="flex space-x-3">
                                    {!assignment.pin ? (
                                        <button
                                            onClick={generatePin}
                                            disabled={processing}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Generate PIN
                                        </button>
                                    ) : (
                                        <button
                                            onClick={regeneratePin}
                                            disabled={processing}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            Regenerate PIN
                                        </button>
                                    )}
                                </div>
                            </div>

                            {assignment.pin ? (
                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
                                    <div className="text-center">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">PIN Ujian</h4>
                                        <div className="text-4xl font-mono font-bold text-indigo-600 mb-4 tracking-widest">
                                            {assignment.pin}
                                        </div>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <p>PIN di-generate pada: {new Date(assignment.pin_generated_at).toLocaleString('id-ID')}</p>
                                            <p className="font-medium text-indigo-600">
                                                Berikan PIN ini kepada peserta untuk memulai ujian
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">PIN Belum Di-generate</h3>
                                    <p className="mt-1 text-sm text-gray-500">Klik tombol "Generate PIN" untuk membuat PIN ujian.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Unit Kompetensi */}
                    {assignment.exam?.units && assignment.exam.units.length > 0 && (
                        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Unit Kompetensi</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {assignment.exam.units.map((unit, index) => (
                                        <div key={unit.id} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-semibold text-gray-900">
                                                        {unit.kode_unit}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {unit.nama_unit}
                                                    </p>
                                                    {unit.time && (
                                                        <div className="flex items-center mt-2 text-xs text-gray-500">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            {unit.time} menit
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    Unit {index + 1}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Daftar Peserta */}
                    {assignment.asesis && assignment.asesis.length > 0 && (
                        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Daftar Peserta</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    No
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nama
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Email
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {assignment.asesis.map((asesi, index) => (
                                                <tr key={asesi.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {asesi.user?.name}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {asesi.user?.email}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            Terdaftar
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
