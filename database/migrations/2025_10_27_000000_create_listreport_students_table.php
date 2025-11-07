<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('listreport_students', function (Blueprint $table) {
            $table->id();
            $table->string('student_id')->unique();
            $table->string('fullname');
            $table->string('course');
            $table->string('year_level');
            $table->string('status')->default('Active'); // ✅ Persist even after restart
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('listreport_students');
    }
};
