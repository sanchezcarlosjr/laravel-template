<?php

namespace App\GraphQL\Mutations;

use App\Models\CollaboratorNetwork;
use App\Models\Network;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UpdateNetwork
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        if (isset($args['formation']) && $args['formation'][0]) {
            /** @var UploadedFile $file */
            $file = $args['formation'][0];
            $previousFormationURL = $args['formation_url'];
            $args['formation_url'] = $file->storePublicly('public');
            Storage::delete($previousFormationURL);
            unset($args['formation']);
        }
        $network = Network::find($args['id']);
        $this->createCollaborators($args, $network);
        unset($args["collaborators"]);
        Network::where('id', '=', $args['id'])->update($args);
        return $network;
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
        $network->network_lead_id = null;
        $network->save();
        $network->collaborators->each(function ($key, $value) use ($network) {
            if (isset($key["id"])) {
                CollaboratorNetwork::destroy($key->id);
            }
        });
        foreach ($args["collaborators"] as $collaborator) {
            $collaborator["academic_bodies_network_id"] = $network->id;
            $is_leader = isset($collaborator["is_leader"]) && $collaborator['is_leader'];
            unset($collaborator['is_leader']);
            unset($collaborator["__typename"]);
            $collaboratorNetwork = CollaboratorNetwork::firstOrCreate($collaborator);
            if ($is_leader) {
                $network->network_lead_id = $collaboratorNetwork->id;
                $network->save();
            }
        }
        unset($args["collaborators"]);
    }
}
