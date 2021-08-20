<?php

namespace App\GraphQL\Mutations;

use App\Models\CollaboratorNetwork;
use App\Models\Network;
use Illuminate\Http\UploadedFile;

class UpsertNetwork
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        $args = $this->uploadFormation($args);
        $network = Network::firstOrCreate([
            'nombre' => $args['nombre'],
            'fecha_inicio' => $args['fecha_inicio'],
            'fecha_fin' => $args['fecha_fin'],
            'rango' => $args['rango'],
            'url_convenio' => $args['url_convenio'],
            'cuerpo_academico_id' => $args['cuerpos_academico_id']
        ]);
        $this->createCollaborators($args, $network);
        return $network;
    }

    /**
     * @param array $args
     * @return array
     */
    public function uploadFormation(array $args): array
    {
        $args['url_convenio'] = null;
        if (isset($args['formation']) && $args['formation'][0]) {
            /** @var UploadedFile $file */
            $file = $args['formation'][0];
            $args['url_convenio'] = $file->storePublicly('public');
        }
        return $args;
    }

    /**
     * @param $args
     * @param $network
     */
    public function createCollaborators($args, $network): void
    {
        if (!isset($args["collaborators"])) {
            return;
        }
        foreach ($args["collaborators"] as $collaborator) {
            if (!isset($collaborator["name"])) {
                return;
            }
            $is_leader = isset($collaborator["is_leader"]) && $collaborator['is_leader'];
            $collaborator = CollaboratorNetwork::firstOrCreate([
                'nombre' => $collaborator['name'],
                'tipo' => $collaborator['type'],
                'cuerpos_academicos_redes_id' => $network->id
            ]);
            if ($is_leader) {
                $network->lider_de_red_id = $collaborator->id;
                $network->save();
            }
        }
    }
}
