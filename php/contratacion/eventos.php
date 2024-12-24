<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "pacofiestas";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
if(isset($_POST['date'])){
    $fecha=$_POST['date'];
    $sql = "SELECT * FROM entretenimiento where Disponibilidad<'$fecha'";
    $result = $conn->query($sql);
}else{
    $sql = "SELECT * FROM entretenimiento";
    $result = $conn->query($sql);
}


$tabla="";
if ($result->num_rows > 0) {
    // Salida de datos por cada fila
    while ($rows = $result->fetch_assoc()) {
       $tabla.="<tr>";
       $tabla.="<td><img class='logo' src='imagenes/logo.png'></td>";
       $tabla.="<td>".$rows['Oficio']."</td>";
       $tabla.="<td>".$rows['Descripcion']."</td>";
       $tabla.="<td>".$rows['Precio']."€</td>";
       $tabla.="<td>".$rows['Zona']."</td>";
       $tabla.="<td>".$rows['Puntos']."</td>";
       $tabla.="<td><button value='{$rows['ID']}'>Comprar</button></td>";
       $tabla.="</tr>";
    }
}

$conn->close();


echo $tabla;
?>