<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class VueComponentBuilder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'vg {name : component\'s name} {--flat : Create a flat component} {--crud : Read GraphQL and create a CRUD}';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new vue component';

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
    public function handle()
    {
        if ($this->option('flat')) {
            $this->cpFlat($this->argument('name'));
        } else {
            if ($this->option('crud')) {
                $this->createCRUD($this->argument('name'));
            } else {
                $this->cp($this->argument('name'));
            }
        }
        return 0;
    }

    public function cpFlat($to)
    {
        $filesystem = new Filesystem();
        $path = "resources/js/" . $to .".vue";
        $filesystem->copy('resources/etc/example.flat.vue', $path);
        shell_exec('chmod -R o+w ' . $path);
        $name = $filesystem->basename($path);
        shell_exec("sed -i \"s/example.flat.vue/$name/\" $path");
    }

    public function cp($to, $from = 'resources/etc/example')
    {
        $filesystem = new Filesystem();
        $path = "resources/js/" . $to;
        $filesystem->copyDirectory($from, $path);
        shell_exec('chmod -R o+w ' . $path);
        $name = $filesystem->basename($path);
        $filesystem->move($path . "/example.scss", $path . "/" . $name . ".scss");
        $filesystem->move($path . "/example.ts", $path . "/" . $name . ".ts");
        $class = Str::studly($name);
        shell_exec("sed -i \"s/Example/$class/\" \"$path/$name.ts\"");
        shell_exec("sed -i \"s/example/$name/\" \"$path/index.vue\"");
    }

    public function createCRUD($to) {
        $this->cp($to, "resources/etc/crud");
        $repository = $this->ask('What is your repository?');
        $plural = Str::snake(Str::pluralStudly(Str::studly($repository)));
        $path = "resources/js/" . $to;
        $filesystem = new Filesystem();
        $name = $filesystem->basename($path);
        shell_exec("sed -i \"s/SINGULAR/$repository/\" \"$path/$name.ts\"");
        shell_exec("sed -i \"s/PLURAL/$plural/\" \"$path/$name.ts\"");
    }

}
