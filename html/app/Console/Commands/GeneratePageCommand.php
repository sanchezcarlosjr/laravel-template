<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;

class GeneratePageCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:siip-page {name} {api-resource} {--module=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make a vue page';
    private $typescriptFile;
    private $vueFile;
    private $noFormSchema;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(): int
    {
        $this->info('Creating page...');
        $path = explode('/', $this->argument('name'));
        $module = end($path);
        $resource = "resources/js/{$this->argument('name')}";
        if (count($path) == 1 && !is_dir("resources/js/{$this->argument('name')}")) {
            shell_exec("mkdir resources/js/{$this->argument('name')} && cp resources/js/academic-bodies/academic-body.module.vue resources/js/{$this->argument('name')}/{$this->argument('name')}.module.vue");
            $resource = "resources/js/{$this->argument('name')}/{$this->argument('name')}";
        }
        shell_exec("cp -r resources/js/@shared/example {$resource}");
        shell_exec("mv {$resource}/example.page.scss {$resource}/{$module}.page.scss");
        $this->typescriptFile = "{$resource}/{$module}.page.ts";
        shell_exec("mv {$resource}/example.page.ts {$this->typescriptFile}");
        $this->vueFile = "{$resource}/index.vue";
        Sed::edit($this->vueFile, $module, "example");
        Sed::edit("{$resource}/{$module}.page.ts", Str::studly($module), "Example");
        $this->appendParameterToSiipTable("What is title of table?", ["Gestión de ", "Todos los "], "tableTitle = \"*{}*\"");
        Sed::interpolate($this->typescriptFile, "apiResource = \"*{$this->argument('api-resource')}*\"");
        $this->appendToolbar();
        $this->appendFields();
        return 0;
    }

    /**
     * @param string $question
     * @param array|callable $choices
     * @param string $line
     */
    private function appendParameterToSiipTable(string $question, $choices, string $line): void
    {
        $field = $this->anticipate($question, $choices);
        $line = str_replace("{}", $field, $line);
        Sed::interpolate($this->typescriptFile, $line);
    }

    private function appendToolbar()
    {
        $toolbar = $this->choice(
            'Which are elements of toolbar?',
            ['', 'add', 'delete', 'archive', 'add-relation', 'update-relation', 'update'],
            0,
            $maxAttempts = null,
            $allowMultipleSelections = true
        );
        $line = implode("\",\"", $toolbar);
        $this->noFormSchema = $line === "";
        if ($this->noFormSchema) {
            Sed::edit($this->typescriptFile, "", "schema = {};");
            Sed::edit($this->vueFile, "", ":schema=\"schema\"");
            return;
        }
        Sed::interpolate($this->typescriptFile, "toolbar = new Set(\[*\"{$line}\"*\])");
    }

    private function appendFields()
    {
        $module = Str::studly(Str::singular($this->argument('api-resource')));
        $schemaGraphQL = "grep -rInl 'type {$module} {' graphql | xargs sed -n '/type {$module} {/,/}/p' | sed '1d;\$d;' |  awk -F ':' '{print $1}'";
        $grep = shell_exec($schemaGraphQL);
        $schema = preg_split('/\s+/', trim($grep));
        $fields = collect();
        $choices = $this->choice(
            'Which fields do you want show?',
            $schema,
            0,
            $maxAttempts = null,
            $allowMultipleSelections = true
        );
        collect($choices)->each(function ($choice) use ($fields) {
            $field = $this->anticipate("What is label of ${choice}?", [$choice]);
            $fields->push("{ key: \"$choice\", label: \"{$field}\", sortable: true }");
        });
        if (!$this->noFormSchema) {
            $fields->push('{ key: "actions", label: "Acciones" }');
        }
        $fieldsToShow = $fields->implode(',\\n');
        Sed::interpolate($this->typescriptFile, "fields = \[*\\n$fieldsToShow\\n*\]");
    }
}
