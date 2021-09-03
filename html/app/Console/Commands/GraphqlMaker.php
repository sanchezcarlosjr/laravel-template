<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;

class GraphqlMaker extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:graphql {name : Model\'s name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'make graphql contract';

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
        $filesystem = new Filesystem();
        $name = Str::snake(Str::lower($this->argument("name")));
        $path = "graphql/".$name.".graphql";
        $filesystem->ensureDirectoryExists($filesystem->dirname($path));
        $filesystem->copy('graphql/template.graphql', $path);
        shell_exec('chmod -R o+w ' . $path);
        return 0;
    }
}
