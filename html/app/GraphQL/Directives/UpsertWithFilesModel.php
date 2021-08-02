<?php

namespace App\GraphQL\Directives;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Nuwave\Lighthouse\Execution\Arguments\ArgumentSet;
use Nuwave\Lighthouse\Execution\Arguments\UpsertModel;
use Nuwave\Lighthouse\Support\Contracts\ArgResolver;

class UpsertWithFilesModel extends UpsertModel
{
    /**
     * @var callable|ArgResolver
     */
    private $previous;

    /**
     * @param callable|ArgResolver $previous
     */
    public function __construct(callable $previous)
    {
        parent::__construct($previous);
        $this->previous = $previous;
    }

    /**
     * @param Model $model
     * @param ArgumentSet $args
     */
    public function __invoke($model, $args)
    {
        $model = parent::__invoke($model, $args);
        foreach ($args->arguments as $key => $argument) {
            $itIsAFile = get_class($argument->type) == "Nuwave\Lighthouse\Execution\Arguments\ListType" && $argument->type->type->name == "Upload";
            if ($itIsAFile) {
                $url = $key . "_url";
                $userWantsRemoveFile = $model[$url] != ($args->arguments[$url]->value ?? "");
                if ($userWantsRemoveFile) {
                    Storage::deleteDirectory(dirname($model[$url]));
                    $model[$url] = "";
                }
                if ($argument->value != null) {
                    $model[$url] = $argument->value[0]->storePubliclyAs(
                        $model->generateURL(),
                        $argument->value[0]->getClientOriginalName(),
                        "local"
                    );
                }
            }
        }
        return ($this->previous)($model, $args);
    }
}
