<?php
include_once "session.php";
include_once "conexion.php";
require('fpdf/fpdf.php');

$email = $_SESSION['email'];
$fech = new DateTime();
$fecha = $fech->format('Y-m-d');

$fechaentrega = clone $fech;
$fechaentrega->modify("+2 days");
$fechaentrega = $fechaentrega->format('Y-m-d');
$total = $_COOKIE['total'];
$productos = $_COOKIE['productos'];

$idproducto = explode(",", trim($productos));

echo '<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="carrito.css">
    <title>Pedido</title>
</head>

<body>
    <header>
        <div class="container">
            <h1>Pedido</h1>
        </div>
    </header>

    <div class="container">';

try {
    $consulta1 = $conexion->query("insert into pedidos (email,fechapedido,fechaentrega,totalpedido,entregado) values ('$email','$fecha','$fechaentrega','$total','0')");
    //$consulta1->execute();

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
try {
    $consulta2 = $conexion->prepare("select max(pedidoID) from pedidos where email='$email'");
    $consulta2->execute();
    $resultado = $consulta2->fetch(PDO::FETCH_ASSOC);
    $idpedido = $resultado['max(pedidoID)'];

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
foreach ($idproducto as $valor) {
    if ($valor != "") {
        try {
            $consulta3 = $conexion->query("insert into itempedido (pedidoID,productoID,unidades) values ('$idpedido','$valor','1')");
            //$consulta3->execute();

        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

}
try {
    $cons = $conexion->prepare("select cestaID from cesta where email='$email'");
    $cons->execute();

    $resultado6 = $cons->fetch(PDO::FETCH_ASSOC);
    $cesta = $resultado6['cestaID'];

} catch (PDOException $e) {
    echo $e->getMessage();
}
try {

    //eliminar los productos de la cesta despues de realizar el pedido
    $consulta4 = $conexion->prepare("delete from itemcesta where cestaID='$cesta'");
    $consulta4->execute();

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
try {
    $con_pedido = $conexion->prepare("select * from pedidos inner join itempedido on pedidos.pedidoID=itempedido.pedidoID inner join productos on productos.productoID=itempedido.productoID where pedidos.pedidoID='$idpedido'");
    $con_pedido->execute();
    echo "<table>";
    echo "<th>Producto</th><th>Fecha de pedido</th><th>Fecha de entrega</th>";
    while ($resultado_pedido = $con_pedido->fetch(PDO::FETCH_ASSOC)) {
        
        echo "<tr>";
        echo "<td>{$resultado_pedido['nombre']}</td>";
        $_SESSION['n_pedido']=$resultado_pedido['nombre'];
        echo "<td>{$resultado_pedido['fechapedido']}</td>";
        $_SESSION['f_pedido']=$resultado_pedido['fechapedido'];
        echo "<td>{$resultado_pedido['fechaentrega']}</td>";
        $_SESSION['fe_pedido']=$resultado_pedido['fechaentrega'];
        echo "</tr>";
    }
    echo "<tr><th>TOTAL</th><td>{$total}€</td></tr>";
    echo "<table>";
    echo "<a href=\"cliente.php\">Menu</a>";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
echo '</div>
<form action="pdf.php">
<button type="submit">Generar pdf y enviar al correo</button></form>
</body>

</html>';



