<?php
include_once "session.php";
include_once "conexion.php";

$fechaCreacion = new DateTime();
$fecha = $fechaCreacion->format('Y-m-d');
$productoid = $_POST['productoID'];
//compruebo si hay una cesta creada y si no la creo
$email = $_SESSION['email'];
$compruebacesta = false;
$idcesta = "";
try {
    $consulta1 = $conexion->prepare("select * from cesta where email='$email'");
    $consulta1->execute();
    if ($consulta1->rowCount() > 0) {
        $compruebacesta = true;
        $resultado = $consulta1->fetch(PDO::FETCH_ASSOC);
        $idcesta = $resultado['cestaID'];
    }

} catch (PDOException $e) {
    echo $e->getMessage();
}
if ($compruebacesta == false) {
    try {
        $creacesta = $conexion->query("insert into cesta (email,fechaCreacion) values ('$email','$fecha')");
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}

try {
    $consulta2 = $conexion->prepare("select cestaID from cesta where email='$email'");
    $consulta2->execute();

    $resultado = $consulta2->fetch(PDO::FETCH_ASSOC);
    $idcesta = $resultado['cestaID'];

} catch (PDOException $e) {
    echo $e->getMessage();
}

//productos de itemcesta

try {
    $consulta3 = $conexion->query("select count(itemcestaID) from cesta inner join itemcesta on cesta.cestaID=itemcesta.cestaID where cesta.cestaID='$idcesta'");
    $consulta3->execute();
    $resultado2 = $consulta3->fetch(PDO::FETCH_ASSOC);
    $items = $resultado2['count(itemcestaID)']; //cantidad de items en el carro
} catch (PDOException $e) {
    echo $e->getMessage();
}
try {
    $consulta4 = $conexion->prepare("select sum(unidades),pedidos.email from pedidos inner join itempedido on pedidos.pedidoID=itempedido.pedidoID where fechapedido between DATE_SUB(NOW(), INTERVAL 30 DAY) and current_date() and email='$email'");
    $consulta4->execute();
    if ($consulta4->rowCount() > 0) {
        $resultado3 = $consulta4->fetch(PDO::FETCH_ASSOC);
        $pedidos30 = $resultado3['sum(unidades)'];
    }

} catch (PDOException $e) {
    echo $e->getMessage();
}
if ($items < 2 && $pedidos30 < 2 && $items + $pedidos30 < 2) {
    try {
        $masproductos = $conexion->prepare("insert into itemcesta (cestaID,productoID,cantidad) values (?,?,1)");
        $masproductos->bindValue(1, $idcesta);
        $masproductos->bindValue(2, $productoid);
        $masproductos->execute();
        header("Location:muestraJabones.php");
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
} else {
    echo "No puedes añadir mas de dos productos al carrito al mes";
    echo "<button><a href=\"muestraJabones.php\">Volver</a></button>";
}



