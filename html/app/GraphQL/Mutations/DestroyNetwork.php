<?php

namespace App\GraphQL\Mutations;
use App\Models\CollaboratorNetwork;
use App\Models\Network;

class DestroyNetwork
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $network = Network::find($args["id"]);
        $network->network_lead_id = null;
        $network->save();
        $network->collaborators->each(function ($key, $value) use ($network) {
            if (isset($key["id"])) {
                CollaboratorNetwork::destroy($key->id);
            }
        });
        Network::destroy($args["id"]);
        return $network;
    }
}
