import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';

export default function MyAssignments({ auth, assignments, asesi }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const filteredAssignments = assignments.filter(assignment =>
        (assignment.exam?.nama_ujian?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (assignment.asesor?.user?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { color: 'bg-green-100 text-green-800', text: 'Aktif' },
            inactive: { color: 'bg-gray-100 text-gray-800', text: 'Tidak Aktif' },
            completed: { color: 'bg-blue-100 text-blue-800', text: 'Selesai' }
        };
        
        const config = statusConfig[status] || statusConfig.inactive;
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                {config.text}
            </span>
        );
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

    const isAssignmentActive = (assignment) => {
        if (assignment.status !== 'active') return false;
        
        const now = new Date();
        const startDate = assignment.tanggal_mulai ? new Date(assignment.tanggal_mulai) : null;
        const endDate = assignment.tanggal_selesai ? new Date(assignment.tanggal_selesai) : null;
        
        if (startDate && now < startDate) return false;
        if (endDate && now > endDate) return false;
        
        return true;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Assignment Saya</h2>}
        >
            <Head title="Assignment Saya" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Assignment Asesmen Saya
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Daftar asesmen yang telah di-assign kepada Anda
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('asesi.registrations')}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Lihat Pendaftaran
                                    </Link>
                                    <Link
                                        href={route('asesi.available-exams')}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Daftar Asesmen Baru
                                    </Link>
                                </div>
                            </div>

                            {/* Search */}
                            <div className="mb-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Cari assignment..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Assignments List */}
                    {filteredAssignments.length === 0 ? (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada assignment</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {searchTerm ? 'Tidak ada assignment yang sesuai dengan pencarian Anda.' : 'Anda belum memiliki assignment asesmen.'}
                                </p>
                                {!searchTerm && (
                                    <div className="mt-6">
                                        <Link
                                            href={route('asesi.available-exams')}
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Daftar Asesmen Sekarang
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredAssignments.map((assignment) => (
                                <div key={assignment.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        {assignment.exam.nama_ujian}
                                                    </h3>
                                                    {getStatusBadge(assignment.status)}
                                                    {isAssignmentActive(assignment) && assignment.pin && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            Siap Dikerjakan
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    {assignment.exam.deskripsi}
                                                </p>
                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                    <span>Status PIN: <span className="font-medium">{assignment.pin ? 'Tersedia' : 'Menunggu Asesor'}</span></span>
                                                    <span>Asesor: {assignment.asesor.user.name}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <div className="flex items-center">
                                                    <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-900">Status PIN</p>
                                                        <p className="text-xs text-gray-600">{assignment.pin ? 'Siap Ujian' : 'Menunggu'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <div className="flex items-center">
                                                    <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4zm0 0v4a2 2 0 002 2h6a2 2 0 002-2v-4" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-900">Mulai</p>
                                                        <p className="text-xs text-gray-600">{formatDate(assignment.tanggal_mulai)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <div className="flex items-center">
                                                    <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-900">Selesai</p>
                                                        <p className="text-xs text-gray-600">{formatDate(assignment.tanggal_selesai)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <div className="flex items-center">
                                                    <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-900">Asesor</p>
                                                        <p className="text-xs text-gray-600">{assignment.asesor.user.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Exam Details */}
                                        <div className="mb-4">
                                            <h4 className="text-sm font-medium text-gray-900 mb-2">Detail Asesmen:</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Durasi: {assignment.exam.durasi_ujian} menit
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                    </svg>
                                                    Unit: {assignment.exam.units?.length || 0} unit kompetensi
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    Tipe: {assignment.exam.tipe_ujian}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Instructions */}
                                        {assignment.catatan && (
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-gray-900 mb-2">Catatan:</h4>
                                                <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                    {assignment.catatan}
                                                </p>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                            <div className="text-sm text-gray-500">
                                                Dibuat pada: {formatDate(assignment.created_at)}
                                            </div>
                                            <div className="flex space-x-2">
                                                {isAssignmentActive(assignment) && assignment.pin ? (
                                                    <button
                                                        className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                        onClick={() => {
                                                            alert('Silakan minta PIN kepada asesor untuk memulai ujian');
                                                        }}
                                                    >
                                                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2-10V7a2 2 0 01-2 2H9a2 2 0 01-2-2V4a2 2 0 012-2h8a2 2 0 012 2z" />
                                                        </svg>
                                                        Siap Ujian
                                                    </button>
                                                ) : (
                                                    <span className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md font-semibold text-xs text-gray-500 uppercase tracking-widest">
                                                        {assignment.status === 'inactive' ? 'Tidak Aktif' : !assignment.pin ? 'Menunggu PIN' : 'Belum Waktunya'}
                                                    </span>
                                                )}
                                                <button
                                                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    onClick={() => {
                                                        setSelectedAssignment(assignment);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    Detail
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Assignment Detail Modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="4xl">
                {selectedAssignment && (
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Detail Assignment
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Basic Info */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {selectedAssignment.exam?.nama_ujian}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {selectedAssignment.exam?.deskripsi}
                                </p>
                            </div>

                            {/* Assignment Status */}
                            <div className="flex items-center space-x-4">
                                {getStatusBadge(selectedAssignment.status)}
                                {isAssignmentActive(selectedAssignment) && selectedAssignment.pin && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Siap Dikerjakan
                                    </span>
                                )}
                            </div>

                            {/* Assignment Details Grid - PIN DISEMBUNYIKAN */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <div className="flex items-center">
                                        <svg className="h-6 w-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-medium text-blue-900">Status Assignment</p>
                                            <p className="text-lg font-bold text-blue-700">
                                                {selectedAssignment.pin ? 'PIN Tersedia - Siap Ujian' : 'Menunggu PIN dari Asesor'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <div className="flex items-center">
                                        <svg className="h-6 w-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-medium text-green-900">Asesor</p>
                                            <p className="text-lg font-bold text-green-700">{selectedAssignment.asesor?.user?.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                    <div className="flex items-center">
                                        <svg className="h-6 w-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4zm0 0v4a2 2 0 002 2h6a2 2 0 002-2v-4" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-medium text-purple-900">Tanggal Mulai</p>
                                            <p className="text-lg font-bold text-purple-700">{formatDate(selectedAssignment.tanggal_mulai)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                    <div className="flex items-center">
                                        <svg className="h-6 w-6 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-medium text-orange-900">Tanggal Selesai</p>
                                            <p className="text-lg font-bold text-orange-700">{formatDate(selectedAssignment.tanggal_selesai)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Exam Details */}
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">Detail Asesmen:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                        <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <p className="font-medium">Durasi</p>
                                            <p>{selectedAssignment.exam?.durasi_ujian} menit</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                        <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        <div>
                                            <p className="font-medium">Unit</p>
                                            <p>{selectedAssignment.exam?.units?.length || 0} unit kompetensi</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                        <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <div>
                                            <p className="font-medium">Tipe</p>
                                            <p className="capitalize">{selectedAssignment.exam?.tipe_ujian}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

{/* Instructions */}
{selectedAssignment.catatan && (
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Catatan dari Asesor:</h4>
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <p className="text-blue-800">{selectedAssignment.catatan}</p>
                                    </div>
                                </div>
                            )}

                            {/* Important Info */}
                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                <div className="flex items-start">
                                    <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h5 className="font-medium text-yellow-900 mb-1">Informasi Penting:</h5>
                                        <ul className="text-sm text-yellow-800 space-y-1">
                                            <li>• Asesor akan memberikan PIN saat ujian dimulai</li>
                                            <li>• Pastikan koneksi internet stabil selama ujian</li>
                                            <li>• Ujian hanya dapat dimulai dalam rentang waktu yang ditentukan</li>
                                            <li>• Hubungi asesor jika mengalami kendala teknis</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Actions */}
                        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                            >
                                Tutup
                            </button>
                            {isAssignmentActive(selectedAssignment) && selectedAssignment.pin && (
                                <button
                                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
                                    onClick={() => {
                                        setShowModal(false);
                                        alert('Silakan minta PIN kepada asesor untuk memulai ujian');
                                    }}
                                >
                                    <svg className="h-4 w-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2-10V7a2 2 0 01-2 2H9a2 2 0 01-2-2V4a2 2 0 012-2h8a2 2 0 012 2z" />
                                    </svg>
                                    Siap Ujian
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
