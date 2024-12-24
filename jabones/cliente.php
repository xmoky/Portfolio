<?php
session_start();
echo '<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="carrito.css">
    <title>Menú</title>
</head>';
if($_SESSION['autentficado'] == 'si' && $_SESSION['tipoUsuario'] == 'usuario'){
    echo "<div><a href=\"muestraJabones.php\">Ver catálogo de jabones</a></div>";
    echo "<div><a href=\"carrito.php\">Cesta</a></div>";
}else{
    header("Location:login.php");
}

?>
