// Lista de tipos de imágenes y número de imágenes por tipo
const tiposImagenes = ['coche', 'moto', 'avion'];
const imagenesPorTipo = 6;

// Número aleatorio entre min y max (ambos inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para cargar imágenes aleatorias en la tabla
function cargarCaptcha() {
    const tabla = document.getElementById('captchaTable');
    tabla.innerHTML = '';

    const imagenesTotales = 9;
    let imagenesEspecificadas = 0;

    // Seleccionar aleatoriamente el tipo de imágenes a mostrar
    const tipoAValidar = tiposImagenes[getRandomInt(0, tiposImagenes.length - 1)];

    // Actualizar el título con el tipo de imágenes a validar
    document.getElementById('captchaTitle').innerText = `Selecciona las imágenes de ${tipoAValidar}s:`;

    // Lista para rastrear las imágenes ya seleccionadas
    const imagenesSeleccionadas = new Set();

    for (let i = 0; i < 3; i++) {
        const fila = tabla.insertRow(i);

        for (let j = 0; j < 3; j++) {
            const celda = fila.insertCell(j);

            // Asegurarse de que la cantidad total de imágenes sea 9
            if (imagenesEspecificadas < 3 && Math.random() < 0.5) {
                // Mostrar una imagen del tipo especificado
                let numero;
                do {
                    numero = getRandomInt(1, imagenesPorTipo);
                } while (imagenesSeleccionadas.has(`${tipoAValidar}${numero}`));

                const imagen = document.createElement('img');
                imagen.src = `${tipoAValidar}s/${tipoAValidar}${numero}.jpg`;
                imagen.alt = `${tipoAValidar} ${numero}`;
                imagen.dataset.tipo = tipoAValidar;
                imagen.addEventListener('click', toggleSeleccion);
                celda.appendChild(imagen);
                imagenesEspecificadas++;
                imagenesSeleccionadas.add(`${tipoAValidar}${numero}`);
            } else {
                // Mostrar una imagen de cualquier tipo
                let tipoAleatorio, numeroAleatorio;
                do {
                    tipoAleatorio = tiposImagenes[getRandomInt(0, tiposImagenes.length - 1)];
                    numeroAleatorio = getRandomInt(1, imagenesPorTipo);
                } while (imagenesSeleccionadas.has(`${tipoAleatorio}${numeroAleatorio}`));

                const imagen = document.createElement('img');
                imagen.src = `${tipoAleatorio}s/${tipoAleatorio}${numeroAleatorio}.jpg`;
                imagen.alt = `${tipoAleatorio} ${numeroAleatorio}`;
                imagen.dataset.tipo = tipoAleatorio;
                imagen.addEventListener('click', toggleSeleccion);
                celda.appendChild(imagen);
                imagenesSeleccionadas.add(`${tipoAleatorio}${numeroAleatorio}`);
            }
        }
    }
}

// Función para alternar la selección de imágenes
function toggleSeleccion() {
    this.classList.toggle('selected');
}

// Función para validar el captcha
function validarCaptcha() {
    const imagenesSeleccionadas = document.querySelectorAll('.selected');
    const tipoAValidar = imagenesSeleccionadas.length > 0 ? imagenesSeleccionadas[0].dataset.tipo : '';

    const imagenesCorrectas = Array.from(imagenesSeleccionadas).every(imagen => imagen.dataset.tipo === tipoAValidar);

    if (imagenesCorrectas && imagenesSeleccionadas.length >= 3 && imagenesSeleccionadas.length <= 6) {
        alert('Captcha validado correctamente');
        window.location.href ="../index.html";
    } else {
        alert('Captcha no validado. Selecciona entre 3 y 6 imágenes correctas del tipo especificado.');
    }

    cargarCaptcha();
}

cargarCaptcha();