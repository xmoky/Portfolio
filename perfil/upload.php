<?php
$uploadDir = "fotos/";
$uploadedFile = $uploadDir . basename($_FILES["file"]["name"]);

// Verificar si el archivo es una imagen
$imageFileType = strtolower(pathinfo($uploadedFile, PATHINFO_EXTENSION));
if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
    echo json_encode(["error" => "Solo se permiten archivos de imagen."]);
    exit;
}

// Mover el archivo al directorio de subidas
if (move_uploaded_file($_FILES["file"]["tmp_name"], $uploadedFile)) {
    echo json_encode(["url" => $uploadedFile]);
} else {
    echo json_encode(["error" => "Error al subir el archivo."]);
}
?>


