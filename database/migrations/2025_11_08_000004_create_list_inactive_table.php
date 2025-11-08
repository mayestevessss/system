<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListInactiveTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('list_inactive', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('student_id')->nullable();
            $table->string('fullname');
            $table->string('course')->nullable();
            $table->string('year_level')->nullable();
            $table->string('status')->default('Inactive');
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
        Schema::dropIfExists('list_inactive');
    }
}


