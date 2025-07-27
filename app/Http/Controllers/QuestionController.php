<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Unit;
use App\Models\Exam;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($examId, $unitId)
    {
        $exam = Exam::findOrFail($examId);
        $unit = Unit::with('questions')->findOrFail($unitId);
        
        return Inertia::render('ExamBuilder/Questions/Index', [
            'exam' => $exam,
            'unit' => $unit,
            'questions' => $unit->questions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($examId, $unitId)
    {
        $exam = Exam::findOrFail($examId);
        $unit = Unit::findOrFail($unitId);
        
        return Inertia::render('ExamBuilder/Questions/Create', [
            'exam' => $exam,
            'unit' => $unit
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $examId, $unitId)
    {
        $request->validate([
            'nama_soal' => 'required|string|max:255',
            'soal' => 'required|string',
            'lembar_jawaban' => 'required|string',
            'urutan' => 'required|integer|min:1',
            'has_spreadsheet' => 'nullable|boolean',
            'spreadsheet_data' => 'nullable|string'
        ]);

        $unit = Unit::findOrFail($unitId);

        // Handle urutan logic - shift existing questions if needed
        $existingQuestion = Question::where('unit_id', $unitId)
            ->where('urutan', $request->urutan)
            ->first();

        if ($existingQuestion) {
            Question::where('unit_id', $unitId)
                ->where('urutan', '>=', $request->urutan)
                ->increment('urutan');
        }

        // Determine soal_type based on has_spreadsheet
        $soalType = $request->has_spreadsheet && $request->spreadsheet_data ? 'spreadsheet' : 'rich_text';

        Question::create([
            'unit_id' => $unitId,
            'nama_soal' => $request->nama_soal,
            'soal' => $request->soal,
            'lembar_jawaban' => $request->lembar_jawaban,
            'urutan' => $request->urutan,
            'soal_type' => $soalType,
            'spreadsheet_data' => $request->has_spreadsheet ? $request->spreadsheet_data : null
        ]);

        return redirect()->route('exam.units.questions.index', [$examId, $unitId])
            ->with('success', 'Soal berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show($examId, $unitId, $questionId)
    {
        $exam = Exam::findOrFail($examId);
        $unit = Unit::findOrFail($unitId);
        $question = Question::findOrFail($questionId);
        
        return Inertia::render('ExamBuilder/Questions/Show', [
            'exam' => $exam,
            'unit' => $unit,
            'question' => $question
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($examId, $unitId, $questionId)
    {
        $exam = Exam::findOrFail($examId);
        $unit = Unit::findOrFail($unitId);
        $question = Question::findOrFail($questionId);
        
        return Inertia::render('ExamBuilder/Questions/Edit', [
            'exam' => $exam,
            'unit' => $unit,
            'question' => $question
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $examId, $unitId, $questionId)
    {
        $request->validate([
            'nama_soal' => 'required|string|max:255',
            'soal' => 'required|string',
            'lembar_jawaban' => 'required|string',
            'urutan' => 'required|integer|min:1',
            'has_spreadsheet' => 'nullable|boolean',
            'spreadsheet_data' => 'nullable|string'
        ]);

        $question = Question::findOrFail($questionId);
        $oldUrutan = $question->urutan;

        // Handle urutan logic if changed
        if ($request->urutan != $oldUrutan) {
            if ($request->urutan > $oldUrutan) {
                // Moving down - shift questions between old and new position up
                Question::where('unit_id', $unitId)
                    ->where('urutan', '>', $oldUrutan)
                    ->where('urutan', '<=', $request->urutan)
                    ->decrement('urutan');
            } else {
                // Moving up - shift questions between new and old position down
                Question::where('unit_id', $unitId)
                    ->where('urutan', '>=', $request->urutan)
                    ->where('urutan', '<', $oldUrutan)
                    ->increment('urutan');
            }
        }

        // Determine soal_type based on has_spreadsheet
        $soalType = $request->has_spreadsheet && $request->spreadsheet_data ? 'spreadsheet' : 'rich_text';

        $question->update([
            'nama_soal' => $request->nama_soal,
            'soal' => $request->soal,
            'lembar_jawaban' => $request->lembar_jawaban,
            'urutan' => $request->urutan,
            'soal_type' => $soalType,
            'spreadsheet_data' => $request->has_spreadsheet ? $request->spreadsheet_data : null
        ]);

        return redirect()->route('exam.units.questions.show', [$examId, $unitId, $questionId])
            ->with('success', 'Soal berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($examId, $unitId, $questionId)
    {
        $question = Question::findOrFail($questionId);
        $deletedUrutan = $question->urutan;
        
        $question->delete();

        // Shift remaining questions up
        Question::where('unit_id', $unitId)
            ->where('urutan', '>', $deletedUrutan)
            ->decrement('urutan');

        return redirect()->route('exam.units.questions.index', [$examId, $unitId])
            ->with('success', 'Soal berhasil dihapus.');
    }
}
