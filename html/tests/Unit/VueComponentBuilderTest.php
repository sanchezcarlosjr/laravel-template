<?php


namespace Tests\Unit;

use App\Console\Commands\VueComponentBuilder;

use PHPUnit\Framework\TestCase;
use Illuminate\Filesystem\Filesystem;

class VueComponentBuilderTest extends TestCase
{

    public function test_create_component()
    {
        $filesystem = new Filesystem();
        $vueComponent = new VueComponentBuilder();
        $name = "academic_body_test";
        $vueComponent->cp("$name");
        $path = "resources/js/$name";
        $this->assertTrue($filesystem->isDirectory($path));
        $this->assertTrue($filesystem->isFile($path."/$name.scss"));
        $this->assertTrue($filesystem->isFile($path."/$name.ts"));
        // $filesystem->deleteDirectory($path);
    }
}
