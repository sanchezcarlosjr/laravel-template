<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserGetter extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'list:users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'list users by distinct role for testing purposes';

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
        if (App::environment('production')) {
            $this->error("You cannot execute this command in Production");
            return 1;
        }
        $array = collect([]);
        $users = User::distinct('rol_id')->get()->loadMissing(['employee']);
        foreach ($users as $user) {
            $array->push(['role' => $user->role, 'email' => $user->employee->correo1, 'user' => Str::of($user->employee->correo1)->replace('@uabc.edu.mx', '')]);
        }
        $this->info("Users for testing");
        $this->table(
            ['Role', 'Email', 'User'],
            $array->toArray()
        );
        return 0;
    }
}
