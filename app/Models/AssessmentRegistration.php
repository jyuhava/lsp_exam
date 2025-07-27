<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Log;

class AssessmentRegistration extends Model
{
    protected $fillable = [
        'asesi_id',
        'exam_id',
        'registration_number',
        'status',
        'motivation',
        'admin_notes',
        'approved_at',
        'approved_by',
        'rejected_at',
        'rejected_by'
    ];

    protected $casts = [
        'approved_at' => 'datetime',
        'rejected_at' => 'datetime',
    ];

    /**
     * Generate unique registration number
     */
    public static function generateRegistrationNumber(): string
    {
        do {
            $number = 'REG-' . date('Y') . '-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
        } while (self::where('registration_number', $number)->exists());

        return $number;
    }

    /**
     * Relationship with Asesi
     */
    public function asesi(): BelongsTo
    {
        return $this->belongsTo(Asesi::class);
    }

    /**
     * Relationship with Exam
     */
    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    }

    /**
     * Relationship with User who approved
     */
    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    /**
     * Relationship with User who rejected
     */
    public function rejectedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'rejected_by');
    }

    /**
     * Check if registration is pending
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if registration is approved
     */
    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    /**
     * Check if registration is rejected
     */
    public function isRejected(): bool
    {
        return $this->status === 'rejected';
    }

    /**
     * Approve the registration
     */
    public function approve(int $userId): void
    {
        $this->update([
            'status' => 'approved',
            'approved_at' => now(),
            'approved_by' => $userId,
            'rejected_at' => null,
            'rejected_by' => null
        ]);

        // Auto-create assignment when registration is approved
        $this->createAutoAssignment();
    }

    /**
     * Create automatic assignment when registration is approved
     */
    private function createAutoAssignment(): void
    {
        // Get the first available asesor (you might want to implement better logic here)
        $asesor = Asesor::where('status', 'aktif')->first();
        
        if (!$asesor) {
            // If no asesor available, log or handle this case
            Log::warning('No active asesor available for auto-assignment', [
                'registration_id' => $this->id,
                'asesi_id' => $this->asesi_id,
                'exam_id' => $this->exam_id
            ]);
            return;
        }

        // Load exam relationship if not already loaded
        if (!$this->relationLoaded('exam')) {
            $this->load('exam');
        }

        // Create exam assignment
        $assignment = ExamAssignment::create([
            'exam_id' => $this->exam_id,
            'asesor_id' => $asesor->id,
            'judul_assignment' => 'Auto Assignment - ' . $this->exam->judul,
            'deskripsi' => 'Assignment otomatis dibuat dari pendaftaran yang disetujui',
            'tanggal_mulai' => now()->addDay(), // Start tomorrow
            'jam_mulai' => now()->setTime(9, 0), // 9 AM
            'tanggal_selesai' => now()->addDays(7), // End in 7 days
            'jam_selesai' => now()->setTime(17, 0), // 5 PM
            'pin_ujian' => ExamAssignment::generatePin(),
            'status' => 'aktif',
            'durasi_menit' => 120, // Default 2 hours
            'acak_soal' => true,
            'tampilkan_nilai' => true,
            'catatan' => 'Assignment dibuat otomatis dari pendaftaran yang disetujui'
        ]);

        // Assign the asesi to this assignment
        $assignment->asesis()->attach($this->asesi_id, [
            'status' => 'assigned',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }

    /**
     * Reject the registration
     */
    public function reject(int $userId, string $notes = null): void
    {
        $this->update([
            'status' => 'rejected',
            'rejected_at' => now(),
            'rejected_by' => $userId,
            'approved_at' => null,
            'approved_by' => null,
            'admin_notes' => $notes
        ]);
    }
}
