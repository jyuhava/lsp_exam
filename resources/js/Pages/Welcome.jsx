import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const features = [
        {
            name: 'Manajemen Asesor',
            description: 'Kelola data asesor profesional dengan sistem sertifikasi dan bidang keahlian yang komprehensif.',
            icon: 'people',
            color: 'bg-blue-500'
        },
        {
            name: 'Manajemen Asesi',
            description: 'Sistem pengelolaan data peserta assessment dengan tracking progress yang detail.',
            icon: 'person',
            color: 'bg-green-500'
        },
        {
            name: 'Exam Builder',
            description: 'Pembuat soal ujian dengan berbagai format termasuk spreadsheet dan editor canggih.',
            icon: 'document-text',
            color: 'bg-purple-500'
        },
        {
            name: 'Unit Kompetensi',
            description: 'Manajemen unit kompetensi dengan kode unit dan panduan assessment yang terstruktur.',
            icon: 'library',
            color: 'bg-orange-500'
        },
        {
            name: 'Assessment Tools',
            description: 'Alat assessment profesional untuk evaluasi kompetensi berbasis standar LSP.',
            icon: 'clipboard',
            color: 'bg-red-500'
        },
        {
            name: 'Reporting & Analytics',
            description: 'Laporan komprehensif dan analitik untuk monitoring hasil assessment.',
            icon: 'analytics',
            color: 'bg-indigo-500'
        }
    ];

    const benefits = [
        'Proses assessment yang terstandarisasi',
        'Manajemen sertifikasi profesional',
        'Interface yang user-friendly',
        'Sistem pelaporan yang komprehensif',
        'Keamanan data yang terjamin',
        'Skalabilitas untuk berbagai kebutuhan LSP'
    ];

    return (
        <>
            <Head title="LSP Assessment System" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Header */}
                <header className="relative bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                    <ion-icon name="school" class="text-white text-xl"></ion-icon>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">LSP Assessment System</h1>
                                    <p className="text-sm text-gray-600">Lembaga Sertifikasi Profesi</p>
                                </div>
                            </div>
                            
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition duration-200"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
                                        >
                                            Daftar
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative py-20 lg:py-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                                Sistem Assessment
                                <span className="block text-blue-600">Profesional LSP</span>
                            </h2>
                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                                Platform komprehensif untuk mengelola proses assessment, sertifikasi, dan evaluasi kompetensi 
                                sesuai standar Lembaga Sertifikasi Profesi Indonesia.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {!auth.user && (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition duration-200 shadow-lg hover:shadow-xl"
                                        >
                                            Mulai Sekarang
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition duration-200"
                                        >
                                            Masuk ke Sistem
                                        </Link>
                                    </>
                                )}
                                {auth.user && (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        Akses Dashboard
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                Fitur Unggulan Sistem
                            </h3>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Solusi lengkap untuk kebutuhan assessment dan sertifikasi profesional
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition duration-300">
                                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                                        <ion-icon name={feature.icon} class="text-white text-2xl"></ion-icon>
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-900 mb-4">{feature.name}</h4>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                                    Mengapa Memilih LSP Assessment System?
                                </h3>
                                <p className="text-blue-100 text-lg mb-8">
                                    Sistem yang dirancang khusus untuk memenuhi kebutuhan Lembaga Sertifikasi Profesi 
                                    dengan standar kualitas tinggi dan kemudahan penggunaan.
                                </p>
                                <div className="space-y-4">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                                                <ion-icon name="checkmark" class="text-white text-sm"></ion-icon>
                                            </div>
                                            <span className="text-blue-100">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="bg-white rounded-2xl p-8 shadow-2xl">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <ion-icon name="trophy" class="text-white text-3xl"></ion-icon>
                                        </div>
                                        <h4 className="text-2xl font-bold text-gray-900 mb-4">Sertifikasi Profesional</h4>
                                        <p className="text-gray-600 mb-6">
                                            Kelola seluruh proses sertifikasi dari pendaftaran hingga penerbitan sertifikat
                                        </p>
                                        <div className="grid grid-cols-2 gap-4 text-center">
                                            <div>
                                                <div className="text-2xl font-bold text-blue-600">100+</div>
                                                <div className="text-sm text-gray-600">Asesor Aktif</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-green-600">500+</div>
                                                <div className="text-sm text-gray-600">Asesi Terdaftar</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gray-900">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                            Siap Memulai Assessment Profesional?
                        </h3>
                        <p className="text-xl text-gray-300 mb-8">
                            Bergabunglah dengan LSP Assessment System dan tingkatkan kualitas proses sertifikasi Anda
                        </p>
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition duration-200"
                                >
                                    Daftar Gratis
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="bg-transparent hover:bg-white hover:text-gray-900 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg transition duration-200"
                                >
                                    Masuk ke Akun
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="col-span-1 md:col-span-2">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                        <ion-icon name="school" class="text-white text-lg"></ion-icon>
                                    </div>
                                    <span className="text-xl font-bold text-white">LSP Assessment System</span>
                                </div>
                                <p className="text-gray-400 mb-4">
                                    Platform assessment profesional untuk Lembaga Sertifikasi Profesi Indonesia. 
                                    Mengelola proses sertifikasi dengan standar kualitas tinggi.
                                </p>
                            </div>
                            <div>
                                <h5 className="text-white font-semibold mb-4">Fitur Utama</h5>
                                <ul className="space-y-2 text-gray-400">
                                    <li>Manajemen Asesor</li>
                                    <li>Manajemen Asesi</li>
                                    <li>Exam Builder</li>
                                    <li>Unit Kompetensi</li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-white font-semibold mb-4">Dukungan</h5>
                                <ul className="space-y-2 text-gray-400">
                                    <li>Dokumentasi</li>
                                    <li>Tutorial</li>
                                    <li>FAQ</li>
                                    <li>Kontak Support</li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                            <p className="text-gray-400">
                                © 2024 LSP Assessment System. Semua hak dilindungi undang-undang.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
