<?php

use App\Http\Controllers\NewsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// outer class
Route::get('/', [NewsController::class, 'index']);
Route::get('/news/search/{q}', [NewsController::class, 'search'])->name('search.news');

// user authorized grup
Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(
    function () {
        Route::get('/', function () {
            return Inertia::render('Dashboard/Index');
        })->name('dashboard');
        Route::get('/setting', function () {
            return Inertia::render('Setting');
        })->name('setting');
        Route::get('/news', [NewsController::class, 'show'])->name('my.news');
        Route::post('/news', [NewsController::class, 'store'])->name('create.news');
        Route::get('/news/create', [NewsController::class, 'create'])->name('form.news');
    }
);

require __DIR__ . '/auth.php';
