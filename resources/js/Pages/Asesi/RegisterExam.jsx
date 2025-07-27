import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function RegisterExam({ auth, exam, asesi }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        exam_id: exam.id,
        motivation: '',
    });

    const [showConfirmation, setShowConfirmation] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        
        if (!showConfirmation) {
            setShowConfirmation(true);
            return;
        }

        post(route('asesi.register-exam.store'), {
            onSuccess: () => {
                reset('motivation');
            }
        });
    };

    const totalQuestions = exam.units?.reduce((total, unit) => {
        return total + (unit.questions?.length || 0);
    }, 0) || 0;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pendaftaran Asesmen</h2>}
        >
            <Head title="Daftar Asesmen" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Exam Information */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {exam.judul}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {exam.deskripsi}
                                    </p>
                                </div>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    Asesmen
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Status</p>
                                            <p className="text-sm text-gray-600 capitalize">{exam.status}</p>
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
                                            <p className="text-sm text-gray-600">{exam.units?.length || 0} unit</p>
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
                            </div>

                            {/* Units List */}
                            {exam.units && exam.units.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900 mb-3">Unit Kompetensi:</h4>
                                    <div className="space-y-2">
                                        {exam.units.map((unit, index) => (
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

                    {/* Registration Form */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Form Pendaftaran</h3>
                            
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="motivation" value="Motivasi dan Alasan Mengikuti Asesmen *" />
                                    <textarea
                                        id="motivation"
                                        name="motivation"
                                        rows={6}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Jelaskan motivasi dan alasan Anda ingin mengikuti asesmen ini (minimal 50 karakter)..."
                                        value={data.motivation}
                                        onChange={(e) => setData('motivation', e.target.value)}
                                        required
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        {data.motivation.length}/1000 karakter (minimal 50 karakter)
                                    </p>
                                    <InputError message={errors.motivation} className="mt-2" />
                                </div>

                                {!showConfirmation ? (
                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={route('asesi.available-exams')}
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Kembali
                                        </Link>
                                        <PrimaryButton 
                                            className="ml-4" 
                                            disabled={processing || data.motivation.length < 50}
                                        >
                                            Lanjutkan
                                        </PrimaryButton>
                                    </div>
                                ) : (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-yellow-800">
                                                    Konfirmasi Pendaftaran
                                                </h3>
                                                <div className="mt-2 text-sm text-yellow-700">
                                                    <p>
                                                        Anda akan mendaftarkan diri untuk mengikuti asesmen <strong>{exam.judul}</strong>. 
                                                        Setelah mendaftar, Anda perlu menunggu persetujuan dari admin sebelum dapat mengikuti asesmen.
                                                    </p>
                                                </div>
                                                <div className="mt-4 flex space-x-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmation(false)}
                                                        className="text-sm bg-yellow-100 text-yellow-800 hover:bg-yellow-200 px-3 py-1 rounded-md"
                                                    >
                                                        Kembali Edit
                                                    </button>
                                                    <PrimaryButton disabled={processing}>
                                                        {processing ? 'Memproses...' : 'Konfirmasi Pendaftaran'}
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
