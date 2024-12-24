<?php
if (isset($_POST['email']) && isset($_POST['pass'])) {
    session_start();
    include_once "conexion.php";
    $email = $_POST['email'];
    $pass = $_POST['pass'];
    try {
        $consulta = $conexion->prepare("select * from clientes where email like ? and contraseña like ?");
        $consulta->bindValue(1, $email);
        $consulta->bindValue(2, $pass);
        $consulta->execute();
    } catch (PDOException $e) {
        echo "Error: $e->getMessage()";
    }
    if ($consulta->rowCount() > 0) {
        $_SESSION['autentficado'] = 'si';
        $_SESSION['tipoUsuario'] = 'usuario';
        $_SESSION['email'] = $email;
        header("Location:cliente.php");

    } else {
        try {
            $consulta2 = $conexion->prepare("select * from administradores where email like ? and contraseña like ?");
            $consulta2->bindValue(1, $email);
            $consulta2->bindValue(2, $pass);
            $consulta2->execute();
        } catch (PDOException $e) {
            echo "Error: $e->getMessage()";
        }
        if ($consulta2->rowCount() > 0) {
            $_SESSION['autentficado'] = 'si';
            $_SESSION['tipoUsuario'] = 'administrador';
            header("Location:administrador.php");
        } else {
            header("Location:login.php");
        }
    }

} else {

    echo '<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="login.css">
        <title>Login</title>
    </head>

    <body>
        <div class="ring">
            <i style="--clr:#00ff0a;"></i>
            <i style="--clr:#ff0057;"></i>
            <i style="--clr:#fffd44;"></i>
            <div class="login">
                <h2>Login</h2>
                <form action="login.php" method="post">
                    <div class="inputBx">
                        <input type="text" name="email" placeholder="ej:usuario@domenico.es">
                    </div>
                    <div class="inputBx">
                        <input type="password" name="pass" placeholder="Contraseña">
                    </div>
                    <div class="inputBx">
                        <input type="submit" value="Entrar">
                    </div><br>
                    <div class="links">
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a href="registro.php">Registrate</a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <a href="catalogojabones.php">Continuar sin credenciales</a>
                    </div>
                </form>
            </div>

        </div>
    </body>
    </html>';
}
?>