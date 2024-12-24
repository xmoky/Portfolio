<?php
include_once "session.php";
include_once "conexion.php";

$itemcesta = $_POST['elemento'];
try {
    $borraitem = $conexion->prepare("delete from itemcesta where itemcestaID=?");
    $borraitem->bindValue(1, $itemcesta);
    $borraitem->execute();
    header("Location:carrito.php");
} catch (PDOException $e) {
    echo $e->getMessage();
}