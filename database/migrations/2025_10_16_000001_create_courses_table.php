<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title'); // Course name/title (e.g., BSIT)
            $table->text('description')->nullable(); // More descriptive field for flexibility
            
            // ✅ Relationship: Each course belongs to one department
            $table->unsignedBigInteger('department_id')->nullable();
            $table->foreign('department_id')
                  ->references('id')
                  ->on('departments')
                  ->onDelete('set null'); // Automatically sets department_id to NULL when deleted

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
        Schema::dropIfExists('courses');
    }
}
