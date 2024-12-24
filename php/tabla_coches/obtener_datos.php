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

$sql = "SELECT id, Matricula, Marca, Modelo, PrecioHora, NumPlazas, Opciones, Zona, Disponibilidad, Puntos FROM coches";
$result = $conn->query($sql);

$rows = array();

if ($result->num_rows > 0) {
    // Salida de datos por cada fila
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
}

$conn->close();

// Convertir el array a formato JSON y enviarlo como respuesta
echo json_encode($rows);
?>



