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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('student_id')->nullable();
            $table->string('fullname');
            $table->string('email')->unique();

            // ✅ Department and Course as plain text only (no IDs)
            $table->string('department')->nullable();
            $table->string('course')->nullable();

            // ✅ Extra info fields
            $table->string('year_level')->nullable();
            $table->string('contact_number')->nullable();
            $table->string('adviser')->nullable();
            $table->enum('gender', ['M', 'F', 'O'])->nullable();

            // ✅ Archive status
            $table->boolean('is_archived')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
