<?php

namespace App\GraphQL\Mutations;

use App\Models\Help as HelpModel;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/** TODO: Migrate from Resolver to UpsertWithFilesDirective */
class Help
{
    public function upsert($root, array $args)
    {
        /** Filename → Already exists and wasn't modified, ignore */
        /** Nothing → It was removed in the model, remove */
        /** File → New/Replacement file, */
        $help = HelpModel::firstOrNew(["id" => $args["id"] ?? -1], $args);
        /** Get $record->id */
        $help->save();

        Help::storeFile("release", "release_url", $help, $args);
        Help::storeFile("report", "report_url", $help, $args);

        /** If not new, args have not been saved yet; which we also may have modified on _url */
        $help->fill($args);
        $help->save();

        return $help;
    }

    public static function storeFile($name, $url, &$record, &$args)
    {
        /** Filename corresponds to the one in database? */
        if ($record[$url] != ($args[$url] ?? "")) {
            /** Otherwise delete directory and file */
            Storage::deleteDirectory(dirname($record[$url]));
            $record[$url] = "";
        }

        /** If File exists in args */
        if (isset($args[$name])) {
            /** Save in route */
            $args[$url] = $args[$name][0]->storePubliclyAs(
                Help::generateURL($args["academic_body_id"], $record->id),
                $args[$name][0]->getClientOriginalName(),
                "local"
            );
        }
    }

    public static function generateURL($academic_body_id, $help_id)
    {
        /** Str::random is cryptographically secure */
        return "public/archivos/cuerpos-academicos/" . $academic_body_id . "/apoyos/" . $help_id . "/" . Str::random(40);
    }

    public function delete($root, array $args)
    {
        /** Delete should remove apoyo/x/ directory */
    }
}
