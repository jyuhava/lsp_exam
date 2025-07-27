<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Exam extends Model
{
    protected $fillable = [
        'judul',
        'deskripsi',
        'peraturan',
        'status',
        'use_unit_timer',
        'created_by'
    ];

    protected $casts = [
        'use_unit_timer' => 'boolean',
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function units(): HasMany
    {
        return $this->hasMany(Unit::class)->orderBy('urutan');
    }

    /**
     * Get the exam assignments for the exam.
     */
    public function examAssignments()
    {
        return $this->hasMany(ExamAssignment::class);
    }

    /**
     * Get the assessment registrations for the exam.
     */
    public function assessmentRegistrations()
    {
        return $this->hasMany(AssessmentRegistration::class);
    }
}
