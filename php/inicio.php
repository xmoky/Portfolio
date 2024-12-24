<?php

// Datos de conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "root";
$database = "pacofiestas";

// Crear una conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Realizar la consulta
$dni_p = $_POST['dni_php'];
$contrasena_p = $_POST['contrasena_php'];

// Obtener la contraseña de la base de datos
$sql = "SELECT dni, contraseña FROM usuarios WHERE dni='$dni_p'";
$result = $conn->query($sql);

$loginCorrecto = false;

if ($result->num_rows > 0) {
    $fila = $result->fetch_assoc();
    $contrasena_db = $fila['contraseña'];

    // Comparar las posiciones de los números en la contraseña de POST con la de la base de datos
    $loginCorrecto = true;
    if($contrasena_p=='***'){
        $loginCorrecto=false;
    }
    for ($i = 0; $i < strlen($contrasena_p); $i++) {
        // Verificar solo si el carácter actual en la contraseña de POST es un número
        if (is_numeric($contrasena_p[$i])) {
            // Comparar solo si el carácter correspondiente en la contraseña de la base de datos no es un asterisco
            if ($contrasena_db[$i] !== '*') {
                if ($contrasena_p[$i] !== $contrasena_db[$i]) {
                    $loginCorrecto = false;
                    break;
                }
            }
        }
    }
}

// Cerrar la conexión
$conn->close();

// Devolver la respuesta al cliente
if ($loginCorrecto) {
    echo "true";
} else {
    echo "false";
}
?>

