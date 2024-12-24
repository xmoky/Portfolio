<?php
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "pacofiestas";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }


    $ID = isset($_POST['ID']) ? $_POST['ID'] : null;

if ($ID !== null) {
    $sql = "DELETE FROM coches WHERE id = '$ID'";

    if ($conn->query($sql) === TRUE) {
        echo "Fila eliminada con éxito";
    } else {
        echo "Error al eliminar fila: " . $conn->error;
    }
} else {
    echo "ID no recibido correctamente en la solicitud.";
}

    $conn->close();
    ?>







