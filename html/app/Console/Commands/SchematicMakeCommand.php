<?php

namespace App\Console\Commands;

use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class SchematicMakeCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:schematics {module}';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new schematic';
    private $projectPath;
    private $model;
    private $module;
    private $fillableFields;
    /** @var Sed */

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->projectPath = new ProjectPath();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Generating schematics...');
        $this->ensureIfIsAModel();
        $this->appendFillableFields();
        $this->appendRelationships();
        $this->ensureSchema();
        $this->createOperations();
        $this->factory();
        return 0;
    }

    public function ensureIfIsAModel()
    {
        $this->info('Ensuring your module...');
        $this->module = Str::studly(Str::singular($this->argument('module')));
        $this->model = 'App\\Models\\' . $this->module;
        $isNotAEloquentModel = !is_subclass_of($this->model, 'Illuminate\Database\Eloquent\Model');
        throw_if($isNotAEloquentModel, new Exception("Module should be an eloquent model"));
    }

    private function ensureSchema()
    {
        $this->info('Ensure graphql schema');
        $grep = shell_exec("grep -rIn 'type {$this->module} {' graphql");
        if (!$grep) {
            $ls = shell_exec("ls graphql");
            $directories = preg_split('/\s+/', trim($ls));
            $module = Str::kebab($this->module);
            $file = $this->choice(
                'Where would you like to save schema?',
                array_merge(["$module.graphql"], $directories),
                0,
                $maxAttempts = null,
                $allowMultipleSelections = false
            );
            $path = "graphql/$file";
            if (!file_exists($path)) {
                touch($path, strtotime('-1 days'));
                shell_exec("echo '' >> $path");
            }
            Sed::appendLastLine($path, "type {$this->module} \{\\n {$this->toSchema('index')} \\n\}");
            Sed::appendLastLine('graphql/schema.graphql', "#import  {$file}");
        }
    }

    public function createOperations()
    {
        $this->info('Creating operations...');
        $this->addIndex();
        foreach (array("update", "create", "delete") as &$item) {
            $this->addOperation($item);
        }
    }

    private function addIndex()
    {
        $previousLine = "type Query {";
        $module_snake_case = Str::snake(Str::plural($this->argument('module')));
        $line = "$module_snake_case: [$this->module] @paginate(defaultCount: 10)";
        Sed::appendLine($this->projectPath['schema.graphql'], $line, $previousLine);
    }

    /**
     * @param string $operation
     */
    public function addOperation(string $operation): void
    {
        $previousLine = "type Mutation {";
        $operationName = "{$operation}{$this->module}";
        $parameters = $this->toSchema();
        $line = "$operationName($parameters): {$this->module} @$operation";
        Sed::appendLine($this->projectPath['schema.graphql'], $line, $previousLine);
    }

    private function toSchema($operation = ''): string
    {
        if ($operation === 'delete') {
            return 'id: ID!';
        }
        $parameters = $this->fillableFields->map(function ($value) use ($operation) {
            if (preg_match("/date/i", $value)) {
                return "{$value}: Date";
            }
            if (preg_match("/id/i", $value)) {
                return "{$value}: Int";
            }
            if (preg_match("/id/i", $value) && $operation === 'index') {
                list($methodName, $modelName) = $this->generateModelName($value);
                return "$methodName: $modelName";
            }
            return "{$value}: String";
        })->implode('\\n');
        if ($operation === 'index') {
            return $parameters .= "\\n id: ID \\n active: Boolean";
        }
        if ($operation === 'update') {
            return $parameters .= "\\nid: ID!";
        }
        return $parameters;
    }

    private function appendFillableFields(): void
    {
        $this->info('Appending fillable fields...');
        $file = "app/Models/{$this->module}.php";
        $line = "use HasFactory;";
        $instance = new $this->model();
        $columnListing = Schema::getColumnListing($instance->getTable());
        while (count($columnListing) == 0) {
            $tableName = $this->anticipate("What is name of table?", [Str::snake(Str::plural($this->module))]);
            Sed::appendLine($file, "protected \$table = \"{$tableName}\";", $line);
            $columnListing = Schema::getColumnListing($tableName);
        }
        $fillableFields = $this->choice(
            'Which are your fillable fields?',
            array_merge(['default'], $columnListing),
            0,
            $maxAttempts = null,
            $allowMultipleSelections = true
        );
        $columns = '';
        if ($fillableFields[0] === "default") {
            $collection = collect($columnListing);
            $this->fillableFields = $collection->filter(function ($value, $key) {
                return $value !== 'id' and $value !== 'created_at' and $value !== 'updated_at';
            });
            $columns = implode('","', $this->fillableFields->all());
        } else {
            $this->fillableFields = $fillableFields;
            $columns = implode('","', $fillableFields);
        }
        Sed::appendLine($file, "protected \$fillable = [\"{$columns}\"];", $line);
    }

    private function appendRelationships()
    {
        $this->info('Appending relationships...');
        $this->fillableFields->filter(function ($value) {
            return preg_match("/_id/i", $value);
        })->each(function ($key) {
            $file = "app/Models/{$this->module}.php";
            $line = "use HasFactory;";
            list($methodName, $modelName) = $this->generateModelName($key);
            $method = "public function {$methodName}() \\n {\\n return \$this->belongsTo({$modelName}::class, \"{$key}\");\\n}";
            Sed::appendLine($file, $method, $line);
        });
    }

    /**
     * @param $key
     * @return array
     */
    private function generateModelName($key): array
    {
        $methodName = str_replace("_id", "", $key);
        $modelName = Str::studly(Str::singular($methodName));
        return array($methodName, $modelName);
    }

    private function factory()
    {
        $factoryPath = "database/factories/{$this->module}Factory.php";
        $parameters = $this->fillableFields->map(function ($value) {
            if (preg_match("/date/i", $value)) {
                return "\"{$value}\" =>  \$this->faker->date ,";
            }
            if (preg_match("/employee_id/i", $value)) {
                return "";
            }
            if (preg_match("/id/i", $value)) {
                return "\"{$value}\" =>  \$this->faker->numberBetween(\$min = 1, \$max = 10),";
            }
            return "\"{$value}\" => \$this->faker->name,";
        })->implode('\\n');
        Sed::edit($factoryPath, $parameters, '\/\/');
        $line = "{$this->module}::factory()->create();";
        Sed::appendLine('database/seeders/DatabaseSeeder.php', $line, "Network::factory(200)->create();");
        $import = "use App\\\Models\\\{$this->module};";
        Sed::appendLine('database/seeders/DatabaseSeeder.php', $import, "AcademicBody;");
    }
}
