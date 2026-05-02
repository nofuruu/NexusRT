<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    protected $fillable = [
        'rumah_id', 'jenis_iuran', 'bulan', 'tahun', 'jumlah_bayar', 'tanggal_bayar'
    ];

    public function rumah()
    {
        return $this->belongsTo(Rumah::class);
    }
}