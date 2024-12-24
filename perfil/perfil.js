function handleFiles(files) {
    var file = files[0];
    var img = document.createElement("img");
    img.classList.add("img-preview");

    img.file = file;
    document.getElementById("foto-perfil").innerHTML = "";
    document.getElementById("foto-perfil").appendChild(img);

    var reader = new FileReader();
    reader.onload = function (e) {
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function dropHandler(event) {
    event.preventDefault();
    var files = event.dataTransfer.files;
    handleFiles(files);
}

function dragOverHandler(event) {
    event.preventDefault();
}

// Función para enviar la imagen al servidor
function uploadFile(file) {
    var formData = new FormData();
    formData.append("file", file);

    fetch("upload.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Imagen subida con éxito:", data.url);

    })
    .catch(error => console.error("Error al subir la imagen:", error));
}
