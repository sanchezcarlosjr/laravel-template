<?php


namespace Database\Seeders;


trait Csv
{
    public function readCSV($csvFile, $array)
    {
        $file_handle = fopen($csvFile, 'r');
        while (!feof($file_handle)) {
            $line_of_text[] = fgetcsv($file_handle, 0, $array['delimiter']);
        }
        fclose($file_handle);
        $line_of_text = collect($line_of_text);
        $columns = $line_of_text[0];
        $line_of_text->forget(0);
        return  $line_of_text->filter(function($line) {
            return is_array($line);
        })->map(function ($line) use ($columns) {
            return [
                $columns[0] => $line[0],
                $columns[1] => $line[1],
                $columns[2] => $line[2]
            ];
        })->whereNotNull($columns[0]);
    }
}
