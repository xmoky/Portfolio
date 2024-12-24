<?php
    function validaMatricula($matricula){
        if(strlen($matricula)!=8){
            return false;
        } 
        $numeros=substr($matricula,0,4);
        if(!is_numeric($numeros)){
            return false;
        }
        $guion=substr($matricula,4,1);
        if($guion != '-'){
            return false;
        }
        $letras=substr($matricula,5);
        if (!preg_match("/^[a-zA-Z]+$/", $letras)) {
            return false;
        }
        return true;
    }

    function validaVacios($valor){
        if(!empty($valor)){
            return true;
        }else{
            return false;
        }
    }

    function escribeFicheros($nombre_fichero,$quescribo){
        if(!$archivo=fopen($nombre_fichero,"a+")){
            die("archivo no encontrado");
        }
        fwrite($archivo,$quescribo);
        fclose($archivo);
    }

    function validarFechas($fecha_inicio, $fecha_fin) {
        
        $inicio = new DateTime($fecha_inicio);
        $fin = new DateTime($fecha_fin);
    
        
        if ($inicio < $fin) {
            return true; 
        } else {
            return false; 
        }
    }
?>