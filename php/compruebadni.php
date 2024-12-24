<?php

$servername = "localhost";
$username = "root";
$password = "root";
$database = "pacofiestas";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Assuming DNI is sent as a parameter in the POST request
$dni_to_check = $_POST['dni_php'];

// Validate if the DNI already exists in the database
$sqlDNIExistente = "SELECT dni FROM usuarios WHERE dni='$dni_to_check'";
$resultDNIExistente = $conn->query($sqlDNIExistente);

// Prepare response
$response = "false";

if ($resultDNIExistente->num_rows > 0) {
    $response = "true";
}

// Return response
echo $response;

// Close the connection
$conn->close();
?>
