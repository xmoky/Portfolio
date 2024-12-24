var boton_enviar=document.getElementById("enviar");
boton_enviar.addEventListener("click",descargaArchivo);

function descargaArchivo() {
    
    if (window.XMLHttpRequest) {
        peticion_http = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
    }

    peticion_http.onreadystatechange = muestraContenido;
    peticion_http.open('POST', 'php/inicio.php', true);
    peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var dni_js = document.getElementById("dni").value;
    var contrasena_js = obtenerContraseña(); 
    
        
    var consultar = 
    "dni_php=" + encodeURIComponent(dni_js) +
    "&contrasena_php=" + encodeURIComponent(contrasena_js) +  
    "&nocache=";
    peticion_http.send(consultar);
}
var respuesta="";
function muestraContenido() {
    console.log("readyState: " + peticion_http.readyState);
    console.log("status: " + peticion_http.status);

    if (peticion_http.readyState == 4) {
        if (peticion_http.status == 200) {
            respuesta = peticion_http.responseText;
            respuesta=respuesta.trim();
            console.log("La respuesta del servidor es: " + respuesta);

            //Evaluar la respuesta y redirigir si es "true"
            if (respuesta == "true") {
                console.log("Registro exitoso. Redirigiendo a la página...");
                window.location.href ="captcha/captcha.html";
            } else  {
                alert("Usuario o contraseña incorrectos, introduzca los datos de nuevo");
            }
        }
    }
}
