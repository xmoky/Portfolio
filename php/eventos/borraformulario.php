<?php
$conexion=new mysqli("localhost","root","root","pacofiestas");
// Verificar la conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
$json = file_get_contents('php://input');
$param = json_decode($json, true);
$ID=$param["ID"];

$data=false;
$consulta=mysqli_query($conexion,"delete from entretenimiento where ID=$ID");
if(mysqli_affected_rows($conexion)>0){
    $data=true;
}

// Devolver los datos en formato JSON
header('Content-Type: application/json');
echo $data;

// Cerrar la conexión
$conexion->close();
?>