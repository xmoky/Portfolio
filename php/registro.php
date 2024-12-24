<?php

// datos de conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "root";
$database = "pacofiestas";

// crear una conexión
$conn = new mysqli($servername, $username, $password, $database);

// verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// realizar la consulta
$dni_p = $_POST['dni_php'];
$fecha_p = $_POST['fecha_php'];
$nombre_p = $_POST['nombre_php'];
$apellido_p = $_POST['apellido_php'];
$email_p = $_POST['email_php'];
$contrasena_p = $_POST['contrasena_php'];
$telf_p = $_POST['telf_php'];

$sql = "INSERT INTO `usuarios` (`Dni`, `Nombre`, `Apellido`, `FechaNacimiento`, `Email`, `Contraseña`, `Telefono`, `Puntos`, `Fotografia`) VALUES ('$dni_p', '$nombre_p', '$apellido_p', '$fecha_p', '$email_p', '$contrasena_p', '$telf_p', 0, null)";
$result = $conn->query($sql);

// cerrar la conexión
$conn->close();

// enviar respuesta al cliente
if ($result) {
    echo "true";
} else {
    echo "false";
}

?>


