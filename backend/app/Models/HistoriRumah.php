<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistoriRumah extends Model
{
    protected $table = 'histori_rumahs';
    protected $fillable = ['rumah_id', 'penghuni_id', 'tanggal_mulai', 'tanggal_selesai'];

    public function rumah()
    {
        return $this->belongsTo(Rumah::class);
    }

    public function penghuni()
    {
        return $this->belongsTo(Penghuni::class);
    }
}