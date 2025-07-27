import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function Show({ assignment }) {
    const [processing, setProcessing] = useState(false);

    const handleRegeneratePin = () => {
        if (confirm('Apakah Anda yakin ingin membuat PIN baru? PIN lama akan tidak berlaku.')) {
            setProcessing(true);
            router.patch(route('exam-assignment.regenerate-pin', assignment.id), {}, {
                onFinish: () => setProcessing(false)
            });
        }
    };

    const handleActivate = () => {
        setProcessing(true);
        router.patch(route('exam-assignment.activate', assignment.id), {}, {
            onFinish: () => setProcessing(false)
        });
    };

    const handleDeactivate = () => {
        setProcessing(true);
        router.patch(route('exam-assignment.deactivate', assignment.id), {}, {
            onFinish: () => setProcessing(false)
        });
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            draft: { color: 'bg-gray-100 text-gray-800', text: 'Draft' },
            aktif: { color: 'bg-green-100 text-green-800', text: 'Aktif' },
            selesai: { color: 'bg-blue-100 text-blue-800', text: 'Selesai' },
            dibatalkan: { color: 'bg-red-100 text-red-800', text: 'Dibatalkan' }
        };
        
        const config = statusConfig[status] || statusConfig.draft;
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                {config.text}
            </span>
        );
    };

    const getAsesiStatusBadge = (status) => {
        const statusConfig = {
            assigned: { color: 'bg-yellow-100 text-yellow-800', text: 'Ditugaskan' },
            started: { color: 'bg-blue-100 text-blue-800', text: 'Sedang Mengerjakan' },
            completed: { color: 'bg-green-100 text-green-800', text: 'Selesai' },
            expired: { color: 'bg-red-100 text-red-800', text: 'Kedaluwarsa' }
        };
        
        const config = statusConfig[status] || statusConfig.assigned;
        return (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                {config.text}
            </span>
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Assignment: ${assignment.judul_assignment}`} />

            <div className="py-8">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Link href={route('exam-assignment.index')}>
                                    <SecondaryButton>
                                        <ion-icon name="arrow-back" class="text-lg mr-2"></ion-icon>
                                        Kembali
                                    </SecondaryButton>
                                </Link>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{assignment.judul_assignment}</h1>
                                    <p className="mt-2 text-gray-600">Detail assignment ujian</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                {getStatusBadge(assignment.status)}
                                
                                <Link href={route('exam-assignment.edit', assignment.id)}>
                                    <SecondaryButton>
                                        <ion-icon name="create" class="text-lg mr-2"></ion-icon>
                                        Edit
                                    </SecondaryButton>
                                </Link>
                                
                                {assignment.status === 'draft' ? (
                                    <PrimaryButton onClick={handleActivate} disabled={processing}>
                                        <ion-icon name="play" class="text-lg mr-2"></ion-icon>
                                        Aktifkan
                                    </PrimaryButton>
                                ) : assignment.status === 'aktif' ? (
                                    <SecondaryButton onClick={handleDeactivate} disabled={processing}>
                                        <ion-icon name="pause" class="text-lg mr-2"></ion-icon>
                                        Nonaktifkan
                                    </SecondaryButton>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Assignment Info */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Informasi Assignment</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Ujian</label>
                                        <p className="text-sm text-gray-900">{assignment.exam.judul}</p>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Asesor</label>
                                        <p className="text-sm text-gray-900">{assignment.asesor.user.name}</p>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
                                        <p className="text-sm text-gray-900">
                                            {new Date(assignment.tanggal_mulai).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Jam Mulai</label>
                                        <p className="text-sm text-gray-900">{assignment.jam_mulai}</p>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai</label>
                                        <p className="text-sm text-gray-900">
                                            {new Date(assignment.tanggal_selesai).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Jam Selesai</label>
                                        <p className="text-sm text-gray-900">{assignment.jam_selesai}</p>
                                    </div>
                                    
                                    {assignment.durasi_menit && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Durasi</label>
                                            <p className="text-sm text-gray-900">{assignment.durasi_menit} menit</p>
                                        </div>
                                    )}
                                </div>

                                {assignment.deskripsi && (
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                                        <p className="text-sm text-gray-900">{assignment.deskripsi}</p>
                                    </div>
                                )}

                                {assignment.catatan && (
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                                        <p className="text-sm text-gray-900">{assignment.catatan}</p>
                                    </div>
                                )}
                            </div>

                            {/* Exam Settings */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Pengaturan Ujian</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-center">
                                        <div className={`w-4 h-4 rounded-full mr-3 ${assignment.acak_soal ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <span className="text-sm text-gray-900">Acak urutan soal</span>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <div className={`w-4 h-4 rounded-full mr-3 ${assignment.tampilkan_nilai ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <span className="text-sm text-gray-900">Tampilkan nilai</span>
                                    </div>
                                </div>
                            </div>

                            {/* Exam Content */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Konten Ujian</h3>
                                
                                <div className="space-y-4">
                                    {assignment.exam.units.map((unit, index) => (
                                        <div key={unit.id} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-medium text-gray-900">
                                                    Unit {index + 1}: {unit.judul}
                                                </h4>
                                                <span className="text-sm text-gray-500">
                                                    {unit.questions.length} soal
                                                </span>
                                            </div>
                                            {unit.deskripsi && (
                                                <p className="text-sm text-gray-600">{unit.deskripsi}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* PIN Ujian */}
                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold">PIN Ujian</h3>
                                    <ion-icon name="key" class="text-2xl"></ion-icon>
                                </div>
                                
                                <div className="text-center mb-4">
                                    <p className="text-4xl font-bold font-mono tracking-wider">
                                        {assignment.pin_ujian}
                                    </p>
                                </div>
                                
                                <button
                                    onClick={handleRegeneratePin}
                                    disabled={processing}
                                    className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    <ion-icon name="refresh" class="text-lg mr-2"></ion-icon>
                                    Generate PIN Baru
                                </button>
                            </div>

                            {/* Statistics */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Statistik</h3>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Total Asesi</span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {assignment.asesis.length}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Selesai</span>
                                        <span className="text-sm font-medium text-green-600">
                                            {assignment.asesis.filter(asesi => asesi.pivot.status === 'completed').length}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Sedang Mengerjakan</span>
                                        <span className="text-sm font-medium text-blue-600">
                                            {assignment.asesis.filter(asesi => asesi.pivot.status === 'started').length}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Belum Mulai</span>
                                        <span className="text-sm font-medium text-yellow-600">
                                            {assignment.asesis.filter(asesi => asesi.pivot.status === 'assigned').length}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Asesi List */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Daftar Asesi</h3>
                                
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {assignment.asesis.map((asesi) => (
                                        <div key={asesi.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {asesi.user.name}
                                                </p>
                                                {asesi.nim && (
                                                    <p className="text-xs text-gray-500">
                                                        NIM: {asesi.nim}
                                                    </p>
                                                )}
                                                {asesi.pivot.score && (
                                                    <p className="text-xs text-green-600 font-medium">
                                                        Nilai: {asesi.pivot.score}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                {getAsesiStatusBadge(asesi.pivot.status)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
