<?php
$dni = $_POST['dni'];
$pass = $_POST['pass'];

try {
    $conexion = new PDO('mysql:dbname=pacofiestas;host=localhost', 'root', 'root');
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error:" . $e->getMessage();
}

try {
    $consulta = $conexion->prepare("select * from Usuarios where Dni='$dni' and Contraseña='$pass'");
    $consulta->execute();
    if ($consulta->rowCount() > 0) {
        $resultado = $consulta->fetch(PDO::FETCH_ASSOC);
        $nombre = $resultado['Nombre'];
        $apellido = $resultado['Apellido'];
        $email = $resultado['Email'];
        $fecha = $resultado['FechaNacimiento'];
        $telefono = $resultado['Telefono'];
        $puntos = $resultado['Puntos'];
        $fotografia = $resultado['Fotografia']; 

        echo '<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Perfil de Usuario</title>
            <link rel="stylesheet" href="perfil.css">
        </head>
        <body>
        
            <header>
                <h1>Mi Perfil</h1>
            </header>
        
            <div id="perfil-container">
                <div id="foto-perfil" class="drop-area" ondrop="dropHandler(event)" ondragover="dragOverHandler(event)">
                    <span class="drop-text"></span><br><br>
                    <input type="file" id="fileElem" accept="image/*" style="display:none" onchange="handleFiles(this.files)">
                    <img src="' . $fotografia . '" class="img-preview" alt="Foto D&D"> <!-- Mostrar la foto actual -->
                </div>
                <div id="datos-usuario">
                <form action="actualizadatos.php" method="post">
                    <h2>Datos del Usuario</h2>
                    <p><strong>DNI:</strong></p><input type="text" name="dni" value="' . $dni . '"readonly>
                    <p><strong>Nombre:</strong></p><input type="text" name="nombre" value="' . $nombre . '">
                    <p><strong>Apellido:</strong></p><input type="text" name="apellido" value="' . $apellido . '">
                    <p><strong>Fecha de Nacimiento:</strong></p><input type="text" name="fecha" value="' . $fecha . '">
                    <p><strong>Email:</strong></p><input type="text" name="email" value="' . $email . '">
                    <p><strong>Teléfono:</strong></p><input type="text" name="telefono" value="' . $telefono . '">
                    <p><strong>Puntos:</strong></p><input type="text" name="puntos" value="' . $puntos . '" readonly><br>
                    <button type="submit">Actualizar</button>
                    </form>
                    <button><a href="../index.html">Inicio</a></button>
                </div>
            </div>
            
            <footer>
                <p>&copy; 2024 PacoFiestas</p>
            </footer>
            
            <script src="perfil.js"></script>
        </body>
        </html>
        ';
    } else {
        header("Location:login.html");
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
