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

            // ✅ Legacy / compatibility columns (can be removed later)
            $table->string('department')->nullable();
            $table->string('course')->nullable();

            // ✅ Relational columns
            $table->foreignId('department_id')
                  ->nullable()
                  ->constrained('departments')
                  ->nullOnDelete();

            $table->foreignId('course_id')
                  ->nullable()
                  ->constrained('courses')
                  ->nullOnDelete();

            // ✅ Additional details
            $table->string('year_level')->nullable();
            $table->string('contact_number')->nullable();
            $table->string('adviser')->nullable();
            $table->enum('gender', ['M', 'F', 'O'])->nullable();
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
