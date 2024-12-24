<?php
require "funciones.php";

    $matricula = isset($_POST['matricula']) ? $_POST['matricula'] : "";
    $matricula=strtoupper($matricula);
    $localizacion = isset($_POST['localizacion']) ? $_POST['localizacion'] : "";
    $nombre_taxista = isset($_POST['nombre_taxista']) ? $_POST['nombre_taxista'] : "";
    $servicio = isset($_POST['servicio']) ? $_POST['servicio'] : "";
    $residentesyhoteles = isset($_POST['residentesyhoteles']) ? $_POST['residentesyhoteles'] : "";
    $fecha_inicio = isset($_POST['fecha_inicio']) ? $_POST['fecha_inicio'] : "";
    $fecha_fin = isset($_POST['fecha_fin']) ? $_POST['fecha_fin'] : "";
    $compania = isset($_POST['compania']) ? $_POST['compania'] : "";


    $opcion=$_GET['opcion'];
    $formulario='<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="estilos.css">
        <title>inicio</title>
    </head>
    <body>
    <h1>GESTION DE VEHICULOS</h1>
    <form action="valida.php?opcion='.$opcion.'" method="post">';
    $todoOK=true;
    if( validaMatricula($matricula)==false){
        $formulario.= "<input type='text' name='matricula' placeholder='Introduce matricula'>";
        $todoOK=false;
    }else{
        $formulario.= "<input type='text' name='matricula' value=\"$matricula\">";
    }
    
    if($opcion=='emt' && validaVacios($localizacion)==false){
        $formulario.='<input type="text" name="localizacion" placeholder="Introduce la localización">';
        $todoOK=false;
    }else if($opcion=='emt' && validaVacios($localizacion)==true){
        $formulario.= "<input type='text' name='localizacion' value=\"$localizacion\">";
    }

    if($opcion=='taxis' && validaVacios($nombre_taxista)==false){
        $formulario.='<input type="text" name="nombre_taxista" placeholder="Introduce tu nombre de taxista">';
        $todoOK=false;
    }else if($opcion=='taxis' && validaVacios($nombre_taxista)==true){
        $formulario.= "<input type='text' name='nombre_taxista' value=\"$nombre_taxista\">";
    } 
    if($opcion=='servicios' && validaVacios($servicio)==false){
        $formulario.='<input type="text" name="servicio" placeholder="Introduce tu servicio">';
        $todoOK=false;
    }else if($opcion=='servicios' && validaVacios($servicio)==true){
        $formulario.= "<input type='text' name='servicio' value=\"$servicio\">";
    }
    if($opcion=='residentesyhoteles' && (validaVacios($residentesyhoteles)==false || validaVacios($fecha_inicio)==false || validaVacios($fecha_fin)==false || validarFechas($fecha_inicio,$fecha_fin)==false)){
        $formulario.='<input type="text" name="residentesyhoteles" placeholder="Introduce tu direccion">
        <input type="date" name="fecha_inicio" placeholder="Introduce la fecha de inicio">
        <input type="date" name="fecha_fin" placeholder="Introduce la fecha de fin">';
        $todoOK=false;
    }else if($opcion=='residentesyhoteles' && (validaVacios($residentesyhoteles)==true || validaVacios($fecha_inicio)==true || validaVacios($fecha_fin)==true || validarFechas($fecha_inicio,$fecha_fin)==true)){
        $formulario.='<input type="text" name="residentesyhoteles" placeholder="Introduce tu direccion">
        <input type="date" name="fecha_inicio" placeholder="Introduce la fecha de inicio">
        <input type="date" name="fecha_fin" placeholder="Introduce la fecha de fin">';
    }
    if($opcion=='logistica' && validaVacios($compania)==false ){
        $formulario.= '<input type="text" name="compania" placeholder="Introduce tu compañia">';
        $todoOK=false;
    }else if($opcion=='logistica' && validaVacios($compania)==true ){
        $formulario.= "<input type='text' name='compania' value=\"$compania\">";
    }
    $formulario.= '<button type="submit">Enviar</button>
    </form>
</body>
</html>';

if($todoOK==true){
    echo "Formulario registrado correctamente";
    switch($opcion){
        case 'emt':
            escribeFicheros("vehiculosEMT.txt","$matricula $localizacion\n");
        case 'taxis':
            escribeFicheros("taxis.txt","$matricula $nombre_taxista\n");
        case 'servicios';
            escribeFicheros("servicios.txt","$matricula $servicio\n");
        case 'residentesyhoteles';
            escribeFicheros("residentesyhoteles.txt","$matricula $residentesyhoteles $fecha_inicio $fecha_fin\n");
        case 'logistica';
            escribeFicheros("logistica.txt","$matricula $compania\n");
        }
}else{
    echo $formulario;
}
?>