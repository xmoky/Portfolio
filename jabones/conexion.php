<?php
try{
    $conexion=new PDO('mysql:dbname=jabones;host=localhost','jabones','jabones');
    $conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
    echo "Error:" . $e->getMessage();
}
