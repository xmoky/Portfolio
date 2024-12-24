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
$id_compra=$_POST['id_compra'];
$dias=$_POST['dias'];
$sql = "UPDATE entretenimiento SET Disponibilidad = DATE_ADD(CURDATE(), INTERVAL $dias DAY) where id='$id_compra'";

$result = $conn->query($sql);
if($conn->affected_rows>0){
    echo "actualizacion exitosa";
}else{
    echo "no se actualizo";
}


$conn->close();