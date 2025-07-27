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
        Schema::create('exam_assignment_asesis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_assignment_id')->constrained()->onDelete('cascade');
            $table->foreignId('asesi_id')->constrained('asesis')->onDelete('cascade');
            $table->enum('status', ['assigned', 'started', 'completed', 'expired'])->default('assigned');
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->decimal('score', 5, 2)->nullable();
            $table->text('catatan_asesor')->nullable();
            $table->timestamps();
            
            // Unique constraint to prevent duplicate assignments
            $table->unique(['exam_assignment_id', 'asesi_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_assignment_asesis');
    }
};
