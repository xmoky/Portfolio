<?php
require "funciones_resultados.php";
$fecha_inicio = $_POST["fecha_inicio"];
$fecha_fin = $_POST["fecha_fin"];

if ($fecha_inicio > $fecha_fin) {
    die("La fecha inicial debe ser superior a la fecha final.");
}
//publicos
$matriculas_vehiculos_publicos=array() ;
guardaMatriculas($matriculas_vehiculos_publicos , "servicios.txt") ;
guardaMatriculas($matriculas_vehiculos_publicos, "vehiculosEMT.txt");
guardaMatriculas($matriculas_vehiculos_publicos, "taxis.txt");

//matriculas de logistica
$matriculas_logistica=array();
guardaMatriculas($matriculas_logistica , "logistica.txt");

//matriculas de residentes y fecha de inicio
$matriculasyf_residentes=array();
$residentes=fopen("residentesyhoteles.txt","r");
if(!$residentes){
    die("archivo de residentes no encontrado");
}
while(!feof($residentes)){
    $linea=fgets($residentes);
    $apartados=explode(" ",$linea);
    $matriculas_residentes[$apartados[2]]=$apartados[0];//clave hora y valor matricula
}
fclose($residentes);

$vehiculos=fopen("vehiculos.txt","r");
if(!$vehiculos){
    die("error al abrir vehiculos.txt");
}
echo "<h1>VEHICULOS INFRACTORES</h1>";
while(!feof($vehiculos)){
    $linea=fgets($vehiculos);
    $apartados=explode(" ",$linea);
    if($apartados[5]=="electrico"){
        continue;
    }else{
        $hora=new DateTime($apartados[4]);
        $hora->format("H");
        foreach($matriculas_logistica as $valor){
            if($valor==$apartados[0] && ($hora>6 && $hora< 11)){//matricula y hora
                echo $linea."<br>";
            }
        }
    
        $fecha_registro=new DateTime($apartados[3]);
        foreach($matriculasyf_residentes as $clave=> $valor){
            $fecha_inicio_res=new DateTime($clave);
            $fecha_inicio_res->modify("+7days");
            if($valor==$apartados[0] && $fecha_registro>$fecha_inicio_res){
                echo $linea."<br>";
            }
        }
    }
}
fclose($vehiculos);
?>



