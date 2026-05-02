<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RumahController;
use App\Http\Controllers\PenghuniController;
use App\Http\Controllers\KeuanganController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    #================================
    #===   MASTER RUMAH ROUTES   ====
    #================================
    Route::apiResource('rumah', RumahController::class);
    Route::post('/rumah/{id}/assign', [RumahController::class, 'assignPenghuni']);
    Route::post('/rumah/{id}/kosongkan', [RumahController::class, 'kosongkanRumah']);

    #===================================
    #===   MASTER PENGHUNI ROUTES   ====
    #===================================
    Route::apiResource('penghuni', PenghuniController::class);

    #===================================
    #===   TRANSACTION ROUTES   ========
    #===================================
    Route::get('/keuangan/pemasukan', [KeuanganController::class, 'indexPemasukan']);
    Route::post('/keuangan/pemasukan', [KeuanganController::class, 'storePemasukan']);

    Route::get('/keuangan/pengeluaran', [KeuanganController::class, 'indexPengeluaran']);
    Route::post('/keuangan/pengeluaran', [KeuanganController::class, 'storePengeluaran']);

    Route::get('/keuangan/laporan-tahunan', [KeuanganController::class, 'getLaporanTahunan']);
});
