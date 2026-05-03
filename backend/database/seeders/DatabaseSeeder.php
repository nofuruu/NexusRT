<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Akun Admin (Ketua RT)
        User::updateOrCreate(
            ['email' => 'naufal.admin@nexusrt.id'],
            [
                'name' => 'Naufal Fatihul Ihsan',
                'password' => Hash::make('password123'), // Password default
                'nik' => '3573012345678901',
                'phone' => '0812-3456-7890',
                'position' => 'Ketua RT 01',
                'role' => 'admin',
                'location' => 'Perumahan Nexus Indah',
                'block' => 'Blok A1 No. 12',
                'rt_rw' => '01/05',
                'village' => 'Kelurahan Sukamaju',
                'city' => 'Jakarta Selatan'
            ]
        );

        // 2. Akun Warga Biasa (Tanpa perlu role scaffolding)
        User::updateOrCreate(
            ['email' => 'warga@nexusrt.id'],
            [
                'name' => 'Budi Santoso',
                'password' => Hash::make('password123'),
                'nik' => '3573012345678999',
                'phone' => '0811-2222-3333',
                'position' => 'Kepala Keluarga',
                'role' => 'warga', // Role dibedakan di sini
                'location' => 'Perumahan Nexus Indah',
                'block' => 'Blok C3 No. 8',
                'rt_rw' => '01/05',
                'village' => 'Kelurahan Sukamaju',
                'city' => 'Jakarta Selatan'
            ]
        );
    }
}