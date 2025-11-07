<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIsArchivedToFacultiesTable extends Migration
{
    /**
     * This migration is now redundant.
     * `is_archived` already exists in the main faculties table creation.
     *
     * @return void
     */
    public function up()
    {
        // Check first to avoid duplicate-column error
        Schema::table('faculties', function (Blueprint $table) {
            if (!Schema::hasColumn('faculties', 'is_archived')) {
                $table->boolean('is_archived')->default(false)->after('gender');
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('faculties', function (Blueprint $table) {
            if (Schema::hasColumn('faculties', 'is_archived')) {
                $table->dropColumn('is_archived');
            }
        });
    }
}
