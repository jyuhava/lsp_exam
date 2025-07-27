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
        Schema::table('exam_assignments', function (Blueprint $table) {
            $table->string('pin', 6)->nullable()->after('catatan');
            $table->timestamp('pin_generated_at')->nullable()->after('pin');
            $table->foreignId('pin_generated_by')->nullable()->constrained('users')->after('pin_generated_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exam_assignments', function (Blueprint $table) {
            $table->dropForeign(['pin_generated_by']);
            $table->dropColumn(['pin', 'pin_generated_at', 'pin_generated_by']);
        });
    }
};
