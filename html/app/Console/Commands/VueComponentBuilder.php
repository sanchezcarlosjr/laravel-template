<?php

namespace App\Console\Commands;

use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class VueComponentBuilder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:vg {name}';
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
        $name = $this->argument('name');
        $sub_path = strtolower($name);
        $pattern = "/([0-9a-z-]*)?\/$/";
        preg_match($pattern, $sub_path, $matches);
        $file = $matches[1];
        dd($file);
        return 0;
    }

}
