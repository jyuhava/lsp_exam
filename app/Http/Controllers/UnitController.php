<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use App\Models\Exam;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Exam $exam)
    {
        $units = $exam->units()->with(['questions' => function($query) {
            $query->orderBy('urutan');
        }])->orderBy('urutan')->get();
        
        return Inertia::render('ExamBuilder/Units/Index', [
            'exam' => $exam->load('creator'),
            'units' => $units
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Exam $exam)
    {
        return Inertia::render('ExamBuilder/Units/Create', [
            'exam' => $exam
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Exam $exam)
    {
        $request->validate([
            'nama_unit' => 'required|string|max:255',
            'kode_unit' => 'nullable|string|max:50',
            'deskripsi' => 'nullable|string',
            'panduan' => 'nullable|string',
            'urutan' => 'required|integer|min:1',
            'time' => 'nullable|integer|min:1',
        ]);

        // Check if urutan already exists, if so, increment others
        $existingUnit = $exam->units()->where('urutan', $request->urutan)->first();
        if ($existingUnit) {
            $exam->units()->where('urutan', '>=', $request->urutan)->increment('urutan');
        }

        Unit::create([
            'nama_unit' => $request->nama_unit,
            'kode_unit' => $request->kode_unit,
            'deskripsi' => $request->deskripsi,
            'panduan' => $request->panduan,
            'urutan' => $request->urutan,
            'time' => $request->time,
            'exam_id' => $exam->id,
        ]);

        return redirect()->route('exam.units.index', $exam)->with('success', 'Unit berhasil dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function show(Exam $exam, Unit $unit)
    {
        return Inertia::render('ExamBuilder/Units/Show', [
            'exam' => $exam,
            'unit' => $unit
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Exam $exam, Unit $unit)
    {
        return Inertia::render('ExamBuilder/Units/Edit', [
            'exam' => $exam,
            'unit' => $unit
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exam $exam, Unit $unit)
    {
        $request->validate([
            'nama_unit' => 'required|string|max:255',
            'kode_unit' => 'nullable|string|max:50',
            'deskripsi' => 'nullable|string',
            'panduan' => 'nullable|string',
            'urutan' => 'required|integer|min:1',
            'time' => 'nullable|integer|min:1',
        ]);

        // Handle urutan changes
        if ($unit->urutan != $request->urutan) {
            if ($request->urutan > $unit->urutan) {
                // Moving down: decrement units between old and new position
                $exam->units()
                    ->where('urutan', '>', $unit->urutan)
                    ->where('urutan', '<=', $request->urutan)
                    ->decrement('urutan');
            } else {
                // Moving up: increment units between new and old position
                $exam->units()
                    ->where('urutan', '>=', $request->urutan)
                    ->where('urutan', '<', $unit->urutan)
                    ->increment('urutan');
            }
        }

        $unit->update([
            'nama_unit' => $request->nama_unit,
            'kode_unit' => $request->kode_unit,
            'deskripsi' => $request->deskripsi,
            'panduan' => $request->panduan,
            'urutan' => $request->urutan,
            'time' => $request->time,
        ]);

        return redirect()->route('exam.units.index', $exam)->with('success', 'Unit berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam, Unit $unit)
    {
        // Decrement urutan for units after the deleted one
        $exam->units()->where('urutan', '>', $unit->urutan)->decrement('urutan');
        
        $unit->delete();

        return redirect()->route('exam.units.index', $exam)->with('success', 'Unit berhasil dihapus');
    }
}
