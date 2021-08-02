<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class SedCommentCommand extends Command
{
    private $projectPath;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sed:comment {directory} {regex}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comment files of a directory';
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
        $path = $this->projectPath[$this->argument('directory')];
        Sed::commentIn($path, $this->argument('regex'));
        return 0;
    }
}
