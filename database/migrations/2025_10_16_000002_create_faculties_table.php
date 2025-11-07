<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('faculties', function (Blueprint $table) {
            $table->id();
            $table->string('fullname');
            $table->string('email')->unique();

            // ✅ We removed department_id and kept department as string
            $table->string('department');

            $table->string('position');
            $table->enum('gender', ['M', 'F']);
            $table->string('employee_id')->nullable();
            $table->string('contact_number');
            $table->boolean('is_archived')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('faculties');
    }
};
