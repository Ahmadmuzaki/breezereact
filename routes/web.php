<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WilayahController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('log'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'title' => 'Abyss'
    ]);
});

Route::get('/wilayah', [WilayahController::class, 'index'])->middleware(['auth', 'verified'])->name('wilayah');
Route::post('/wilayah', [WilayahController::class, 'getProvinsi'])->middleware(['auth', 'verified'])->name('get.provinsi');

Route::controller(AboutController::class)->prefix('/about')->group(function () {
    Route::get('/',  'index')->middleware(['auth', 'verified'])->name('about');
    Route::post('/store',  'store')->middleware(['auth', 'verified'])->name('store');
    Route::get('/{id}/edit', 'edit')->middleware(['auth', 'verified'])->name('edit');
    Route::put('/{id}/update', 'update')->middleware(['auth', 'verified'])->name('update');
    Route::delete('/{id}/delete', 'destroy')->middleware(['auth', 'verified'])->name('destroy');
    Route::post('/{id}/person', 'person')->middleware(['auth', 'verified'])->name('person');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
