<?php
$conexion=new mysqli("localhost","root","root","pacofiestas");
// Verificar la conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
$json = file_get_contents('php://input');

// Decodificar la cadena JSON a un array PHP
$param = json_decode($json, true);
$ID=$param['ID'];
$Oficio=$param['Oficio'];
$Descripcion=$param['Descripcion'];
$Precio=$param['Precio'];
$Observaciones=$param['Observaciones'];
$Zona=$param['Zona'];
$Puntos=$param['Puntos'];
$Disponibilidad=$param['Disponibilidad'];

$data=false;
$consulta=mysqli_query($conexion,"update entretenimiento set Oficio='$Oficio',Descripcion='$Descripcion',Precio='$Precio',Observaciones='$Observaciones',Zona='$Zona',Puntos='$Puntos',Disponibilidad='$Disponibilidad' where ID=$ID");
if(mysqli_affected_rows($conexion)>0){
    $data=true;
}

// Devolver los datos en formato JSON
header('Content-Type: application/json');
echo json_encode($data);

// Cerrar la conexión
$conexion->close();
?>