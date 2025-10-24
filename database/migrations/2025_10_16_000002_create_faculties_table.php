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
        Schema::create('faculties', function (Blueprint $table) {
            $table->id();
            $table->string('fullname');
            $table->string('email')->unique();

            // ✅ Relationship to departments
            $table->foreignId('department_id')
                  ->nullable()
                  ->constrained('departments')
                  ->nullOnDelete();

            // ✅ Optional legacy column (still here for compatibility)
            $table->string('department')->nullable();

            $table->string('position');
            $table->enum('gender', ['M', 'F'])->default('M');

            // ✅ Added fields (fixes seeder error)
            $table->string('employee_id')->nullable();
            $table->string('contact_number')->nullable();

            // ✅ For archiving support
            $table->boolean('is_archived')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faculties');
    }
};
