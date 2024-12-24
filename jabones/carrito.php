<?php
include_once "session.php";
include_once "conexion.php";

echo '<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="carrito.css">
    <title>Tu Cesta</title>
</head>

<body>
    <header>
        <div class="container">
            <h1>Tu Cesta</h1>
        </div>
    </header>

    <div class="container">';

try {
    $consulta1 = $conexion->query("SELECT productos.nombre, productos.precio, productos.imagen,itemcesta.itemcestaID,productos.productoID FROM cesta INNER JOIN itemcesta ON cesta.cestaID=itemcesta.cestaID INNER JOIN productos ON itemcesta.productoID=productos.productoID ");
    $consulta1->execute();
    $total = 0;
    $productos = "";
    if ($consulta1->rowCount() > 0) {
        echo "<table>";
        echo "<tr><th>Nombre</th><th>Precio</th><th>Imagen</th><th></th></tr>";
        echo "<form method='post' action='borracesta.php'>";
        while ($resultado = $consulta1->fetch(PDO::FETCH_ASSOC)) {
            echo "<tr>";
            echo "<td>" . $resultado['nombre'] . "</td>";
            $productos .= "," . $resultado['productoID'];
            echo "<td>" . $resultado['precio'] . "</td>";
            $total += $resultado['precio'];
            echo "<td><img src=\"" . $resultado['imagen'] . "\" alt=\"Producto\"></td>";
            echo "<td><button type=\"submit\" name='elemento' value=\"{$resultado['itemcestaID']}\">Eliminar producto</button></td>";
            echo "</tr>";
        }
        echo "</form>";
        echo "<tr><td><b>TOTAL</b></td><td><b>$total €</b></td><td><form action=\"pedido.php\" method=\"post\">
        <button type=\"submit\">Realizar pedido</button>
    </form></td></tr>";
        setcookie("total", $total);
        setcookie("productos", $productos);
        echo "</table>";
    } else {
        echo "<p>No hay productos en la cesta.</p>";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

echo '<button><a href="muestraJabones.php">Ir a catálogo de jabones</a></button></div>

</body>

</html>';
?>