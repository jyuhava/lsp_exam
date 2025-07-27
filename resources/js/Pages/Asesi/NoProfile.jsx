import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function NoProfile({ auth, message, createUrl }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profil Asesi Diperlukan
                </h2>
            }
        >
            <Head title="Profil Asesi Diperlukan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-center">
                            <div className="mb-8">
                                <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                Profil Asesi Belum Lengkap
                            </h3>
                            
                            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                {message}
                            </p>
                            
                            <div className="space-y-4">
                                <Link href={createUrl}>
                                    <PrimaryButton className="px-8 py-3">
                                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Lengkapi Profil Asesi
                                    </PrimaryButton>
                                </Link>
                                
                                <div className="text-sm text-gray-500">
                                    atau{' '}
                                    <Link 
                                        href={route('dashboard')} 
                                        className="text-indigo-600 hover:text-indigo-500 font-medium"
                                    >
                                        kembali ke dashboard
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Info Card */}
                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="flex items-start">
                            <svg className="h-6 w-6 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h4 className="text-lg font-medium text-blue-900 mb-2">
                                    Mengapa Profil Asesi Diperlukan?
                                </h4>
                                <ul className="text-blue-800 space-y-1 text-sm">
                                    <li>• Untuk mendaftar pada asesmen kompetensi</li>
                                    <li>• Melihat riwayat pendaftaran dan hasil asesmen</li>
                                    <li>• Mengakses assignment yang diberikan asesor</li>
                                    <li>• Melacak progress pembelajaran dan sertifikasi</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
