const formulario = document.querySelector("#filtro");
var xhr = new XMLHttpRequest();

// Configurar la petición
xhr.open("POST", "php/eventos/eventos.php", true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
var cont = 0;
// Definir la función de respuesta
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        // Manejar la respuesta del servidor
        var data = JSON.parse(xhr.responseText);

        // manejar los datos de la base de datos
        construirSelect(data);
        obtenerResultados();
    }
};

xhr.send();

function construirSelect(data) {

    const select = document.createElement("select");
    select.setAttribute("id", "opciones");
    for (var datos of data) {
        var option = document.createElement("option");
        option.textContent = datos.descripcion;
        option.value = datos.id;
        select.appendChild(option);
    }
    formulario.appendChild(select);


}
const boton1 = document.createElement("button");
boton1.textContent = "Obtener resultados";
boton1.setAttribute("id", "obtenerResultados");
formulario.appendChild(boton1);

function obtenerResultados() {
    //resultados del select
    document.getElementById("obtenerResultados").addEventListener("click", function (e) {
        e.preventDefault();
        var select = document.getElementById("opciones");
        var valorSeleccionado = select.value;
        var data = {
            opcion: valorSeleccionado
        };
        var peti = new XMLHttpRequest();

        // Configurar la petición
        peti.open("POST", "php/eventos/mostrarFormulario.php", true);
        peti.setRequestHeader("Content-type", "application/json");

        // Definir la función de respuesta
        peti.onreadystatechange = function () {
            if (peti.readyState == 4 && peti.status == 200) {
                // Manejar la respuesta del servidor
                var respuesta = JSON.parse(peti.responseText);

                // Aquí puedes manejar los datos que obtienes de la base de datos
                creaFormulario(respuesta);
                actualizarFormulario();
                borraFila();
            }
        };
        peti.send(JSON.stringify(data));
    });
}
function creaFormulario(respuesta) {
    if (cont > 0) {
        var formul = document.getElementById("formulario2");

        if (formul) {
            // Verificar si el formulario existe antes de intentar eliminarlo
            formul.parentNode.removeChild(formul);
        }
        if (document.getElementById("formulario23")) {
            document.getElementById("formulario23").parentElement.removeChild(document.getElementById("formulario23"));
        }
    }
    const formulario2 = document.createElement("form");
    formulario2.id = "formulario2";
    let campos = new Array();
    campos.push(respuesta[0].ID);
    campos.push(respuesta[0].Oficio);
    campos.push(respuesta[0].Descripcion);
    campos.push(respuesta[0].Precio);
    campos.push(respuesta[0].Observaciones);
    campos.push(respuesta[0].Zona);
    campos.push(respuesta[0].Puntos);
    for (const indice of campos) {
        var input1 = document.createElement("input");
        input1.type = "text";
        input1.value = indice;
        //input1.setAttribute("readonly", true);
        formulario2.appendChild(input1);
    }

    var input2 = document.createElement("input");
    input2.type = "date";
    input2.value = respuesta[0].Disponibilidad;
    //input2.setAttribute("readonly", true);
    formulario2.appendChild(input2);
    var actualizar = document.createElement("button");
    actualizar.setAttribute("id", "actualizar");
    actualizar.textContent = "Actualizar";
    formulario2.appendChild(actualizar);
    var borrar = document.createElement("button");
    borrar.setAttribute("id", "borrar");
    borrar.textContent = "Borrar";
    formulario2.appendChild(borrar);
    const volver = document.createElement("button");
    volver.id="volver";
    volver.textContent = "Volver a inicio";
    formulario2.appendChild(volver);

    volver.addEventListener("click", function(e){
        e.preventDefault();
        window.location.href ="index.html";
    });
    document.body.appendChild(formulario2);
    var id_oculto = document.getElementById("formulario2").getElementsByTagName("input");
    id_oculto[0].setAttribute("hidden", true);
    cont++;
    var segundoInput = document.querySelector('#formulario2 input:nth-child(2)');
    segundoInput.setAttribute("readonly", true);

}

//funcion que actualiza el formulario para que se cargue el evento
function actualizarFormulario() {
    const actualizar = document.querySelector("#actualizar");
    actualizar.addEventListener("click", function (e) {
        e.preventDefault();
        var formulario2 = document.getElementById("formulario2");
        var inputs = formulario2.getElementsByTagName("input");
        var param = {
            ID: inputs[0].value,
            Oficio: inputs[1].value,
            Descripcion: inputs[2].value,
            Precio: inputs[3].value,
            Observaciones: inputs[4].value,
            Zona: inputs[5].value,
            Puntos: inputs[6].value,
            Disponibilidad: inputs[7].value
        };

        var peti = new XMLHttpRequest();
        // Configurar la petición
        peti.open("POST", "php/eventos/actualizaFormulario.php", true);
        peti.setRequestHeader("Content-type", "application/json");

        // Definir la función de respuesta
        peti.onreadystatechange = function () {
            if (peti.readyState == 4 && peti.status == 200) {
                // Manejar la respuesta del servidor
                var respuesta = peti.responseText;
                if (respuesta == 'true') {
                    console.log("actualizacion hecha");
                } else {
                    console.log("error en la actualizacion");
                }

            }
        };

        peti.send(JSON.stringify(param));
    })
}

