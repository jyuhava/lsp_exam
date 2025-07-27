import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import CKEditor from '@/Components/CKEditor';

export default function Index({ exam, units }) {
    const [expandedUnits, setExpandedUnits] = useState({});
    const [showAddUnit, setShowAddUnit] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [showAddQuestion, setShowAddQuestion] = useState(null);

    // Form untuk unit baru
    const { data: unitData, setData: setUnitData, post: postUnit, processing: processingUnit, errors: unitErrors, reset: resetUnit } = useForm({
        nama_unit: '',
        kode_unit: '',
        deskripsi: '',
        panduan: '',
        urutan: units.length + 1,
        time: '',
    });

    // Form untuk question
    const { data: questionData, setData: setQuestionData, post: postQuestion, put: putQuestion, processing: processingQuestion, errors: questionErrors, reset: resetQuestion } = useForm({
        nama_soal: '',
        soal: '',
        lembar_jawaban: '',
        urutan: 1,
    });

    const toggleUnit = (unitId) => {
        setExpandedUnits(prev => ({
            ...prev,
            [unitId]: !prev[unitId]
        }));
    };

    const handleDeleteUnit = (unitId, namaUnit) => {
        if (confirm(`Apakah Anda yakin ingin menghapus unit "${namaUnit}"?`)) {
            router.delete(route('exam.units.destroy', [exam.id, unitId]));
        }
    };

    const handleDeleteQuestion = (examId, unitId, questionId, namaQuestion) => {
        if (confirm(`Apakah Anda yakin ingin menghapus soal "${namaQuestion}"?`)) {
            router.delete(route('exam.units.questions.destroy', [examId, unitId, questionId]));
        }
    };

    const handleSubmitUnit = (e) => {
        e.preventDefault();
        postUnit(route('exam.units.store', exam.id), {
            onSuccess: () => {
                resetUnit();
                setShowAddUnit(false);
            }
        });
    };

    const handleSubmitQuestion = (e) => {
        e.preventDefault();
        if (editingQuestion) {
            putQuestion(route('exam.units.questions.update', [exam.id, editingQuestion.unit_id, editingQuestion.id]), {
                onSuccess: () => {
                    resetQuestion();
                    setEditingQuestion(null);
                }
            });
        } else {
            postQuestion(route('exam.units.questions.store', [exam.id, showAddQuestion]), {
                onSuccess: () => {
                    resetQuestion();
                    setShowAddQuestion(null);
                }
            });
        }
    };

    const startEditQuestion = (question) => {
        setQuestionData({
            nama_soal: question.nama_soal,
            soal: question.soal,
            lembar_jawaban: question.lembar_jawaban,
            urutan: question.urutan,
        });
        setEditingQuestion(question);
        setShowAddQuestion(null);
    };

    const startAddQuestion = (unitId) => {
        const unit = units.find(u => u.id === unitId);
        setQuestionData({
            nama_soal: '',
            soal: '',
            lembar_jawaban: '',
            urutan: unit.questions.length + 1,
        });
        setShowAddQuestion(unitId);
        setEditingQuestion(null);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Build Exam: {exam.judul}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Kelola unit dan soal dalam satu halaman
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setShowAddUnit(!showAddUnit)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <ion-icon name="add" class="text-lg"></ion-icon>
                            <span>Tambah Unit</span>
                        </button>
                        <Link
                            href={route('exam.show', exam.id)}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <ion-icon name="arrow-back" class="text-lg"></ion-icon>
                            <span>Kembali</span>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Build Exam - ${exam.judul}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Exam Info Card */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-12 w-12">
                                        <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                                            <ion-icon name="document-text" class="text-white text-xl"></ion-icon>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">{exam.judul}</h3>
                                        <p className="text-sm text-gray-600">
                                            Dibuat oleh {exam.creator.name} • {units.length} unit • {units.reduce((total, unit) => total + unit.questions.length, 0)} soal
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-blue-600">{units.length}</div>
                                    <div className="text-sm text-gray-500">Total Unit</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add Unit Form */}
                    {showAddUnit && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 border-l-4 border-indigo-500">
                                <h4 className="text-lg font-medium text-gray-900 mb-4">Tambah Unit Baru</h4>
                                <form onSubmit={handleSubmitUnit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Nama Unit <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={unitData.nama_unit}
                                                onChange={(e) => setUnitData('nama_unit', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Masukkan nama unit"
                                                required
                                            />
                                            {unitErrors.nama_unit && <p className="mt-1 text-sm text-red-600">{unitErrors.nama_unit}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Kode Unit
                                            </label>
                                            <input
                                                type="text"
                                                value={unitData.kode_unit}
                                                onChange={(e) => setUnitData('kode_unit', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Contoh: U001"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Waktu (menit)
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={unitData.time}
                                                onChange={(e) => setUnitData('time', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Contoh: 60"
                                            />
                                            {unitErrors.time && <p className="mt-1 text-sm text-red-600">{unitErrors.time}</p>}
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowAddUnit(false);
                                                resetUnit();
                                            }}
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processingUnit}
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                                        >
                                            {processingUnit ? 'Menyimpan...' : 'Simpan Unit'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Units List */}
                    {units.length > 0 ? (
                        <div className="space-y-4">
                            {units.map((unit) => (
                                <div key={unit.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    {/* Unit Header */}
                                    <div className="p-4 border-b border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <button
                                                    onClick={() => toggleUnit(unit.id)}
                                                    className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
                                                >
                                                    <div className="flex-shrink-0">
                                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                                            <span className="text-indigo-600 font-semibold text-sm">
                                                                {unit.urutan}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <div className="flex items-center space-x-2">
                                                            <h5 className="text-lg font-medium text-gray-900">
                                                                {unit.nama_unit}
                                                            </h5>
                                                            {unit.kode_unit && (
                                                                <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                                                                    {unit.kode_unit}
                                                                </span>
                                                            )}
                                                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                                                                {unit.questions.length} soal
                                                            </span>
                                                            {unit.time && (
                                                                <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                                                                    {unit.time} menit
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <ion-icon 
                                                        name={expandedUnits[unit.id] ? "chevron-up" : "chevron-down"} 
                                                        class="text-gray-400 text-lg"
                                                    ></ion-icon>
                                                </button>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => startAddQuestion(unit.id)}
                                                    className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors duration-200"
                                                    title="Tambah Soal"
                                                >
                                                    <ion-icon name="add-circle" class="text-lg"></ion-icon>
                                                </button>
                                                <Link
                                                    href={route('exam.units.edit', [exam.id, unit.id])}
                                                    className="text-yellow-600 hover:text-yellow-800 p-2 rounded-lg hover:bg-yellow-50 transition-colors duration-200"
                                                    title="Edit Unit"
                                                >
                                                    <ion-icon name="create" class="text-lg"></ion-icon>
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteUnit(unit.id, unit.nama_unit)}
                                                    className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                                                    title="Hapus Unit"
                                                >
                                                    <ion-icon name="trash" class="text-lg"></ion-icon>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Unit Content (Collapsible) */}
                                    {expandedUnits[unit.id] && (
                                        <div className="p-6 bg-gray-50">
                                            {/* Questions List */}
                                            <div className="mb-6">
                                                <h6 className="text-md font-medium text-gray-900 mb-3">Daftar Soal</h6>
                                                {unit.questions.length > 0 ? (
                                                    <div className="space-y-3">
                                                        {unit.questions.map((question) => (
                                                            <div key={question.id} className="bg-white p-4 rounded-lg border border-gray-200">
                                                                <div className="flex items-start justify-between">
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center space-x-2 mb-2">
                                                                            <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                                                                                {question.urutan}
                                                                            </span>
                                                                            <h6 className="font-medium text-gray-900">{question.nama_soal}</h6>
                                                                        </div>
                                                                        <div 
                                                                            className="text-sm text-gray-600 line-clamp-2 rich-text-content"
                                                                            dangerouslySetInnerHTML={{ __html: question.soal }}
                                                                        />
                                                                    </div>
                                                                    <div className="flex items-center space-x-1 ml-4">
                                                                        <button
                                                                            onClick={() => startEditQuestion(question)}
                                                                            className="text-indigo-600 hover:text-indigo-800 p-1 rounded hover:bg-indigo-50"
                                                                            title="Edit Soal"
                                                                        >
                                                                            <ion-icon name="create" class="text-sm"></ion-icon>
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDeleteQuestion(exam.id, unit.id, question.id, question.nama_soal)}
                                                                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                                                                            title="Hapus Soal"
                                                                        >
                                                                            <ion-icon name="trash" class="text-sm"></ion-icon>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-8 text-gray-500">
                                                        <ion-icon name="help-circle-outline" class="text-4xl mb-2"></ion-icon>
                                                        <p>Belum ada soal dalam unit ini</p>
                                                        <button
                                                            onClick={() => startAddQuestion(unit.id)}
                                                            className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                                        >
                                                            Tambah soal pertama
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-12 text-center">
                                <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                                    <ion-icon name="layers-outline" class="text-6xl"></ion-icon>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada unit</h3>
                                <p className="text-gray-500 mb-6">
                                    Mulai dengan menambahkan unit pertama untuk exam ini.
                                </p>
                                <button
                                    onClick={() => setShowAddUnit(true)}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 inline-flex items-center space-x-2"
                                >
                                    <ion-icon name="add" class="text-lg"></ion-icon>
                                    <span>Tambah Unit Pertama</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Question Form Modal */}
                    {(showAddQuestion || editingQuestion) && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h4 className="text-lg font-medium text-gray-900">
                                            {editingQuestion ? 'Edit Soal' : 'Tambah Soal Baru'}
                                        </h4>
                                        <button
                                            onClick={() => {
                                                setShowAddQuestion(null);
                                                setEditingQuestion(null);
                                                resetQuestion();
                                            }}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <ion-icon name="close" class="text-xl"></ion-icon>
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmitQuestion} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Nama Soal <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={questionData.nama_soal}
                                                    onChange={(e) => setQuestionData('nama_soal', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Contoh: Soal Essay Komunikasi"
                                                    required
                                                />
                                                {questionErrors.nama_soal && <p className="mt-1 text-sm text-red-600">{questionErrors.nama_soal}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Urutan <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={questionData.urutan}
                                                    onChange={(e) => setQuestionData('urutan', parseInt(e.target.value) || 1)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* CKEditor Soal */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Soal <span className="text-red-500">*</span>
                                            </label>
                                            <CKEditor
                                                value={questionData.soal}
                                                onChange={(value) => setQuestionData('soal', value)}
                                                placeholder="Masukkan pertanyaan soal..."
                                                style={{ minHeight: '200px' }}
                                            />
                                        </div>

                                        {/* CKEditor Lembar Jawaban */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Lembar Jawaban <span className="text-red-500">*</span>
                                            </label>
                                            <CKEditor
                                                value={questionData.lembar_jawaban}
                                                onChange={(value) => setQuestionData('lembar_jawaban', value)}
                                                placeholder="Masukkan contoh jawaban..."
                                                style={{ minHeight: '200px' }}
                                            />
                                        </div>

                                        <div className="flex justify-end space-x-3">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowAddQuestion(null);
                                                    setEditingQuestion(null);
                                                    resetQuestion();
                                                }}
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg text-sm font-medium"
                                            >
                                                Batal
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={processingQuestion}
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                                            >
                                                {processingQuestion ? 'Menyimpan...' : (editingQuestion ? 'Update Soal' : 'Simpan Soal')}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
