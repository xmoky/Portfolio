<?php
session_start();
include_once "conexion.php";
echo "<header>
<link rel=\"stylesheet\" href=\"estilos.css\">
<title>Catálogo de jabones</title>
<h1>CATÁLOGO DE JABONES</h1>
<button><a href=\"carrito.php\">Carrito</a></button>
</header>";
echo "<table>";
echo "<th>Nombre del jabon</th>
    <th>Descripción</th>
    <th>Peso(g)</th>
    <th>Precio(€)</th>
    <th>Imagen</th>
    <th></th>";
try {
    $consulta = $conexion->prepare("select * from productos");
    $consulta->execute();
    while ($tabla = $consulta->fetch(PDO::FETCH_ASSOC)) {
        echo "<tr>";
        echo "<td>{$tabla['nombre']}</td>";
        echo "<td>{$tabla['descripcion']}</td>";
        echo "<td>{$tabla['peso']}</td>";
        echo "<td>{$tabla['precio']}</td>";
        echo "<td><img src=\"{$tabla['imagen']}\"></td>";
        if (isset($_SESSION['autentficado'])) {
            if ($_SESSION['autentficado'] == 'si') {
                echo "<form action=\"cesta.php\" method=\"post\">";
                echo "<td><button type=\"submit\" name=\"productoID\" value=\"{$tabla['productoID']}\">Añadir a cesta</button></td>";
                echo "</form>";
            }
        }

        echo "</tr>";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
echo "</table>";

