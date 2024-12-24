function validarDni() {
    let respuesta = true;
    let dniInput = document.getElementById("dni");
    let dni = dniInput.value;
    dni = dni.toUpperCase();

    if (dni.length === 0) {
        dniInput.style.backgroundColor = ""; // Restablecer el color de fondo si está vacío
        respuesta= false;
    }

    if (dni.length != 9) {
        dniInput.style.backgroundColor = "mistyrose"; // Rojo para indicar error
        respuesta= false;
    }

    for (let i = 0; i < 8; i++) {
        if (isNaN(parseInt(dni[i]))) {
            dniInput.style.backgroundColor = "mistyrose";
            respuesta= false;
        }
    }

    if (!(dni[8] >= 'a' && dni[8] <= 'z' || dni[8] >= 'A' && dni[8] <= 'Z')) {
        dniInput.style.backgroundColor = "mistyrose";
        respuesta= false;
    }
    return respuesta;
}
let dnii=document.getElementById("dni");
dnii.addEventListener("input",function(){
    validarDni();
    if(validarDni()==true){
        document.getElementById("enviar").disabled = false;
        dnii.style.backgroundColor = "honeydew";
    }
});
