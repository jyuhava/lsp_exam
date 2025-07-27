import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';

export default function AvailableExams({ auth, exams, asesi }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedExam, setSelectedExam] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const filteredExams = exams.filter(exam =>
        (exam.judul?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (exam.deskripsi?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Asesmen Tersedia</h2>}
        >
            <Head title="Daftar Asesmen" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Selamat datang, {asesi.nama_lengkap}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Pilih asesmen yang ingin Anda ikuti dan daftarkan diri Anda.
                                    </p>
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
                                        placeholder="Cari asesmen..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Exams Grid */}
                    {filteredExams.length === 0 ? (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada asesmen tersedia</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {searchTerm ? 'Tidak ada asesmen yang sesuai dengan pencarian Anda.' : 'Belum ada asesmen yang tersedia untuk didaftarkan.'}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredExams.map((exam) => (
                                <div key={exam.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md transition-shadow duration-200">
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-medium text-gray-900 truncate">
                                                {exam.judul}
                                            </h3>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Tersedia
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                            {exam.deskripsi}
                                        </p>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                                {exam.units?.length || 0} Unit Kompetensi
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Status: {exam.status}
                                            </div>
                                            {exam.use_unit_timer && (
                                                <div className="flex items-center text-sm text-orange-600">
                                                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Timer per Unit
                                                </div>
                                            )}
                                            <div className="flex items-center text-sm text-gray-500">
                                                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 2m8-2l2 2m-2-2v6a2 2 0 01-2 2H10a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H10a2 2 0 00-2 2v.01" />
                                                </svg>
                                                Dibuat: {new Date(exam.created_at).toLocaleDateString('id-ID')}
                                            </div>
                                        </div>

                                        <div className="flex space-x-3">
                                            <Link
                                                href={route('asesi.register-exam', exam.id)}
                                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                            >
                                                Daftar Sekarang
                                            </Link>
                                            <button
                                                type="button"
                                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                                onClick={() => {
                                                    setSelectedExam(exam);
                                                    setShowModal(true);
                                                }}
                                            >
                                                Detail
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Exam Detail Modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="4xl">
                {selectedExam && (
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Detail Asesmen
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
                                    {selectedExam.judul}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {selectedExam.deskripsi}
                                </p>
                            </div>

                            {/* Exam Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <div className="flex items-center">
                                        <svg className="h-6 w-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-medium text-blue-900">Status</p>
                                            <p className="text-lg font-bold text-blue-700 capitalize">{selectedExam.status}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <div className="flex items-center">
                                        <svg className="h-6 w-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-medium text-green-900">Unit Kompetensi</p>
                                            <p className="text-lg font-bold text-green-700">{selectedExam.units?.length || 0} Unit</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                    <div className="flex items-center">
                                        <svg className="h-6 w-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-medium text-purple-900">Timer per Unit</p>
                                            <p className="text-lg font-bold text-purple-700">{selectedExam.use_unit_timer ? 'Ya' : 'Tidak'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Units List */}
                            {selectedExam.units && selectedExam.units.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Unit Kompetensi:</h4>
                                    <div className="space-y-3">
                                        {selectedExam.units.map((unit, index) => (
                                            <div key={unit.id} className="bg-gray-50 p-4 rounded-lg border">
                                                <div className="flex items-start space-x-3">
                                                    <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                                                        {index + 1}
                                                    </span>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <h5 className="font-medium text-gray-900">{unit.kode_unit}</h5>
                                                            {unit.time && (
                                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                    {unit.time} menit
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-600 mt-1">{unit.nama_unit}</p>
                                                        {unit.panduan && (
                                                            <p className="text-xs text-gray-500 mt-2 italic">{unit.panduan}</p>
                                                        )}
                                                        {unit.questions && unit.questions.length > 0 && (
                                                            <p className="text-xs text-blue-600 mt-1">
                                                                {unit.questions.length} soal tersedia
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Additional Info */}
                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                <div className="flex items-start">
                                    <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h5 className="font-medium text-yellow-900 mb-1">Informasi Penting:</h5>
                                        <ul className="text-sm text-yellow-800 space-y-1">
                                            <li>• Pastikan Anda telah mempersiapkan diri dengan baik sebelum mendaftar</li>
                                            <li>• Setelah mendaftar, tunggu persetujuan dari admin</li>
                                            <li>• Asesmen akan dilakukan sesuai jadwal yang telah ditentukan</li>
                                            <li>• Baca panduan setiap unit kompetensi dengan teliti</li>
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
                            <Link
                                href={route('asesi.register-exam', selectedExam.id)}
                                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                Daftar Sekarang
                            </Link>
                        </div>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
