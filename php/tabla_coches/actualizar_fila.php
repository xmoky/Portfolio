<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "pacofiestas";

// Crear conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del cuerpo de la solicitud (POST)
$id = $_POST['id'];
$newData = json_decode($_POST['data'], true);
echo $id;
// Acceder a las claves correctamente
$matricula = $newData['Matricula'];
$marca = $newData['Marca'];
$modelo = $newData['Modelo'];
$precioHora = $newData['PrecioHora'];
$numPlazas = $newData['NumPlazas'];
$zona = $newData['Zona'];
$disponibilidad = $newData['Disponibilidad'];
$opciones = $newData['Opciones'];

// Construir la consulta SQL para actualizar los datos en la tabla Coches
$sql = "UPDATE Coches SET
        Matricula='$matricula',
        Marca='$marca',
        Modelo='$modelo',
        PrecioHora='$precioHora',
        NumPlazas='$numPlazas',
        Zona='$zona',
        Disponibilidad='$disponibilidad',
        Opciones='$opciones'
        WHERE id = '$id'";

// Ejecutar la consulta SQL
if ($conn->query($sql) === TRUE) {
    echo "Datos actualizados con éxito";
} else {
    echo "Error al actualizar datos: " . $conn->error;
}

// Cerrar la conexión a la base de datos
$conn->close();
?>













