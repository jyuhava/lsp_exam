<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Asesi extends Model
{
    protected $fillable = [
        'user_id',
        'nim',
        'nama_lengkap',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'alamat',
        'no_telepon',
        'program_studi',
        'semester',
        'ipk',
        'instansi_asal',
        'status'
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship with ExamAssignments (Many-to-Many)
     */
    public function examAssignments(): BelongsToMany
    {
        return $this->belongsToMany(ExamAssignment::class, 'exam_assignment_asesis')
                    ->withPivot(['status', 'started_at', 'completed_at', 'score', 'catatan_asesor'])
                    ->withTimestamps();
    }

    /**
     * Get the assessment registrations for the asesi.
     */
    public function assessmentRegistrations()
    {
        return $this->hasMany(AssessmentRegistration::class);
    }
}
