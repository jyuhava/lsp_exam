<?php

namespace App\Http\Controllers;

use App\Models\ExamAssignment;
use App\Models\Exam;
use App\Models\Asesor;
use App\Models\Asesi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class ExamAssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $assignments = ExamAssignment::with(['exam', 'asesor.user', 'asesis'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('ExamAssignment/Index', [
            'assignments' => $assignments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $exams = Exam::select('id', 'judul')->get();
        $asesors = Asesor::with('user:id,name')->get();
        $asesis = Asesi::with('user:id,name')->get();

        return Inertia::render('ExamAssignment/Create', [
            'exams' => $exams,
            'asesors' => $asesors,
            'asesis' => $asesis
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'exam_id' => 'required|exists:exams,id',
            'asesor_id' => 'required|exists:asesors,id',
            'judul_assignment' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'tanggal_mulai' => 'required|date',
            'jam_mulai' => 'required|date_format:H:i',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'jam_selesai' => 'required|date_format:H:i',
            'durasi_menit' => 'nullable|integer|min:1',
            'acak_soal' => 'boolean',
            'tampilkan_nilai' => 'boolean',
            'catatan' => 'nullable|string',
            'asesi_ids' => 'required|array|min:1',
            'asesi_ids.*' => 'exists:asesis,id'
        ]);

        // Generate unique PIN
        $validated['pin_ujian'] = ExamAssignment::generatePin();

        // Create assignment
        $assignment = ExamAssignment::create($validated);

        // Attach asesis to assignment
        $assignment->asesis()->attach($validated['asesi_ids'], [
            'status' => 'assigned',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        return Redirect::route('exam-assignment.index')
            ->with('success', 'Assignment ujian berhasil dibuat!');
    }

    /**
     * Display the specified resource.
     */
    public function show(ExamAssignment $examAssignment)
    {
        $assignment = $examAssignment->load([
            'exam.units.questions',
            'asesor.user',
            'asesis.user'
        ]);

        return Inertia::render('ExamAssignment/Show', [
            'assignment' => $assignment
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ExamAssignment $examAssignment)
    {
        $assignment = $examAssignment->load(['asesis']);
        $exams = Exam::select('id', 'judul')->get();
        $asesors = Asesor::with('user:id,name')->get();
        $asesis = Asesi::with('user:id,name')->get();

        return Inertia::render('ExamAssignment/Edit', [
            'assignment' => $assignment,
            'exams' => $exams,
            'asesors' => $asesors,
            'asesis' => $asesis
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ExamAssignment $examAssignment)
    {
        $validated = $request->validate([
            'exam_id' => 'required|exists:exams,id',
            'asesor_id' => 'required|exists:asesors,id',
            'judul_assignment' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'tanggal_mulai' => 'required|date',
            'jam_mulai' => 'required|date_format:H:i',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'jam_selesai' => 'required|date_format:H:i',
            'status' => 'required|in:draft,aktif,selesai,dibatalkan',
            'durasi_menit' => 'nullable|integer|min:1',
            'acak_soal' => 'boolean',
            'tampilkan_nilai' => 'boolean',
            'catatan' => 'nullable|string',
            'asesi_ids' => 'required|array|min:1',
            'asesi_ids.*' => 'exists:asesis,id'
        ]);

        // Update assignment
        $examAssignment->update($validated);

        // Sync asesis
        $examAssignment->asesis()->sync($validated['asesi_ids']);

        return Redirect::route('exam-assignment.index')
            ->with('success', 'Assignment ujian berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExamAssignment $examAssignment)
    {
        $examAssignment->delete();

        return Redirect::route('exam-assignment.index')
            ->with('success', 'Assignment ujian berhasil dihapus!');
    }

    /**
     * Activate assignment
     */
    public function activate(ExamAssignment $examAssignment)
    {
        $examAssignment->update(['status' => 'aktif']);

        return Redirect::back()
            ->with('success', 'Assignment ujian berhasil diaktifkan!');
    }

    /**
     * Deactivate assignment
     */
    public function deactivate(ExamAssignment $examAssignment)
    {
        $examAssignment->update(['status' => 'draft']);

        return Redirect::back()
            ->with('success', 'Assignment ujian berhasil dinonaktifkan!');
    }

    /**
     * Generate new PIN
     */
    public function regeneratePin(ExamAssignment $examAssignment)
    {
        $newPin = ExamAssignment::generatePin();
        $examAssignment->update(['pin_ujian' => $newPin]);

        return Redirect::back()
            ->with('success', 'PIN ujian berhasil diperbarui!');
    }
}
