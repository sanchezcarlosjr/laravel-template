<?php


namespace App\Console\Commands;


use Exception;

class Sed
{
    private $operation = '';

    public function __construct(string $replace, string $regex = "", string $file = "{}")
    {
        if ($regex !== "") {
            $this->operation = "sed -i 's/$regex/$replace/g' $file";
        }
        if ($regex === "") {
            $this->operation = "sed -i -e '\$a$replace' $file";
        }
    }

    static public function commentIn(string $directory, string $regex)
    {
        $sed = new Sed("# $regex", $regex);
        $sed->exec_in($directory);
    }

    public function exec_in(string $directory)
    {
        throw_if($directory === '.', new Exception("Directory cannot be all project"));
        shell_exec("find $directory -type f -exec $this->operation \;");
    }

    static public function uncommentIn(string $directory, string $regex)
    {
        $sed = new Sed($regex, "# $regex");
        $sed->exec_in($directory);
    }

    static public function appendLine(string $file, string $line, string $regex)
    {
        $sed = new Sed("$regex \\n  $line", $regex, $file);
        $sed->exec();
    }

    static public function appendLastLine($file, $line)
    {
        $sed = new Sed($line, "", $file);
        $sed->exec();
    }

    static public function edit(string $file, string $line, string $regex)
    {
        $sed = new Sed($line, $regex, $file);
        $sed->exec();
    }

    static public function interpolate(string $file, string $line)
    {
        $regex = preg_replace("/\*.*\*/", "", $line);
        $replace = preg_replace(["/\*/", "/\*/"], "", $line);
        Sed::edit($file, $replace, $regex);
    }

    public function exec()
    {
        shell_exec($this->operation);
    }
}
