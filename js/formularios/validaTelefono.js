function validaTelefono() {
    let telefonoInput = document.getElementById("telefono");
    let telefono = telefonoInput.value;

    if (telefono.length === 0) {
        telefonoInput.style.backgroundColor = ""; // Restablecer el color de fondo si está vacío
        return false;
    }

    if (telefono[0] != 6 && telefono[0] != 7 && telefono[0] != 9) {
        telefonoInput.style.backgroundColor = "mistyrose";
        return false;
    }
    if (telefono.length != 9 || isNaN(parseInt(telefono))) {
        telefonoInput.style.backgroundColor = "mistyrose";
        return false;
    }

    telefonoInput.style.backgroundColor = "honeydew";
    return true;
}
