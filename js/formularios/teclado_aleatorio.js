let contraseñaArray = new Array(6).fill(""); // Inicializa un array de 6 posiciones con valores vacíos

function mostrarteclado() {
    for (let i = 0; i < 10; i++) {
        var boton = document.getElementById(i.toString());

        if (boton.style.display == "none") {
            boton.style.display = "block";
        } else {
            boton.style.display = "none";
        }
    }
}

let numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let i = 0; i < 10; i++) {
    let aleatorio = Math.floor(Math.random() * numeros.length);
    document.getElementById(i.toString()).value = numeros[aleatorio];
    document.getElementById(i.toString()).innerHTML = numeros[aleatorio]; // Mostrar el número en el botón
    numeros.splice(aleatorio, 1);
}

let asteriscos = [0, 1, 2, 3, 4, 5];
let numerosAleatorios = [];

for (let i = 0; i < 3; i++) {
    let naleatorio = Math.floor(Math.random() * asteriscos.length);
    numerosAleatorios.push(asteriscos[naleatorio]);
    asteriscos.splice(naleatorio, 1);
}

numerosAleatorios.forEach(numero => {
    document.getElementById("con" + numero.toString()).innerHTML = "*";
    contraseñaArray[numero] = "*"; // Guarda el asterisco en el array
});

let ultimaPosicionBorrada = 0;

function obtenerContraseña() {
    return contraseñaArray.join(""); // Convierte el array en una cadena
}

const botones = document.querySelectorAll('.teclado');

botones.forEach(function (boton) {
    boton.addEventListener('click', function () {
        while (numerosAleatorios.includes(ultimaPosicionBorrada)) {
            ultimaPosicionBorrada++;
        }

        const valorBoton = this.textContent;
        contraseñaArray[ultimaPosicionBorrada] = valorBoton; // Guarda el número en el array
        ultimaPosicionBorrada++;
        if (ultimaPosicionBorrada >= botones.length) {
            ultimaPosicionBorrada = 0;
        }

        // Muestra asterisco en lugar del número
        document.getElementById('con' + (ultimaPosicionBorrada - 1)).innerHTML = "*";
    });
});

var borrar = document.getElementById("borrar");

borrar.addEventListener('click', function () {
    if (ultimaPosicionBorrada > 0) {
        ultimaPosicionBorrada--;
        while (numerosAleatorios.includes(ultimaPosicionBorrada)) {
            ultimaPosicionBorrada--;
        }
        contraseñaArray[ultimaPosicionBorrada] = ""; // Borra el contenido del array
        var element = document.getElementById('con' + ultimaPosicionBorrada);
        element.textContent = ""; // Borra el contenido del elemento
    } else {
        alert("No hay más elementos para borrar.");
    }
});



















    
