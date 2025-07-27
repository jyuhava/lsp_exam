<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ExamAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id',
        'asesor_id',
        'judul_assignment',
        'deskripsi',
        'tanggal_mulai',
        'jam_mulai',
        'tanggal_selesai',
        'jam_selesai',
        'pin_ujian',
        'status',
        'durasi_menit',
        'acak_soal',
        'tampilkan_nilai',
        'catatan'
    ];

    protected $casts = [
        'tanggal_mulai' => 'date',
        'tanggal_selesai' => 'date',
        'jam_mulai' => 'datetime:H:i',
        'jam_selesai' => 'datetime:H:i',
        'acak_soal' => 'boolean',
        'tampilkan_nilai' => 'boolean'
    ];

    /**
     * Generate unique PIN for exam
     */
    public static function generatePin()
    {
        do {
            $pin = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        } while (self::where('pin_ujian', $pin)->exists());
        
        return $pin;
    }

    /**
     * Relationship with Exam
     */
    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    }

    /**
     * Relationship with Asesor
     */
    public function asesor(): BelongsTo
    {
        return $this->belongsTo(Asesor::class);
    }

    /**
     * Relationship with Asesis (Many-to-Many)
     */
    public function asesis(): BelongsToMany
    {
        return $this->belongsToMany(Asesi::class, 'exam_assignment_asesis')
                    ->withPivot(['status', 'started_at', 'completed_at', 'score', 'catatan_asesor'])
                    ->withTimestamps();
    }

    /**
     * Get assigned asesis with their status
     */
    public function assignedAsesis()
    {
        return $this->asesis()->wherePivot('status', 'assigned');
    }

    /**
     * Get completed asesis
     */
    public function completedAsesis()
    {
        return $this->asesis()->wherePivot('status', 'completed');
    }

    /**
     * Check if assignment is active
     */
    public function isActive(): bool
    {
        $now = now();
        $startDateTime = $this->tanggal_mulai->format('Y-m-d') . ' ' . $this->jam_mulai->format('H:i:s');
        $endDateTime = $this->tanggal_selesai->format('Y-m-d') . ' ' . $this->jam_selesai->format('H:i:s');
        
        return $this->status === 'aktif' && 
               $now >= $startDateTime && 
               $now <= $endDateTime;
    }

    /**
     * Get completion percentage
     */
    public function getCompletionPercentage(): float
    {
        $totalAsesis = $this->asesis()->count();
        if ($totalAsesis === 0) return 0;
        
        $completedAsesis = $this->completedAsesis()->count();
        return round(($completedAsesis / $totalAsesis) * 100, 2);
    }
}
