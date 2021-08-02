<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Network extends Model
{
    protected $table = "academic_bodies_networks";
    use HasFactory;
    protected $fillable = [
        'name',
        "id",
        'type',
        'class',
        'cuerpo_academico_id',
        'range',
        'start_date',
        'formation_url',
        'finish_date',
        'network_lead_id'
    ];
    public function academic_body(): BelongsTo
    {
        return $this->belongsTo(AcademicBody::class, 'cuerpo_academico_id');
    }
    public function leader()
    {
        return $this->hasOne(CollaboratorNetwork::class, "id", "network_lead_id");
    }
    public function collaborators()
    {
        return $this->hasMany(CollaboratorNetwork::class, "academic_bodies_network_id");
    }
}
