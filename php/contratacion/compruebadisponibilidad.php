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
$datos=$_POST['datos'];
$id_compra=$_POST['id_compra'];
$sql = "SELECT * FROM $datos WHERE disponibilidad < CURDATE() and id like '$id_compra'";
$result = $conn->query($sql);
if($result->num_rows > 0){
    echo "true";
}else{
    echo "false";
}


$conn->close();


?>