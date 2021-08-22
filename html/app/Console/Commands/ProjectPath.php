<?php

namespace App\Console\Commands;

use ArrayAccess;

class ProjectPath implements ArrayAccess
{
    private $container;
    public function __construct() {
        $this->container = array(
            "migrations"   => "database/migrations",
            "schema.graphql" => "graphql/schema.graphql"
        );
    }

    public function offsetSet($offset, $value) {
        if (is_null($offset)) {
            $this->container[] = $value;
        } else {
            $this->container[$offset] = $value;
        }
    }

    public function offsetExists($offset) {
        return isset($this->container[$offset]);
    }

    public function offsetUnset($offset) {
        unset($this->container[$offset]);
    }


    // TODO: Implement Levenshtein
    public function offsetGet($offset) {
        return isset($this->container[$offset]) ? $this->container[$offset] : null;
    }
}
