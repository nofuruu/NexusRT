<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rumah extends Model
{
    protected $fillable = ['nomor_rumah', 'status'];

    public function histori()
    {
        return $this->hasMany(HistoriRumah::class);
    }

    public function penghuniAktif()
    {
        return $this->hasOne(HistoriRumah::class)->whereNull('tanggal_selesai')->with('penghuni');
    }

    public function pembayaran()
    {
        return $this->hasMany(Pembayaran::class);
    }
}