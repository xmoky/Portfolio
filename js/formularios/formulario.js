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

function ejecutar_validacion() {
    var respuesta = validarDni();
    if (respuesta == true) {
        ejecutar_peticion(); 
    } else {
        console.log("ERROR");
    }
}

function ejecutar_peticion()
{
    var dni=document.getElementById("dni").value;
    var dni_input=document.getElementById("dni");
    // Hacer una solicitud AJAX al servidor para validar el DNI y registrar si es válido
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/compruebadni.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var consultar = "dni_php=" + encodeURIComponent(dni) + "&nocache=";


    xhr.send(consultar);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var respuesta = xhr.responseText;
            respuesta=respuesta.trim();
            console.log(respuesta);
            if (respuesta == "true") {
                // DNI existe en la base de datos
                console.log("llego");
                dni_input.style.backgroundColor = "mistyrose";
                document.getElementById("mensajeErrorDNI").innerHTML="el dni ya esta registrado";
                return false;
            } else {
                console.log(" no llego");
                // DNI no existe, se puede registrar
                dni_input.style.backgroundColor = "honeydew";
                document.getElementById("mensajeErrorDNI").innerHTML="";
                document.getElementById("nombre").removeAttribute("readonly");
                document.getElementById("apellido").removeAttribute("readonly");
                document.getElementById("email").removeAttribute("readonly");
                document.getElementById("telefono").removeAttribute("readonly");
                document.getElementById("pwd").removeAttribute("readonly");

            }
        }
    };

    return true; 
}


function validarNie() {
    let nieInput = document.getElementById("dni");
    let dni = nieInput.value;
    dni = dni.toUpperCase();

    if (dni.length === 0) {
        nieInput.style.backgroundColor = ""; // Restablecer el color de fondo si está vacío
        return false;
    }

    if (dni.length != 9) {
        nieInput.style.backgroundColor = "mistyrose";
        return false;
    }

    if (dni[0] != "X" && dni[0] != "Y" && dni[0] != "Z") {
        nieInput.style.backgroundColor = "mistyrose";
        return false;
    }

    for (let i = 1; i < 8; i++) {
        if (isNaN(parseInt(dni[i]))) {
            nieInput.style.backgroundColor = "mistyrose";
            return false;
        }
    }

    let letraControl = dni[8];
    let letrasPermitidas = "TRWAGMYFPDXBNJZSQVHLCKE";
    let letraCalculada = letrasPermitidas[parseInt(dni.slice(1, 8)) % 23];

    if (letraCalculada === letraControl) {
        nieInput.style.backgroundColor = "honeydew";
        return true;
    } else {
        nieInput.style.backgroundColor = "mistyrose";
        return false;
    }
}

function validacionID() {
    var selector = document.getElementById("tipoDocumento");
    var opcionSeleccionada = selector.value;

    if (opcionSeleccionada === "DNI") {
        return validarDni(); // Asegúrate de devolver el resultado de la validación
    } else if (opcionSeleccionada === "NIE") {
        return validarNie(); // Asegúrate de devolver el resultado de la validación
    }

    
    return false;
}

function contieneSoloNumeros() {
    let contra = document.getElementById("pwd");
    let valorContraseña = contra.value;
    
    if (valorContraseña === "") {
        contra.style.backgroundColor = "";  // Restablecer el color de fondo si está vacío
        return false;
    }

    if(valorContraseña.length<6){
        contra.style.backgroundColor = "mistyrose";
        return false;
    }

    for (let i = 0; i < valorContraseña.length; i++) {
        if (isNaN(parseInt(valorContraseña[i], 10))) {
            contra.style.backgroundColor = "mistyrose";
            return false;
        }
    }

    contra.style.backgroundColor = "honeydew";
    return true;
}

function validarEmail() {
    var emailInput = document.getElementById("email");
    var email = emailInput.value;

    // Verificar si el correo electrónico contiene un solo símbolo "@"
    const arrobaIndex = email.indexOf('@');
    if (arrobaIndex === -1 || arrobaIndex !== email.lastIndexOf('@')) {
        emailInput.style.backgroundColor = "mistyrose";
        return false;
    }

    // Verificar si hay al menos un punto después del símbolo "@"
    const puntoIndex = email.indexOf('.', arrobaIndex);
    if (puntoIndex === -1 || puntoIndex === email.length - 1) {
        emailInput.style.backgroundColor = "mistyrose";
        return false;
    }

    emailInput.style.backgroundColor = "honeydew";
    return true;
}



function validaFormulario() {

    if (validacionID() && validaTelefono() && contieneSoloNumeros() && ejecutar_peticion() && validarEmail()) {
        document.getElementById("enviar").disabled = false;
        return true;
    } else {
        document.getElementById("enviar").disabled = true;
        return false;
    }
}

// Agrega eventos oninput a los campos relevantes 
document.getElementById("dni").addEventListener("input", ejecutar_validacion);


document.getElementById("tipoDocumento").addEventListener("change", function () {
    ejecutarajax();
});

document.getElementById("telefono").addEventListener("input", function() {
    validaTelefono();
    validaFormulario();
});

document.getElementById("pwd").addEventListener("input", function() {
    contieneSoloNumeros();
    validaFormulario();
});

document.getElementById("nombre").addEventListener("input", function() {
    let nombreInput = document.getElementById("nombre");
    if(nombreInput.value !== ""){
        nombreInput.style.backgroundColor = "honeydew";
    } else {
        nombreInput.style.backgroundColor = ""; // Restablecer el color de fondo si está vacío
    }
});

document.getElementById("apellido").addEventListener("input", function() {
    let apellidoInput = document.getElementById("apellido");
    if(apellidoInput.value !== ""){
        apellidoInput.style.backgroundColor = "honeydew";
    } else {
        apellidoInput.style.backgroundColor = ""; // Restablecer el color de fondo si está vacío
    }
});

document.getElementById("email").addEventListener("input", function() {
    validarEmail();
    validaFormulario();
});

document.getElementById("datepicker").addEventListener("change", function() {
    let calendarioInput = document.getElementById("datepicker");
    if(calendarioInput.value !== ""){
        calendarioInput.style.backgroundColor = "honeydew";
    } else {
        calendarioInput.style.backgroundColor = ""; // Restablecer el color de fondo si está vacío
    }
});



