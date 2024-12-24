<?php
    echo '<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="estilos.css">
        <title>Formulario de Sanciones</title>
    </head>
    <body>
        <div>
        <h1>Formulario de Sanciones</h1>
        <form method="post" action="resultados.php">
            <label for="fecha_inicio">Fecha de inicio:</label>
            <input type="date" name="fecha_inicio" required>
            <br>
            <label for="fecha_fin">Fecha de fin:</label>
            <input type="date" name="fecha_fin" required>
            <br>
            <input type="submit" value="Buscar">
        </form>
        </div>
    </body>
    </html>';
?>