<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AsesorController;
use App\Http\Controllers\AsesiController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ExamAssignmentController;
use App\Http\Controllers\AssessmentRegistrationController;
use App\Http\Controllers\PinManagementController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Image upload route for CKEditor
    Route::post('/upload-image', [App\Http\Controllers\ImageUploadController::class, 'upload'])->name('upload.image');
    
    // Personal Data Routes
    Route::resource('asesor', AsesorController::class);
    Route::resource('asesi', AsesiController::class);
    
    // Exam Builder Routes
    Route::resource('exam', ExamController::class);
    
    // Unit Routes (nested under exam)
    Route::resource('exam.units', UnitController::class)->except(['index']);
    Route::get('exam/{exam}/build', [UnitController::class, 'index'])->name('exam.units.index');
    
    // Question Routes (nested under exam and unit)
    Route::prefix('exam/{exam}/units/{unit}')->group(function () {
        Route::get('questions', [QuestionController::class, 'index'])->name('exam.units.questions.index');
        Route::get('questions/create', [QuestionController::class, 'create'])->name('exam.units.questions.create');
        Route::post('questions', [QuestionController::class, 'store'])->name('exam.units.questions.store');
        Route::get('questions/{question}', [QuestionController::class, 'show'])->name('exam.units.questions.show');
        Route::get('questions/{question}/edit', [QuestionController::class, 'edit'])->name('exam.units.questions.edit');
        Route::put('questions/{question}', [QuestionController::class, 'update'])->name('exam.units.questions.update');
        Route::delete('questions/{question}', [QuestionController::class, 'destroy'])->name('exam.units.questions.destroy');
    });
    
    // Exam Assignment Routes
    Route::resource('exam-assignment', ExamAssignmentController::class);
    Route::patch('/exam-assignment/{examAssignment}/activate', [ExamAssignmentController::class, 'activate'])->name('exam-assignment.activate');
    Route::patch('/exam-assignment/{examAssignment}/deactivate', [ExamAssignmentController::class, 'deactivate'])->name('exam-assignment.deactivate');
    Route::patch('/exam-assignment/{examAssignment}/regenerate-pin', [ExamAssignmentController::class, 'regeneratePin'])->name('exam-assignment.regenerate-pin');
    
    // Assessment Registration Routes
    // Asesi Account routes
    Route::get('asesi-account/available-exams', [AssessmentRegistrationController::class, 'availableExams'])->name('asesi.available-exams');
    Route::get('asesi-account/register-exam/{exam}', [AssessmentRegistrationController::class, 'showRegistrationForm'])->name('asesi.register-exam');
    Route::post('asesi-account/register-exam', [AssessmentRegistrationController::class, 'store'])->name('asesi.register-exam.store');
    Route::get('asesi-account/my-registrations', [AssessmentRegistrationController::class, 'myRegistrations'])->name('asesi.registrations');
    Route::get('asesi-account/my-assignments', [AssessmentRegistrationController::class, 'myAssignments'])->name('asesi.assignments');
    Route::patch('asesi-account/cancel-registration/{assessmentRegistration}', [AssessmentRegistrationController::class, 'cancel'])->name('asesi.cancel-registration');
    
    // Admin routes
    Route::get('admin/assessment-registrations', [AssessmentRegistrationController::class, 'index'])->name('admin.assessment-registrations.index');
    Route::get('admin/assessment-registrations/{assessmentRegistration}', [AssessmentRegistrationController::class, 'show'])->name('admin.assessment-registrations.show');
    Route::patch('admin/assessment-registrations/{assessmentRegistration}/approve', [AssessmentRegistrationController::class, 'approve'])->name('admin.assessment-registrations.approve');
    Route::patch('admin/assessment-registrations/{assessmentRegistration}/reject', [AssessmentRegistrationController::class, 'reject'])->name('admin.assessment-registrations.reject');
    
    // PIN Management routes (untuk asesor dan admin)
    Route::get('pin-management', [PinManagementController::class, 'index'])->name('pin-management.index');
    Route::get('pin-management/{assignment}', [PinManagementController::class, 'show'])->name('pin-management.show');
    Route::post('pin-management/{assignment}/generate', [PinManagementController::class, 'generatePin'])->name('pin-management.generate');
    Route::post('pin-management/{assignment}/regenerate', [PinManagementController::class, 'regeneratePin'])->name('pin-management.regenerate');
});

require __DIR__.'/auth.php';
