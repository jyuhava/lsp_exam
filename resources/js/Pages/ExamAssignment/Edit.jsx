import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function Edit({ assignment, exams, asesors, asesis }) {
    const [selectedAsesis, setSelectedAsesis] = useState([]);
    
    const { data, setData, put, processing, errors } = useForm({
        exam_id: assignment.exam_id || '',
        asesor_id: assignment.asesor_id || '',
        judul_assignment: assignment.judul_assignment || '',
        deskripsi: assignment.deskripsi || '',
        tanggal_mulai: assignment.tanggal_mulai || '',
        jam_mulai: assignment.jam_mulai || '',
        tanggal_selesai: assignment.tanggal_selesai || '',
        jam_selesai: assignment.jam_selesai || '',
        status: assignment.status || 'draft',
        durasi_menit: assignment.durasi_menit || '',
        acak_soal: assignment.acak_soal || false,
        tampilkan_nilai: assignment.tampilkan_nilai || true,
        catatan: assignment.catatan || '',
        asesi_ids: []
    });

    useEffect(() => {
        // Set selected asesis from assignment
        const assignedAsesiIds = assignment.asesis.map(asesi => asesi.id);
        setSelectedAsesis(assignedAsesiIds);
    }, [assignment]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Update data dengan asesi_ids sebelum submit
        setData('asesi_ids', selectedAsesis);
        
        put(route('exam-assignment.update', assignment.id), {
            ...data,
            asesi_ids: selectedAsesis
        });
    };

    const handleAsesiToggle = (asesiId) => {
        setSelectedAsesis(prev => {
            if (prev.includes(asesiId)) {
                return prev.filter(id => id !== asesiId);
            } else {
                return [...prev, asesiId];
            }
        });
    };

    const handleSelectAllAsesis = () => {
        if (selectedAsesis.length === asesis.length) {
            setSelectedAsesis([]);
        } else {
            setSelectedAsesis(asesis.map(asesi => asesi.id));
        }
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
            <Head title={`Edit Assignment: ${assignment.judul_assignment}`} />

            <div className="py-8">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Link href={route('exam-assignment.show', assignment.id)}>
                                    <SecondaryButton>
                                        <ion-icon name="arrow-back" class="text-lg mr-2"></ion-icon>
                                        Kembali
                                    </SecondaryButton>
                                </Link>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">Edit Assignment</h1>
                                    <p className="mt-2 text-gray-600">Edit assignment ujian</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                {getStatusBadge(assignment.status)}
                                <div className="bg-indigo-50 px-3 py-1 rounded-lg">
                                    <span className="text-sm font-medium text-indigo-700">
                                        PIN: {assignment.pin_ujian}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Form */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Basic Information */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Informasi Dasar</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Exam Selection */}
                                        <div className="md:col-span-2">
                                            <InputLabel htmlFor="exam_id" value="Pilih Ujian" />
                                            <select
                                                id="exam_id"
                                                value={data.exam_id}
                                                onChange={(e) => setData('exam_id', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                            >
                                                <option value="">Pilih ujian...</option>
                                                {exams.map((exam) => (
                                                    <option key={exam.id} value={exam.id}>
                                                        {exam.judul}
                                                    </option>
                                                ))}
                                            </select>
                                            <InputError message={errors.exam_id} className="mt-2" />
                                        </div>

                                        {/* Asesor Selection */}
                                        <div className="md:col-span-2">
                                            <InputLabel htmlFor="asesor_id" value="Pilih Asesor" />
                                            <select
                                                id="asesor_id"
                                                value={data.asesor_id}
                                                onChange={(e) => setData('asesor_id', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                            >
                                                <option value="">Pilih asesor...</option>
                                                {asesors.map((asesor) => (
                                                    <option key={asesor.id} value={asesor.id}>
                                                        {asesor.user.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <InputError message={errors.asesor_id} className="mt-2" />
                                        </div>

                                        {/* Assignment Title */}
                                        <div className="md:col-span-2">
                                            <InputLabel htmlFor="judul_assignment" value="Judul Assignment" />
                                            <TextInput
                                                id="judul_assignment"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.judul_assignment}
                                                onChange={(e) => setData('judul_assignment', e.target.value)}
                                                required
                                                placeholder="Masukkan judul assignment..."
                                            />
                                            <InputError message={errors.judul_assignment} className="mt-2" />
                                        </div>

                                        {/* Status */}
                                        <div className="md:col-span-2">
                                            <InputLabel htmlFor="status" value="Status" />
                                            <select
                                                id="status"
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                            >
                                                <option value="draft">Draft</option>
                                                <option value="aktif">Aktif</option>
                                                <option value="selesai">Selesai</option>
                                                <option value="dibatalkan">Dibatalkan</option>
                                            </select>
                                            <InputError message={errors.status} className="mt-2" />
                                        </div>

                                        {/* Description */}
                                        <div className="md:col-span-2">
                                            <InputLabel htmlFor="deskripsi" value="Deskripsi" />
                                            <textarea
                                                id="deskripsi"
                                                value={data.deskripsi}
                                                onChange={(e) => setData('deskripsi', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                rows="3"
                                                placeholder="Deskripsi assignment (opsional)..."
                                            />
                                            <InputError message={errors.deskripsi} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Schedule */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Jadwal Ujian</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Start Date & Time */}
                                        <div>
                                            <InputLabel htmlFor="tanggal_mulai" value="Tanggal Mulai" />
                                            <TextInput
                                                id="tanggal_mulai"
                                                type="date"
                                                className="mt-1 block w-full"
                                                value={data.tanggal_mulai}
                                                onChange={(e) => setData('tanggal_mulai', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.tanggal_mulai} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="jam_mulai" value="Jam Mulai" />
                                            <TextInput
                                                id="jam_mulai"
                                                type="time"
                                                className="mt-1 block w-full"
                                                value={data.jam_mulai}
                                                onChange={(e) => setData('jam_mulai', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.jam_mulai} className="mt-2" />
                                        </div>

                                        {/* End Date & Time */}
                                        <div>
                                            <InputLabel htmlFor="tanggal_selesai" value="Tanggal Selesai" />
                                            <TextInput
                                                id="tanggal_selesai"
                                                type="date"
                                                className="mt-1 block w-full"
                                                value={data.tanggal_selesai}
                                                onChange={(e) => setData('tanggal_selesai', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.tanggal_selesai} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="jam_selesai" value="Jam Selesai" />
                                            <TextInput
                                                id="jam_selesai"
                                                type="time"
                                                className="mt-1 block w-full"
                                                value={data.jam_selesai}
                                                onChange={(e) => setData('jam_selesai', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.jam_selesai} className="mt-2" />
                                        </div>

                                        {/* Duration */}
                                        <div className="md:col-span-2">
                                            <InputLabel htmlFor="durasi_menit" value="Durasi (Menit)" />
                                            <TextInput
                                                id="durasi_menit"
                                                type="number"
                                                className="mt-1 block w-full"
                                                value={data.durasi_menit}
                                                onChange={(e) => setData('durasi_menit', e.target.value)}
                                                placeholder="Durasi ujian dalam menit (opsional)..."
                                            />
                                            <InputError message={errors.durasi_menit} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Settings */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Pengaturan Ujian</h3>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                id="acak_soal"
                                                type="checkbox"
                                                checked={data.acak_soal}
                                                onChange={(e) => setData('acak_soal', e.target.checked)}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="acak_soal" className="ml-2 block text-sm text-gray-900">
                                                Acak urutan soal
                                            </label>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                id="tampilkan_nilai"
                                                type="checkbox"
                                                checked={data.tampilkan_nilai}
                                                onChange={(e) => setData('tampilkan_nilai', e.target.checked)}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="tampilkan_nilai" className="ml-2 block text-sm text-gray-900">
                                                Tampilkan nilai setelah ujian selesai
                                            </label>
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    <div className="mt-6">
                                        <InputLabel htmlFor="catatan" value="Catatan" />
                                        <textarea
                                            id="catatan"
                                            value={data.catatan}
                                            onChange={(e) => setData('catatan', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            rows="3"
                                            placeholder="Catatan tambahan (opsional)..."
                                        />
                                        <InputError message={errors.catatan} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            {/* Asesi Selection */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Pilih Asesi</h3>
                                        <button
                                            type="button"
                                            onClick={handleSelectAllAsesis}
                                            className="text-sm text-indigo-600 hover:text-indigo-500"
                                        >
                                            {selectedAsesis.length === asesis.length ? 'Batal Semua' : 'Pilih Semua'}
                                        </button>
                                    </div>
                                    
                                    <div className="mb-4 p-3 bg-indigo-50 rounded-lg">
                                        <p className="text-sm text-indigo-700">
                                            <span className="font-medium">{selectedAsesis.length}</span> dari {asesis.length} asesi dipilih
                                        </p>
                                    </div>

                                    <div className="space-y-2 max-h-96 overflow-y-auto">
                                        {asesis.map((asesi) => (
                                            <div
                                                key={asesi.id}
                                                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                                                    selectedAsesis.includes(asesi.id)
                                                        ? 'border-indigo-500 bg-indigo-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                                onClick={() => handleAsesiToggle(asesi.id)}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedAsesis.includes(asesi.id)}
                                                    onChange={() => handleAsesiToggle(asesi.id)}
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                />
                                                <div className="ml-3 flex-1">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {asesi.user.name}
                                                    </p>
                                                    {asesi.nim && (
                                                        <p className="text-xs text-gray-500">
                                                            NIM: {asesi.nim}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <InputError message={errors.asesi_ids} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                            <Link href={route('exam-assignment.show', assignment.id)}>
                                <SecondaryButton>Batal</SecondaryButton>
                            </Link>
                            <PrimaryButton disabled={processing || selectedAsesis.length === 0}>
                                {processing ? 'Menyimpan...' : 'Update Assignment'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
