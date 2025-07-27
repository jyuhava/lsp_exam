import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Index({ assignments }) {
    const [processing, setProcessing] = useState(false);

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus assignment ini?')) {
            setProcessing(true);
            router.delete(route('exam-assignment.destroy', id), {
                onFinish: () => setProcessing(false)
            });
        }
    };

    const handleActivate = (id) => {
        setProcessing(true);
        router.patch(route('exam-assignment.activate', id), {}, {
            onFinish: () => setProcessing(false)
        });
    };

    const handleDeactivate = (id) => {
        setProcessing(true);
        router.patch(route('exam-assignment.deactivate', id), {}, {
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
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                {config.text}
            </span>
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Assign Exam" />

            <div className="py-8">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Assign Exam</h1>
                                <p className="mt-2 text-gray-600">Kelola assignment ujian untuk asesi</p>
                            </div>
                            <Link href={route('exam-assignment.create')}>
                                <PrimaryButton className="flex items-center space-x-2">
                                    <ion-icon name="add" class="text-lg"></ion-icon>
                                    <span>Buat Assignment</span>
                                </PrimaryButton>
                            </Link>
                        </div>
                    </div>

                    {/* Assignments Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {assignments.data.map((assignment) => (
                            <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                                {/* Card Header */}
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                {assignment.judul_assignment}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-3">
                                                {assignment.exam.judul}
                                            </p>
                                            {getStatusBadge(assignment.status)}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6 space-y-4">
                                    {/* PIN Ujian */}
                                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">PIN Ujian</p>
                                                <p className="text-2xl font-bold text-indigo-600 font-mono">
                                                    {assignment.pin_ujian}
                                                </p>
                                            </div>
                                            <div className="text-indigo-500">
                                                <ion-icon name="key" class="text-2xl"></ion-icon>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Assignment Info */}
                                    <div className="space-y-3">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <ion-icon name="person" class="text-lg mr-2 text-gray-400"></ion-icon>
                                            <span>Asesor: {assignment.asesor.user.name}</span>
                                        </div>
                                        
                                        <div className="flex items-center text-sm text-gray-600">
                                            <ion-icon name="calendar" class="text-lg mr-2 text-gray-400"></ion-icon>
                                            <span>
                                                {new Date(assignment.tanggal_mulai).toLocaleDateString('id-ID')} - {new Date(assignment.tanggal_selesai).toLocaleDateString('id-ID')}
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center text-sm text-gray-600">
                                            <ion-icon name="time" class="text-lg mr-2 text-gray-400"></ion-icon>
                                            <span>
                                                {assignment.jam_mulai} - {assignment.jam_selesai}
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center text-sm text-gray-600">
                                            <ion-icon name="people" class="text-lg mr-2 text-gray-400"></ion-icon>
                                            <span>{assignment.asesis.length} Asesi</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Actions */}
                                <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
                                    <div className="flex items-center justify-between">
                                        <div className="flex space-x-2">
                                            <Link href={route('exam-assignment.show', assignment.id)}>
                                                <SecondaryButton className="text-xs">
                                                    <ion-icon name="eye" class="text-sm mr-1"></ion-icon>
                                                    Detail
                                                </SecondaryButton>
                                            </Link>
                                            
                                            <Link href={route('exam-assignment.edit', assignment.id)}>
                                                <SecondaryButton className="text-xs">
                                                    <ion-icon name="create" class="text-sm mr-1"></ion-icon>
                                                    Edit
                                                </SecondaryButton>
                                            </Link>
                                        </div>

                                        <div className="flex space-x-2">
                                            {assignment.status === 'draft' ? (
                                                <button
                                                    onClick={() => handleActivate(assignment.id)}
                                                    disabled={processing}
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                                                >
                                                    <ion-icon name="play" class="text-sm mr-1"></ion-icon>
                                                    Aktifkan
                                                </button>
                                            ) : assignment.status === 'aktif' ? (
                                                <button
                                                    onClick={() => handleDeactivate(assignment.id)}
                                                    disabled={processing}
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
                                                >
                                                    <ion-icon name="pause" class="text-sm mr-1"></ion-icon>
                                                    Nonaktifkan
                                                </button>
                                            ) : null}
                                            
                                            <button
                                                onClick={() => handleDelete(assignment.id)}
                                                disabled={processing}
                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                                            >
                                                <ion-icon name="trash" class="text-sm mr-1"></ion-icon>
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {assignments.data.length === 0 && (
                        <div className="text-center py-12">
                            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                                <ion-icon name="clipboard-outline" class="text-6xl"></ion-icon>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada assignment</h3>
                            <p className="text-gray-500 mb-6">Mulai dengan membuat assignment ujian pertama Anda.</p>
                            <Link href={route('exam-assignment.create')}>
                                <PrimaryButton>
                                    <ion-icon name="add" class="text-lg mr-2"></ion-icon>
                                    Buat Assignment
                                </PrimaryButton>
                            </Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {assignments.links && assignments.links.length > 3 && (
                        <div className="mt-8 flex justify-center">
                            <nav className="flex space-x-2">
                                {assignments.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                                            link.active
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
