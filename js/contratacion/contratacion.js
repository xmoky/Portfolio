let coche = document.getElementById("coche");
let evento = document.getElementById("evento");
let filtrar = document.getElementById("filtrar");
let tabla = document.getElementById("tabla");
let tabla_eventos = document.getElementById("tabla_eventos");
let fecha = document.getElementById("fecha");


let id_compra;
filtrar.addEventListener("click", function () {
    if (coche.checked == true) {
        if(document.getElementById("temporal")){
            document.getElementById("temporal").parentElement.removeChild(document.getElementById("temporal"));
        }
        if (document.getElementById("tabla_coches")) {
            tabla.innerHTML = "";
            tabla.removeAttribute("id");
        }

        var peti = new XMLHttpRequest();

        // Configurar la petición
        peti.open("POST", "php/contratacion/coches.php", true);
        peti.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // Definir la función de respuesta
        peti.onreadystatechange = function () {
            if (peti.readyState == 4 && peti.status == 200) {
                // Manejar la respuesta del servidor
                let respuesta = JSON.parse(peti.responseText);
                
                tabla.id = "tabla_coches";

                for (let valor of respuesta) {
                    let fila = document.createElement("tr");


                    // foto
                    let celda_foto = document.createElement("td");
                    let foto = document.createElement("img");
                    foto.className = "coches";
                    foto.src = valor.foto;
                    celda_foto.appendChild(foto);
                    fila.appendChild(celda_foto);

                    // marca
                    let marca = document.createElement("td");
                    marca.textContent = valor.Marca;
                    fila.appendChild(marca);

                    // modelo
                    let modelo = document.createElement("td");
                    modelo.textContent = valor.Modelo;
                    fila.appendChild(modelo);

                    // preciohora
                    let preciohora = document.createElement("td");
                    preciohora.textContent = valor.PrecioHora + "€";
                    fila.appendChild(preciohora);

                    //boton de compra
                    let td_b_compra = document.createElement("td");
                    let boton_compra = document.createElement("button");
                    boton_compra.value = valor.id;
                    boton_compra.textContent = "Comprar";
                    boton_compra.addEventListener("click", function () {

                        id_compra = this.value;
                        let caja1 = document.createElement("div");
                        caja1.style.position = "fixed";
                        caja1.style.width = "100dvw";
                        caja1.style.height = "100dvh";
                        caja1.style.backgroundColor = "rgb(248, 241, 241, 0.7)";
                        caja1.style.display = "flex";
                        caja1.style.justifyContent = "center";
                        caja1.style.alignItems = "center";
                        let caja2 = document.createElement("div");
                        caja2.style.gap = "2%";
                        caja2.style.display = "flex";
                        caja2.style.justifyContent = "center";
                        caja2.style.alignItems = "center";
                        caja2.style.flexDirection = "column";
                        caja2.style.width = "35dvw";
                        caja2.style.height = "40dvh";
                        caja2.style.boxShadow = "5px 5px 10px rgba(0, 0, 0, 0.5)";
                        caja2.style.backgroundColor = "rgb(248, 241, 241, 1)";
                        caja2.style.border = "2px solid grey";
                        caja2.style.borderRadius = "1%";
                        let titulo = document.createElement("h2");
                        titulo.textContent = "¿Cuantos días quieres alquilar?";
                        caja2.appendChild(titulo);
                        let fecha = document.createElement("input");
                        fecha.type = "number";
                        caja2.appendChild(fecha);

                        var xhr = new XMLHttpRequest();

                        var url = 'php/contratacion/compruebadisponibilidad.php';
                        var metodo = 'POST';
                        var datos = 'coches';
                        xhr.open(metodo, url, true);

                        xhr.onload = function () {
                            if (xhr.status >= 200 && xhr.status < 300) {
                                let respuesta = xhr.responseText;
                                if (respuesta == "true") {
                                    let boton_contratar = document.createElement("button");
                                    boton_contratar.textContent = "Contratar";
                                    caja2.appendChild(boton_contratar);
                                    boton_cancelar = document.createElement("button");
                                    boton_cancelar.textContent = "Cancelar";
                                    boton_cancelar.style.backgroundColor = "grey";
                                    caja2.appendChild(boton_cancelar);
                                    boton_cancelar.addEventListener("click", function () {
                                        caja1.parentElement.removeChild(caja1);
                                    });
                                    boton_contratar.addEventListener("click", function () {
                                        let dias = fecha.value;
                                        var xhr2 = new XMLHttpRequest();

                                        var url = 'php/contratacion/actualizafecha.php';
                                        var metodo = 'POST';
                                        xhr2.open(metodo, url, true);

                                        xhr2.onload = function () {
                                            if (xhr2.status >= 200 && xhr2.status < 300) {
                                                let respuesta2 = xhr2.responseText;
                                                console.log(respuesta2);
                                            } else {
                                                console.error('La solicitud falló. Estado del servidor:', xhr2.status);
                                            }
                                        };

                                        xhr2.onerror = function () {
                                            console.error('Error de red al intentar realizar la solicitud.');
                                        };


                                        xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                                        xhr2.send('id_compra=' + encodeURIComponent(id_compra) + '&dias=' + encodeURIComponent(dias));


                                        caja1.parentElement.removeChild(caja1);
                                    });
                                } else {
                                    let boton_contratar = document.createElement("button");
                                    boton_contratar.textContent = "No disponible";
                                    boton_contratar.style.backgroundColor="grey";
                                    caja2.appendChild(boton_contratar);
                                    fecha.parentElement.removeChild(fecha);
                                    boton_contratar.addEventListener("click", function () {

                                        caja1.parentElement.removeChild(caja1);
                                    });
                                }
                            } else {
                                console.error('La solicitud falló. Estado del servidor:', xhr.status);
                            }
                        };

                        xhr.onerror = function () {
                            console.error('Error de red al intentar realizar la solicitud.');
                        };

                        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        xhr.send('datos=' + encodeURIComponent(datos) + '&id_compra=' + encodeURIComponent(id_compra));


                        caja1.appendChild(caja2);
                        document.body.appendChild(caja1);

                    });
                    td_b_compra.appendChild(boton_compra);
                    fila.appendChild(td_b_compra);

                    tabla.appendChild(fila);
                }
                
            }
        };
        if (fecha.value != "") {
            let date = fecha.value;
            //console.log(date);
            peti.send('date=' + encodeURIComponent(date));
        } else {
            peti.send();
        }
    } else {
        tabla.innerHTML = "";
    }

    if (evento.checked == true) {
        if(document.getElementById("temporal")){
            document.getElementById("temporal").parentElement.removeChild(document.getElementById("temporal"));
        }
        var xhr = new XMLHttpRequest();
        var url = "php/contratacion/eventos.php";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var respuesta = xhr.responseText;
                
                tabla_eventos.innerHTML = respuesta;
                let botones_eventos = tabla_eventos.getElementsByTagName("button");
                for (let valor of botones_eventos) {
                    valor.addEventListener("click", function () {
                        id_compra = this.value;
                        let caja1 = document.createElement("div");
                        caja1.style.position = "fixed";
                        caja1.style.width = "100dvw";
                        caja1.style.height = "100dvh";
                        caja1.style.backgroundColor = "rgb(248, 241, 241, 0.7)";
                        caja1.style.display = "flex";
                        caja1.style.justifyContent = "center";
                        caja1.style.alignItems = "center";
                        let caja2 = document.createElement("div");
                        caja2.style.gap = "2%";
                        caja2.style.display = "flex";
                        caja2.style.justifyContent = "center";
                        caja2.style.alignItems = "center";
                        caja2.style.flexDirection = "column";
                        caja2.style.width = "35dvw";
                        caja2.style.height = "40dvh";
                        caja2.style.boxShadow = "5px 5px 10px rgba(0, 0, 0, 0.5)";
                        caja2.style.backgroundColor = "rgb(248, 241, 241, 1)";
                        caja2.style.border = "2px solid grey";
                        caja2.style.borderRadius = "1%";
                        let titulo = document.createElement("h2");
                        titulo.textContent = "¿Cuantos días quieres alquilar?";
                        caja2.appendChild(titulo);
                        let fecha = document.createElement("input");
                        fecha.type = "number";
                        caja2.appendChild(fecha);

                        var xhr = new XMLHttpRequest();
                        var url = 'php/contratacion/compruebadisponibilidad.php';
                        var metodo = 'POST';
                        var datos = 'entretenimiento';
                        xhr.open(metodo, url, true);

                        xhr.onload = function () {
                            if (xhr.status >= 200 && xhr.status < 300) {
                                let respuesta = xhr.responseText;
                                if (respuesta == "true") {
                                    let boton_contratar = document.createElement("button");
                                    boton_contratar.textContent = "Contratar";
                                    caja2.appendChild(boton_contratar);
                                    boton_contratar.addEventListener("click", function () {
                                        let dias = fecha.value;
                                        var xhr2 = new XMLHttpRequest();

                                        var url = 'php/contratacion/actualizafecha2.php';
                                        var metodo = 'POST';
                                        xhr2.open(metodo, url, true);

                                        xhr2.onload = function () {
                                            if (xhr2.status >= 200 && xhr2.status < 300) {
                                                let respuesta2 = xhr2.responseText;
                                                console.log(respuesta2);
                                            } else {
                                                console.error('La solicitud falló. Estado del servidor:', xhr2.status);
                                            }
                                        };

                                        xhr2.onerror = function () {
                                            console.error('Error de red al intentar realizar la solicitud.');
                                        };


                                        xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                                        xhr2.send('id_compra=' + encodeURIComponent(id_compra) + '&dias=' + encodeURIComponent(dias));


                                        caja1.parentElement.removeChild(caja1);
                                    });
                                    boton_cancelar = document.createElement("button");
                                    boton_cancelar.textContent = "Cancelar";
                                    boton_cancelar.style.backgroundColor = "grey";
                                    caja2.appendChild(boton_cancelar);
                                    boton_cancelar.addEventListener("click", function () {
                                        caja1.parentElement.removeChild(caja1);
                                    });
                                } else {
                                    let boton_contratar = document.createElement("button");
                                    boton_contratar.textContent = "No disponible";
                                    boton_contratar.style.backgroundColor="grey";
                                    caja2.appendChild(boton_contratar);
                                    fecha.parentElement.removeChild(fecha);
                                    boton_contratar.addEventListener("click", function () {

                                        caja1.parentElement.removeChild(caja1);
                                    });
                                }
                            } else {
                                console.error('La solicitud falló. Estado del servidor:', xhr.status);
                            }
                        };

                        xhr.onerror = function () {
                            console.error('Error de red al intentar realizar la solicitud.');
                        };

                        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        xhr.send('datos=' + encodeURIComponent(datos) + '&id_compra=' + encodeURIComponent(id_compra));
                        caja1.appendChild(caja2);
                        document.body.appendChild(caja1);
                    });
                }
            } else if (xhr.readyState === 4) {
                console.log("Error en la petición AJAX");
            }
        };
        if (fecha.value != "") {
            let date = fecha.value;

            xhr.send('date=' + encodeURIComponent(date));
        } else {
            xhr.send();
        }
    } else {
        tabla_eventos.innerHTML = "";
    }
});
