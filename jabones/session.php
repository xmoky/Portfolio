<?php
session_start(); 

// Verificar si el usuario ha iniciado sesión
if (!$_SESSION["autentficado"] || $_SESSION["autentficado"]!='si'){
    
    header("Location:login.php");
    
}

// Cerrar sesión
function cerrarSesion() {
    session_unset(); // Limpiar todas las variables de sesión
    session_destroy(); 
}

?>
