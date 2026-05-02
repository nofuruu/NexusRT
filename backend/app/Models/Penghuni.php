<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penghuni extends Model
{
    protected $fillable = [
        'nama_lengkap', 'foto_ktp', 'status_menetap', 'nomor_telepon', 'sudah_menikah'
    ];

    public function historiRumah()
    {
        return $this->hasMany(HistoriRumah::class);
    }
}