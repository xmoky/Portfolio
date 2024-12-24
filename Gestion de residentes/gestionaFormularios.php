<?php
    $opcion=$_POST['tipo'];
    $formulario='<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="estilos.css">
        <title>inicio</title>
    </head>
    <body>
    <div>
    <h1>GESTION DE VEHICULOS</h1>
    <form action="valida.php?opcion='.$opcion.'" method="POST">
    <input type="text" name="matricula" placeholder="Introduce matricula">';
    if($_POST['tipo']=='emt'){
        $formulario.='<input type="text" name="localizacion" placeholder="Introduce la localización">';
    }else if($_POST['tipo']=='taxis'){
        $formulario.='<input type="text" name="nombre_taxista" placeholder="Introduce tu nombre de taxista">';
    }else if($_POST['tipo']=='servicios'){
        $formulario.='<input type="text" name="servicio" placeholder="Introduce tu servicio">';
    }else if($_POST['tipo']== 'residentesyhoteles'){
        $formulario.='<input type="text" name="residentesyhoteles" placeholder="Introduce tu direccion">
        <input type="date" name="fecha_inicio" placeholder="Introduce la fecha de inicio">
        <input type="date" name="fecha_fin" placeholder="Introduce la fecha de fin">';
    }else if($_POST['tipo']== 'logistica'){
        $formulario.= '<input type="text" name="compania" placeholder="Introduce tu compañia">';
    }
    $formulario.= '<br><button type="submit">Enviar</button>
    </form>
    </div>
</body>
</html>';
echo $formulario;
?>