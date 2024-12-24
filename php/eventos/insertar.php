<?php
$conexion=new mysqli("localhost","root","root","pacofiestas");
// Verificar la conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
$json = file_get_contents('php://input');

// Decodificar la cadena JSON a un array PHP
$param = json_decode($json, true);

$Oficio=$param['Oficio'];
$Descripcion=$param['Descripcion'];
$Precio=$param['Precio'];
$Observaciones=$param['Observaciones'];
$Zona=$param['Zona'];
$Puntos=$param['Puntos'];
$Disponibilidad=$param['Disponibilidad'];

$data=false;
$consulta=mysqli_query($conexion,"insert into entretenimiento (Oficio,Descripcion,Precio,Observaciones,Zona,Puntos,Disponibilidad)
values ('$Oficio','$Descripcion','$Precio','$Observaciones','$Zona','$Puntos','$Disponibilidad')");
if(mysqli_affected_rows($conexion)>0){
    $data=true;
}


echo $data;

// Cerrar la conexión
$conexion->close();
?>