<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListreportStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('listreport_students', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('student_id')->unique();
            $table->string('fullname');
            $table->string('course');
            $table->string('year_level');
            $table->string('status')->default('Active'); // ✅ Persist even after restart
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
        Schema::dropIfExists('listreport_students');
    }
}
