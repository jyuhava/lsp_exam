import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function MyRegistrations({ auth, registrations, asesi }) {
    const { patch, processing } = useForm();
    const [cancellingId, setCancellingId] = useState(null);

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Menunggu Persetujuan' },
            approved: { color: 'bg-green-100 text-green-800', text: 'Disetujui' },
            rejected: { color: 'bg-red-100 text-red-800', text: 'Ditolak' },
            cancelled: { color: 'bg-gray-100 text-gray-800', text: 'Dibatalkan' }
        };
        
        const config = statusConfig[status] || statusConfig.pending;
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                {config.text}
            </span>
        );
    };

    const handleCancel = (registrationId) => {
        if (confirm('Apakah Anda yakin ingin membatalkan pendaftaran ini?')) {
            setCancellingId(registrationId);
            patch(route('asesi.cancel-registration', registrationId), {
                onFinish: () => setCancellingId(null)
            });
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pendaftaran Saya</h2>}
        >
            <Head title="Pendaftaran Saya" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Riwayat Pendaftaran Asesmen
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Kelola dan pantau status pendaftaran asesmen Anda
                                    </p>
                                </div>
                                <Link
                                    href={route('asesi.available-exams')}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Daftar Asesmen Baru
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Registrations List */}
                    {registrations.length === 0 ? (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada pendaftaran</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Anda belum mendaftar untuk asesmen apapun.
                                </p>
                                <div className="mt-6">
                                    <Link
                                        href={route('asesi.available-exams')}
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Daftar Asesmen Sekarang
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {registrations.map((registration) => (
                                <div key={registration.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        {registration.exam.judul}
                                                    </h3>
                                                    {getStatusBadge(registration.status)}
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    No. Pendaftaran: <span className="font-medium">{registration.registration_number}</span>
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Didaftarkan pada: {formatDate(registration.created_at)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <div className="flex items-center">
                                                    <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-900">Status</p>
                                                        <p className="text-xs text-gray-600 capitalize">{registration.exam.status}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <div className="flex items-center">
                                                    <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-900">Unit</p>
                                                        <p className="text-xs text-gray-600">{registration.exam.units?.length || 0} unit</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <div className="flex items-center">
                                                    <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 2m8-2l2 2m-2-2v6a2 2 0 01-2 2H10a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H10a2 2 0 00-2 2v.01" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-900">Dibuat</p>
                                                        <p className="text-xs text-gray-600">
                                                            {new Date(registration.exam.created_at).toLocaleDateString('id-ID')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Motivation */}
                                        <div className="mb-4">
                                            <h4 className="text-sm font-medium text-gray-900 mb-2">Motivasi:</h4>
                                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                                {registration.motivation}
                                            </p>
                                        </div>

                                        {/* Admin Notes */}
                                        {registration.admin_notes && (
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-gray-900 mb-2">Catatan Admin:</h4>
                                                <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                                    {registration.admin_notes}
                                                </p>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                            <div className="text-sm text-gray-500">
                                                {registration.approved_by && (
                                                    <span>Disetujui oleh: {registration.approved_by.name}</span>
                                                )}
                                                {registration.rejected_by && (
                                                    <span>Ditolak oleh: {registration.rejected_by.name}</span>
                                                )}
                                            </div>
                                            <div className="flex space-x-2">
                                                {registration.status === 'pending' && (
                                                    <button
                                                        onClick={() => handleCancel(registration.id)}
                                                        disabled={processing || cancellingId === registration.id}
                                                        className="inline-flex items-center px-3 py-1 border border-red-300 text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                                                    >
                                                        {cancellingId === registration.id ? 'Membatalkan...' : 'Batalkan'}
                                                    </button>
                                                )}
                                                {registration.status === 'approved' && (
                                                    <Link
                                                        href={route('asesi.assignments')}
                                                        className="inline-flex items-center px-3 py-1 border border-green-300 text-sm leading-4 font-medium rounded-md text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                    >
                                                        Lihat Assignment
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
