<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "pacofiestas";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$dni=$_POST['dni'];
$nombre=$_POST['nombre'];
$apellido=$_POST['apellido'];
$fecha=$_POST['fecha'];
$email=$_POST['email'];
$telefono=$_POST['telefono'];
$dni=$_POST['dni'];
$sql = "UPDATE usuarios SET Nombre='$nombre', Apellido='$apellido', FechaNacimiento='$fecha', Email='$email', Telefono='$telefono' WHERE Dni='$dni'";


$result = $conn->query($sql);
$conn->close();
header("Location:perfil.php");

