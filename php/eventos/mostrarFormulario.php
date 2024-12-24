<?php
$conexion=new mysqli("localhost","root","root","pacofiestas");
// Verificar la conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}
$json = file_get_contents('php://input');

// Decodificar la cadena JSON a un array PHP
$datos = json_decode($json, true);
$opcion=$datos['opcion'];

$consulta=mysqli_query($conexion,"select * from entretenimiento where ID like '$opcion'");
$respuesta=array();
while($resp=mysqli_fetch_assoc($consulta)){
    $respuesta[]=$resp;
}

// Devolver los datos en formato JSON
header('Content-Type: application/json');
echo json_encode($respuesta);

// Cerrar la conexión
$conexion->close();
?>