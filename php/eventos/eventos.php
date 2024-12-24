<?php
$conexion=new mysqli("localhost","root","root","pacofiestas");
// Verificar la conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
$consulta=mysqli_query($conexion,"select id,descripcion from entretenimiento");
$data=array();
while($datos=mysqli_fetch_assoc($consulta)){
    $data[]=$datos;
}

// Devolver los datos en formato JSON
header('Content-Type: application/json');
echo json_encode($data);

// Cerrar la conexión
$conexion->close();
?>