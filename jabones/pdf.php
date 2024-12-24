<?php
include_once "session.php";
require('fpdf/fpdf.php');

// Obtener datos del pedido de las variables de sesión
$nombre = $_SESSION['n_pedido'];
$fecha = $_SESSION['f_pedido'];
$f_entrega = $_SESSION['fe_pedido'];
$total = $_COOKIE['total'];

// Crear PDF
$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);

// Encabezado de la tabla
$pdf->Cell(50, 10, 'Producto', 1);
$pdf->Cell(50, 10, 'Fecha de pedido', 1);
$pdf->Cell(50, 10, 'Fecha de entrega', 1);
$pdf->Cell(50, 10, 'Total', 1);
$pdf->Ln();

// Agregar datos del pedido a la tabla
$pdf->Cell(50, 10, $nombre, 1);
$pdf->Cell(50, 10, $fecha, 1);
$pdf->Cell(50, 10, $f_entrega, 1);
$pdf->Cell(50, 10, $total."€", 1);
$pdf->Ln();

// Nombre del archivo PDF
$nombre_archivo = $_SESSION['email'].'.pdf';

// Guardar el PDF en el servidor
$pdf->Output('F', $nombre_archivo);

?>