function borraFila() {
    document.getElementById("borrar").addEventListener("click", function (e) {
        e.preventDefault();
        var formulario2 = document.getElementById("formulario2");
        var inputs = formulario2.getElementsByTagName("input");
        var param = {
            ID: inputs[0].value,
        };

        var peti = new XMLHttpRequest();
        // Configurar la petición
        peti.open("POST", "php/eventos/borraformulario.php", true);
        peti.setRequestHeader("Content-type", "application/json");

        // Definir la función de respuesta
        peti.onreadystatechange = function () {
            if (peti.readyState == 4 && peti.status == 200) {
                // Manejar la respuesta del servidor
                var respuesta = peti.responseText;
                if (respuesta == true) {
                    console.log("borrado hecho");
                } else {
                    console.log("error en la eliminacion");
                }

            }
        };

        peti.send(JSON.stringify(param));
    })
}
//elementos del select
var enu;
var arraydeEnum;
var peti = new XMLHttpRequest();
// Configurar la petición
peti.open("POST", "php/eventos/enum.php", true);
peti.setRequestHeader("Content-type", "application/json");

// Definir la función de respuesta
peti.onreadystatechange = function () {
    if (peti.readyState == 4 && peti.status == 200) {
        // Manejar la respuesta del servidor
        let enu = peti.responseText;
        const trimmedString = enu.substring(6, enu.length - 2);

        arraydeEnum = trimmedString.split("','");
    }
};

peti.send();

//boton de agregar y su funcionalidad
const agregar = document.createElement("button");
agregar.textContent = "Agregar evento";
agregar.id = "agregar";
formulario.appendChild(agregar);

agregar.addEventListener("click", function (e) {
    e.preventDefault();
    if (document.getElementById("formulario23")) {
        document.getElementById("formulario23").parentElement.removeChild(document.getElementById("formulario23"));
    }
    if (document.getElementById("formulario2")) {
        document.getElementById("formulario2").parentElement.removeChild(document.getElementById("formulario2"));
    }
    const formulario23 = document.createElement("form");
    formulario23.id = "formulario23";
    document.body.appendChild(formulario23);
    const oficio = document.createElement("select");
    oficio.id = "oficio";
    for (var iterator of arraydeEnum) {
        var opciones = document.createElement("option");
        opciones.value = iterator;
        opciones.textContent = iterator;
        oficio.appendChild(opciones);
    }
    formulario23.appendChild(oficio);
    const descripcion = document.createElement("input");
    descripcion.id = "descripcion";
    formulario23.appendChild(descripcion);
    const precio = document.createElement("input");
    precio.id = "precio";
    formulario23.appendChild(precio);
    const observaciones = document.createElement("input");
    observaciones.id = "observaciones";
    formulario23.appendChild(observaciones);
    const zona = document.createElement("input");
    zona.id = "zona";
    formulario23.appendChild(zona);
    const disponibilidad = document.createElement("input");
    disponibilidad.id = "disponibilidad";
    disponibilidad.type = "date";
    formulario23.appendChild(disponibilidad);
    const puntos = document.createElement("input");
    puntos.id = "puntos";
    formulario23.appendChild(puntos);
    const env = document.createElement("button");
    env.type = "submit";
    env.textContent = "Añadir";
    env.id = "env";
    formulario23.appendChild(env);
    const volver = document.createElement("button");
    volver.id="volver";
    volver.textContent = "Volver a inicio";
    formulario23.appendChild(volver);

    volver.addEventListener("click", function(e){
        e.preventDefault();
        window.location.href ="index.html";
    });
    env.addEventListener("click", function (e) {
        e.preventDefault();
        const oficio = document.getElementById("oficio").value;
        const descripcion = document.getElementById("descripcion").value;
        const precio = document.getElementById("precio").value;
        const observaciones = document.getElementById("observaciones").value;
        const zona = document.getElementById("zona").value;
        const disponibilidad = document.getElementById("disponibilidad").value;
        const puntos = document.getElementById("puntos").value;
        let data = {
            Oficio: oficio,
            Descripcion: descripcion,
            Precio: precio,
            Observaciones: observaciones,
            Zona: zona,
            Disponibilidad: disponibilidad,
            Puntos: puntos
        }
        var peti = new XMLHttpRequest();
        // Configurar la petición
        peti.open("POST", "php/eventos/insertar.php", true);
        peti.setRequestHeader("Content-type", "application/json");

        // Definir la función de respuesta
        peti.onreadystatechange = function () {
            if (peti.readyState == 4 && peti.status == 200) {
                // Manejar la respuesta del servidor
                let enu = peti.responseText;
                if (enu == true) {
                    console.log("inserccion exitosa");
                } else {
                    console.log("error de inserccion");
                }
            }
        };

        peti.send(JSON.stringify(data));
    });
})









