import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function Show({ auth, registration }) {
    const { patch, processing, data, setData, errors } = useForm({
        admin_notes: registration.admin_notes || ''
    });
    const [showRejectForm, setShowRejectForm] = useState(false);

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Menunggu Persetujuan' },
            approved: { color: 'bg-green-100 text-green-800', text: 'Disetujui' },
            rejected: { color: 'bg-red-100 text-red-800', text: 'Ditolak' },
            cancelled: { color: 'bg-gray-100 text-gray-800', text: 'Dibatalkan' }
        };
        
        const config = statusConfig[status] || statusConfig.pending;
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                {config.text}
            </span>
        );
    };

    const handleApprove = () => {
        if (confirm('Apakah Anda yakin ingin menyetujui pendaftaran ini?')) {
            patch(route('admin.assessment-registrations.approve', registration.id));
        }
    };

    const handleReject = (e) => {
        e.preventDefault();
        if (confirm('Apakah Anda yakin ingin menolak pendaftaran ini?')) {
            patch(route('admin.assessment-registrations.reject', registration.id), {
                onSuccess: () => {
                    setShowRejectForm(false);
                }
            });
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const totalQuestions = registration.exam.units?.reduce((total, unit) => {
        return total + (unit.questions?.length || 0);
    }, 0) || 0;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Detail Pendaftaran Asesmen
                    </h2>
                    <Link
                        href={route('admin.assessment-registrations.index')}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        ← Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Detail Pendaftaran" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Registration Overview */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        Informasi Pendaftaran
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        No. Pendaftaran: <span className="font-mono font-medium">{registration.registration_number}</span>
                                    </p>
                                </div>
                                {getStatusBadge(registration.status)}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Informasi Asesi</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-12 w-12">
                                                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                                                    <span className="text-lg font-medium text-gray-700">
                                                        {registration.asesi.user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {registration.asesi.user.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {registration.asesi.user.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="ml-16 space-y-1">
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">NIM:</span> {registration.asesi.nim || '-'}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">Program Studi:</span> {registration.asesi.program_studi || '-'}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">Instansi:</span> {registration.asesi.instansi_asal || '-'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Timeline</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center text-sm">
                                            <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-gray-600">Didaftarkan: {formatDate(registration.created_at)}</span>
                                        </div>
                                        {registration.approved_at && (
                                            <div className="flex items-center text-sm">
                                                <svg className="h-4 w-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-gray-600">
                                                    Disetujui: {formatDate(registration.approved_at)}
                                                    {registration.approved_by && ` oleh ${registration.approved_by.name}`}
                                                </span>
                                            </div>
                                        )}
                                        {registration.rejected_at && (
                                            <div className="flex items-center text-sm">
                                                <svg className="h-4 w-4 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                <span className="text-gray-600">
                                                    Ditolak: {formatDate(registration.rejected_at)}
                                                    {registration.rejected_by && ` oleh ${registration.rejected_by.name}`}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Exam Information */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Asesmen</h3>
                            
                            <div className="mb-6">
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    {registration.exam.nama_ujian}
                                </h4>
                                <p className="text-gray-600 mb-4">
                                    {registration.exam.deskripsi}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Durasi</p>
                                            <p className="text-sm text-gray-600">{registration.exam.durasi_ujian} menit</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Unit Kompetensi</p>
                                            <p className="text-sm text-gray-600">{registration.exam.units?.length || 0} unit</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Total Soal</p>
                                            <p className="text-sm text-gray-600">{totalQuestions} soal</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Tipe</p>
                                            <p className="text-sm text-gray-600">{registration.exam.tipe_ujian}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Units List */}
                            {registration.exam.units && registration.exam.units.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Unit Kompetensi:</h4>
                                    <div className="space-y-2">
                                        {registration.exam.units.map((unit, index) => (
                                            <div key={unit.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-800 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                                                    {index + 1}
                                                </span>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">{unit.kode_unit}</p>
                                                    <p className="text-sm text-gray-600">{unit.nama_unit}</p>
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    {unit.questions?.length || 0} soal
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Motivation */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Motivasi Asesi</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-700 whitespace-pre-wrap">
                                    {registration.motivation}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Admin Notes */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Catatan Admin</h3>
                            {registration.admin_notes ? (
                                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
                                    <p className="text-gray-700 whitespace-pre-wrap">
                                        {registration.admin_notes}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">Belum ada catatan admin.</p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    {registration.status === 'pending' && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Tindakan</h3>
                                
                                <div className="flex space-x-4">
                                    <PrimaryButton
                                        onClick={handleApprove}
                                        disabled={processing}
                                        className="bg-green-600 hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:ring-green-500"
                                    >
                                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {processing ? 'Memproses...' : 'Setujui Pendaftaran'}
                                    </PrimaryButton>
                                    
                                    <SecondaryButton
                                        onClick={() => setShowRejectForm(!showRejectForm)}
                                        className="border-red-300 text-red-700 hover:bg-red-50"
                                    >
                                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Tolak Pendaftaran
                                    </SecondaryButton>
                                </div>

                                {/* Reject Form */}
                                {showRejectForm && (
                                    <form onSubmit={handleReject} className="mt-6 p-4 border border-red-200 rounded-lg bg-red-50">
                                        <div className="mb-4">
                                            <InputLabel htmlFor="admin_notes" value="Alasan Penolakan (Opsional)" />
                                            <textarea
                                                id="admin_notes"
                                                name="admin_notes"
                                                rows={4}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                                                placeholder="Berikan alasan mengapa pendaftaran ini ditolak..."
                                                value={data.admin_notes}
                                                onChange={(e) => setData('admin_notes', e.target.value)}
                                            />
                                            <InputError message={errors.admin_notes} className="mt-2" />
                                        </div>
                                        
                                        <div className="flex space-x-3">
                                            <PrimaryButton
                                                type="submit"
                                                disabled={processing}
                                                className="bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:ring-red-500"
                                            >
                                                {processing ? 'Memproses...' : 'Konfirmasi Penolakan'}
                                            </PrimaryButton>
                                            <SecondaryButton
                                                type="button"
                                                onClick={() => setShowRejectForm(false)}
                                            >
                                                Batal
                                            </SecondaryButton>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
