<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Data Pribadi & Kepengurusan
            $table->string('nik', 16)->unique()->nullable()->after('email');
            $table->string('phone', 20)->nullable()->after('nik');
            $table->string('position')->nullable()->after('phone')->comment('Jabatan: misal Ketua RT 01');
            $table->enum('role', ['superadmin', 'admin', 'warga'])->default('warga')->after('position');

            // Data Domisili / Alamat
            $table->string('location')->nullable()->after('role')->comment('Perumahan / Wilayah');
            $table->string('block')->nullable()->after('location')->comment('Blok / Nomor Rumah');
            $table->string('rt_rw', 10)->nullable()->after('block')->comment('Contoh: 01/05');
            $table->string('village')->nullable()->after('rt_rw')->comment('Kelurahan');
            $table->string('city')->nullable()->after('village')->comment('Kota / Kabupaten');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Menghapus kolom jika di-rollback
            $table->dropColumn([
                'nik', 
                'phone', 
                'position', 
                'role',
                'location', 
                'block', 
                'rt_rw', 
                'village', 
                'city'
            ]);
        });
    }
};