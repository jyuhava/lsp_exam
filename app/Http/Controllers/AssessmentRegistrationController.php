<?php

namespace App\Http\Controllers;

use App\Models\AssessmentRegistration;
use App\Models\Exam;
use App\Models\Asesi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;

class AssessmentRegistrationController extends Controller
{
    /**
     * Display available exams for registration (Asesi view)
     */
    public function availableExams()
    {
        $user = Auth::user();
        $asesi = Asesi::where('user_id', $user->id)->first();
        
        if (!$asesi) {
            return Inertia::render('Asesi/NoProfile', [
                'message' => 'Profil asesi tidak ditemukan. Silakan lengkapi profil asesi Anda terlebih dahulu.',
                'createUrl' => route('asesi.create')
            ]);
        }

        // Get exams that are not yet registered by this asesi
        $registeredExamIds = AssessmentRegistration::where('asesi_id', $asesi->id)
            ->pluck('exam_id')
            ->toArray();

        $availableExams = Exam::whereNotIn('id', $registeredExamIds)
            ->where('status', 'aktif')
            ->with(['units'])
            ->get();

        return Inertia::render('Asesi/AvailableExams', [
            'exams' => $availableExams,
            'asesi' => $asesi
        ]);
    }

    /**
     * Show registration form for specific exam
     */
    public function showRegistrationForm(Exam $exam)
    {
        $user = Auth::user();
        $asesi = Asesi::where('user_id', $user->id)->first();
        
        if (!$asesi) {
            return Inertia::render('Asesi/NoProfile', [
                'message' => 'Profil asesi tidak ditemukan. Silakan lengkapi profil asesi Anda terlebih dahulu.',
                'createUrl' => route('asesi.create')
            ]);
        }

        // Check if already registered
        $existingRegistration = AssessmentRegistration::where('asesi_id', $asesi->id)
            ->where('exam_id', $exam->id)
            ->first();

        if ($existingRegistration) {
            return redirect()->route('asesi.registrations')->with('error', 'Anda sudah mendaftar untuk ujian ini.');
        }

        $exam->load(['units.questions']);

        return Inertia::render('Asesi/RegisterExam', [
            'exam' => $exam,
            'asesi' => $asesi
        ]);
    }

    /**
     * Store registration
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'exam_id' => 'required|exists:exams,id',
            'motivation' => 'required|string|min:50|max:1000'
        ]);

        $user = Auth::user();
        $asesi = Asesi::where('user_id', $user->id)->first();
        
        if (!$asesi) {
            return redirect()->route('asesi.available-exams')->with('error', 'Profil asesi tidak ditemukan.');
        }

        // Check if already registered
        $existingRegistration = AssessmentRegistration::where('asesi_id', $asesi->id)
            ->where('exam_id', $validated['exam_id'])
            ->first();

        if ($existingRegistration) {
            return redirect()->route('asesi.registrations')->with('error', 'Anda sudah mendaftar untuk ujian ini.');
        }

        // Create registration
        AssessmentRegistration::create([
            'asesi_id' => $asesi->id,
            'exam_id' => $validated['exam_id'],
            'registration_number' => AssessmentRegistration::generateRegistrationNumber(),
            'motivation' => $validated['motivation'],
            'status' => 'pending'
        ]);

        return redirect()->route('asesi.registrations')->with('success', 'Pendaftaran berhasil dikirim! Menunggu persetujuan admin.');
    }

    /**
     * Display asesi's registrations
     */
    public function myRegistrations()
    {
        $user = Auth::user();
        $asesi = Asesi::where('user_id', $user->id)->first();
        
        if (!$asesi) {
            return Inertia::render('Asesi/NoProfile', [
                'message' => 'Profil asesi tidak ditemukan. Silakan lengkapi profil asesi Anda terlebih dahulu.',
                'createUrl' => route('asesi.create')
            ]);
        }

        $registrations = AssessmentRegistration::where('asesi_id', $asesi->id)
            ->with(['exam.units', 'approvedBy', 'rejectedBy'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Asesi/MyRegistrations', [
            'registrations' => $registrations,
            'asesi' => $asesi
        ]);
    }

    /**
     * Display asesi's assignments
     */
    public function myAssignments()
    {
        $user = Auth::user();
        $asesi = Asesi::where('user_id', $user->id)->first();
        
        if (!$asesi) {
            return Inertia::render('Asesi/NoProfile', [
                'message' => 'Profil asesi tidak ditemukan. Silakan lengkapi profil asesi Anda terlebih dahulu.',
                'createUrl' => route('asesi.create')
            ]);
        }

        $assignments = $asesi->examAssignments()
            ->with(['exam.units', 'asesor.user'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Asesi/MyAssignments', [
            'assignments' => $assignments,
            'asesi' => $asesi
        ]);
    }

    /**
     * Admin: Display all registrations
     */
    public function index()
    {
        $registrations = AssessmentRegistration::with(['asesi.user', 'exam', 'approvedBy', 'rejectedBy'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/AssessmentRegistrations/Index', [
            'registrations' => $registrations
        ]);
    }

    /**
     * Admin: Show registration details
     */
    public function show(AssessmentRegistration $assessmentRegistration)
    {
        $registration = $assessmentRegistration->load([
            'asesi.user',
            'exam.units.questions',
            'approvedBy',
            'rejectedBy'
        ]);

        return Inertia::render('Admin/AssessmentRegistrations/Show', [
            'registration' => $registration
        ]);
    }

    /**
     * Admin: Approve registration
     */
    public function approve(AssessmentRegistration $assessmentRegistration)
    {
        $assessmentRegistration->approve(Auth::id());

        return redirect()->back()->with('success', 'Pendaftaran berhasil disetujui!');
    }

    /**
     * Admin: Reject registration
     */
    public function reject(Request $request, AssessmentRegistration $assessmentRegistration)
    {
        $validated = $request->validate([
            'admin_notes' => 'nullable|string|max:1000'
        ]);

        $assessmentRegistration->reject(Auth::id(), $validated['admin_notes'] ?? null);

        return redirect()->back()->with('success', 'Pendaftaran berhasil ditolak!');
    }

    /**
     * Cancel registration (by asesi)
     */
    public function cancel(AssessmentRegistration $assessmentRegistration)
    {
        $user = Auth::user();
        $asesi = Asesi::where('user_id', $user->id)->first();
        
        if (!$asesi || $assessmentRegistration->asesi_id !== $asesi->id) {
            return redirect()->back()->with('error', 'Tidak dapat membatalkan pendaftaran ini.');
        }

        if (!$assessmentRegistration->isPending()) {
            return redirect()->back()->with('error', 'Hanya pendaftaran yang masih pending yang dapat dibatalkan.');
        }

        $assessmentRegistration->update(['status' => 'cancelled']);

        return redirect()->back()->with('success', 'Pendaftaran berhasil dibatalkan.');
    }
}
