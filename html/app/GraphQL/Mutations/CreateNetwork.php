<?php

namespace App\GraphQL\Mutations;

use App\Models\CollaboratorNetwork;
use App\Models\Network;
use Illuminate\Http\UploadedFile;

class CreateNetwork
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        $args = $this->uploadFormation($args);
        $network = Network::create($args);
        $this->createCollaborators($args, $network);
        return $network;
    }

    /**
     * @param array $args
     * @return array
     */
    public function uploadFormation(array $args): array
    {
        if (isset($args['formation']) && $args['formation'][0]) {
            /** @var UploadedFile $file */
            $file = $args['formation'][0];
            $args['formation_url'] = $file->storePublicly('public');
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
            $collaborator["academic_bodies_network_id"] = $network->id;
            $is_leader = isset($collaborator["is_leader"]) && $collaborator['is_leader'];
            unset($collaborator['is_leader']);
            $collaborator = CollaboratorNetwork::firstOrCreate($collaborator);
            if ($is_leader) {
                $network->network_lead_id = $collaborator->id;
                $network->save();
            }
        }
    }
}
