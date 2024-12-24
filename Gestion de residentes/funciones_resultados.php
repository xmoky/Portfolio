<?php
    function guardaMatriculas(&$arreglo, $nombreDelArchivo) {
        $servicios = fopen($nombreDelArchivo, "r");
    
        if ($servicios === false) {
            die("Error al abrir el archivo.");
        }
    
        while (!feof($servicios)) {
            $linea = fgets($servicios);
            $division = explode(" ", $linea);
            $matricula = $division[0]; // Elimina posibles espacios en blanco alrededor de la matrícula
            array_push($arreglo,$matricula);
            
        }
    
        fclose($servicios);
    }
?>