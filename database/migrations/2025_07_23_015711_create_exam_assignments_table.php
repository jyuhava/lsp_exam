<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exam_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_id')->constrained()->onDelete('cascade');
            $table->foreignId('asesor_id')->constrained()->onDelete('cascade');
            $table->string('judul_assignment');
            $table->text('deskripsi')->nullable();
            $table->date('tanggal_mulai');
            $table->time('jam_mulai');
            $table->date('tanggal_selesai');
            $table->time('jam_selesai');
            $table->string('pin_ujian', 6)->unique();
            $table->enum('status', ['draft', 'aktif', 'selesai', 'dibatalkan'])->default('draft');
            $table->integer('durasi_menit')->nullable();
            $table->boolean('acak_soal')->default(false);
            $table->boolean('tampilkan_nilai')->default(true);
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_assignments');
    }
};
