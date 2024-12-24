<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "pacofiestas";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos del formulario
$matricula = isset($_POST['matricula']) ? $_POST['matricula'] : '';
$marca = isset($_POST['marca']) ? $_POST['marca'] : '';
$modelo = isset($_POST['modelo']) ? $_POST['modelo'] : '';
$precio = isset($_POST['precio']) ? $_POST['precio'] : '';
$plazas = isset($_POST['plazas']) ? $_POST['plazas'] : '';
$zona = isset($_POST['zona']) ? $_POST['zona'] : '';
$disponibilidad = isset($_POST['disponibilidad']) ? $_POST['disponibilidad'] : '';
$opciones = isset($_POST['opciones']) ? $_POST['opciones'] : '';

// Insertar datos en la base de datos
$sql = "INSERT INTO coches (Matricula, Marca, Modelo, PrecioHora, NumPlazas, Zona, Disponibilidad, Opciones)
        VALUES ('$matricula', '$marca', '$modelo', '$precio', '$plazas', '$zona', '$disponibilidad', '$opciones')";

if ($conn->query($sql) === TRUE) {
    echo "Fila guardada con éxito";
} else {
    echo "Error al guardar la fila: " . $conn->error;
}

$conn->close();
?>



