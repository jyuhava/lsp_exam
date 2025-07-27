<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'unit_id',
        'nama_soal',
        'soal',
        'lembar_jawaban',
        'urutan',
        'soal_type',
        'spreadsheet_data',
    ];

    protected $casts = [
        'spreadsheet_data' => 'array',
    ];

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }
}
