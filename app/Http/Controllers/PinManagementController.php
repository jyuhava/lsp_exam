<?php

namespace App\Http\Controllers;

use App\Models\ExamAssignment;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PinManagementController extends Controller
{
    public function index()
    {
        // Hanya asesor dan admin yang bisa akses
        if (!in_array(auth()->user()->role, ['asesor', 'user'])) {
            abort(403, 'Unauthorized. Hanya asesor dan admin yang dapat mengakses halaman ini.');
        }

        $assignments = ExamAssignment::with(['exam', 'asesis.user'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('PinManagement/Index', [
            'assignments' => $assignments,
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }

    public function generatePin(ExamAssignment $assignment)
    {
        // Hanya asesor dan admin yang bisa generate PIN
        if (!in_array(auth()->user()->role, ['asesor', 'user'])) {
            abort(403, 'Unauthorized');
        }

        // Generate PIN 6 digit
        $pin = str_pad(random_int(100000, 999999), 6, '0', STR_PAD_LEFT);
        
        $assignment->update([
            'pin' => $pin,
            'pin_generated_at' => now(),
            'pin_generated_by' => auth()->id()
        ]);

        return redirect()->back()->with('success', 'PIN berhasil di-generate: ' . $pin);
    }

    public function regeneratePin(ExamAssignment $assignment)
    {
        // Hanya asesor dan admin yang bisa regenerate PIN
        if (!in_array(auth()->user()->role, ['asesor', 'user'])) {
            abort(403, 'Unauthorized');
        }

        // Generate PIN baru
        $pin = str_pad(random_int(100000, 999999), 6, '0', STR_PAD_LEFT);
        
        $assignment->update([
            'pin' => $pin,
            'pin_generated_at' => now(),
            'pin_generated_by' => auth()->id()
        ]);

        return redirect()->back()->with('success', 'PIN berhasil di-regenerate: ' . $pin);
    }

    public function show(ExamAssignment $assignment)
    {
        // Hanya asesor dan admin yang bisa lihat detail PIN
        if (!in_array(auth()->user()->role, ['asesor', 'user'])) {
            abort(403, 'Unauthorized');
        }

        $assignment->load(['exam.units', 'asesis.user']);

        return Inertia::render('PinManagement/Show', [
            'assignment' => $assignment
        ]);
    }
}
