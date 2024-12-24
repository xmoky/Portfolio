// Declarar peticion_http en un ámbito más amplio
var peticion_http;

var boton_enviar = document.getElementById("enviar");
boton_enviar.addEventListener("click", (e) => {
    if (!validaFormulario()) {
        e.preventDefault();
    } else {
        descargaArchivo();
    }
});

function descargaArchivo() {
    // Obtener la instancia del objeto XMLHttpRequest
    if (window.XMLHttpRequest) {
        peticion_http = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
    }

    peticion_http.onreadystatechange = muestraContenido;
    peticion_http.open('POST', 'php/registro.php', true);
    peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var dni_js = document.getElementById("dni").value;
    var fecha_js = document.getElementById("datepicker").value;
    var nombre_js = document.getElementById("nombre").value;
    var apellido_js = document.getElementById("apellido").value;
    var email_js = document.getElementById("email").value;
    var contrasena_js = document.getElementById("pwd").value;
    var telf_js = document.getElementById("telefono").value;

    var fecha_php_conformato = fecha_js.split("/");
    var fecha_correcta = fecha_php_conformato[2] + "/" + fecha_php_conformato[0] + "/" + fecha_php_conformato[1];

    var consultar =
        "dni_php=" + encodeURIComponent(dni_js) +
        "&fecha_php=" + encodeURIComponent(fecha_correcta) +
        "&nombre_php=" + encodeURIComponent(nombre_js) +
        "&apellido_php=" + encodeURIComponent(apellido_js) +
        "&email_php=" + encodeURIComponent(email_js) +
        "&contrasena_php=" + encodeURIComponent(contrasena_js) +
        "&telf_php=" + encodeURIComponent(telf_js) +
        "&nocache=";

    peticion_http.send(consultar);
}
var respuesta="";
function muestraContenido() {
    if (peticion_http.readyState == 4) {
        if (peticion_http.status == 200) {
            respuesta = peticion_http.responseText;
            console.log("La respuesta del servidor es: " + respuesta);

            // Evaluar la respuesta y redirigir si es "true"
            if (respuesta != "false") {
                console.log("Registro exitoso. Redirigiendo a la página...");
                window.location.href ="formulario_inicio.html";
            } else  {
                console.log("Error en el registro. No se redirige.");
            }
        }
    }
}



 