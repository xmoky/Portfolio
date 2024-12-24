<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="estilos.css">
    <title>inicio</title>
</head>

<body>
    <div>
        <h1>REGISTRO DE VEHÍCULOS</h1>

        <form action="gestionaFormularios.php" method="POST">
            <select name="tipo">
                <option value="emt">EMT</option>
                <option value="taxis">Taxis</option>
                <option value="servicios">Servicios</option>
                <option value="residentesyhoteles">Residentes y hoteles</option>
                <option value="logistica">Logistica</option>
            </select>
            <br>
            <button type="submit">Enviar</button>
        </form>
        <form action="sancionados.php" method="post">
            <button type="submit">Comprobar sancionados</button>
        </form>
        
    </div>
</body>

</html>