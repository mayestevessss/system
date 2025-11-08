<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if (!class_exists('DatabaseSeeder') && class_exists(\Database\Seeders\DatabaseSeeder::class)) {
            class_alias(\Database\Seeders\DatabaseSeeder::class, 'DatabaseSeeder');
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Fix for MySQL index key length error
        Schema::defaultStringLength(191);
    }
}
