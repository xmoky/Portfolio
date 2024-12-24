<?php
$conexion=new mysqli("localhost","root","root","pacofiestas");
// Verificar la conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$consulta=mysqli_query($conexion,"show columns from entretenimiento like 'oficio'");
$respuesta="";
while($resp=mysqli_fetch_assoc($consulta)){
    $respuesta=$resp['Type'];
}

echo $respuesta;


// Cerrar la conexión
$conexion->close();
?>