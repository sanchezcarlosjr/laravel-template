<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CollaboratorNetwork extends Model
{
    public $timestamps = false;
    use HasFactory;
    protected $table = "colaboradores_redes";
    protected $fillable = ['nombre', 'tipo', "cuerpos_academicos_redes_id"];
    public function network(): BelongsTo
    {
        return $this->belongsTo(Network::class, 'cuerpos_academicos_redes_id');
    }
    public function getIsLeaderAttribute()
    {
        $network = $this->network();
        return $network->get()[0]->leader->id == $this->id;
    }
}
