<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->bigIncrements('id');
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
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
