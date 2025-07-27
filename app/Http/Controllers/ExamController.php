<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $exams = Exam::with('creator')->paginate(10);
        
        return Inertia::render('ExamBuilder/Index', [
            'exams' => $exams
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('ExamBuilder/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'peraturan' => 'nullable|string',
            'status' => 'required|in:draft,aktif,non_aktif',
            'use_unit_timer' => 'boolean',
        ]);

        Exam::create([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'peraturan' => $request->peraturan,
            'status' => $request->status,
            'use_unit_timer' => $request->boolean('use_unit_timer'),
            'created_by' => Auth::id(),
        ]);

        return redirect()->route('exam.index')->with('success', 'Exam berhasil dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function show(Exam $exam)
    {
        $exam->load('creator');
        
        return Inertia::render('ExamBuilder/Show', [
            'exam' => $exam
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Exam $exam)
    {
        $exam->load('creator');
        
        return Inertia::render('ExamBuilder/Edit', [
            'exam' => $exam
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exam $exam)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'peraturan' => 'nullable|string',
            'status' => 'required|in:draft,aktif,non_aktif',
            'use_unit_timer' => 'boolean',
        ]);

        $exam->update([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'peraturan' => $request->peraturan,
            'status' => $request->status,
            'use_unit_timer' => $request->boolean('use_unit_timer'),
        ]);

        return redirect()->route('exam.index')->with('success', 'Exam berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam)
    {
        $exam->delete();

        return redirect()->route('exam.index')->with('success', 'Exam berhasil dihapus');
    }
}
