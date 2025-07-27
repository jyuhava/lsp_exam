<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Asesor extends Model
{
    protected $fillable = [
        'user_id',
        'nip',
        'nama_lengkap',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'alamat',
        'no_telepon',
        'pendidikan_terakhir',
        'bidang_keahlian',
        'sertifikat_asesor',
        'masa_berlaku_sertifikat',
        'status'
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'masa_berlaku_sertifikat' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship with ExamAssignments (One-to-Many)
     */
    public function examAssignments(): HasMany
    {
        return $this->hasMany(ExamAssignment::class);
    }
}
