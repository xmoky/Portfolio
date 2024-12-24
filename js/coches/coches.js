const table = document.getElementById('table');
        const addForm = document.getElementById('addForm');
        let newRow;

        function fetchData() {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'php/tabla_coches/obtener_datos.php');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    populateTable(xhr.responseText);
                }
            };
            xhr.send();
        }


        function populateTable(responseText) {
            const data = JSON.parse(responseText);
            const tbody = table.querySelector('tbody');

            // Limpiar tbody antes de agregar nuevas filas
            tbody.innerHTML = '';

            data.forEach(function (obj) {
                const row = createRow(obj);
                tbody.appendChild(row);
            });
        }


        // Create a new row with data
        function createRow(obj, row) {
            row = row || document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.innerText = obj.id;

            const matriculaCell = document.createElement('td');
            matriculaCell.innerText = obj.Matricula;

            const marcaCell = document.createElement('td');
            marcaCell.innerText = obj.Marca;

            const modeloCell = document.createElement('td');
            modeloCell.innerText = obj.Modelo;

            const precioHoraCell = document.createElement('td');
            precioHoraCell.innerText = obj.PrecioHora;

            const numPlazasCell = document.createElement('td');
            numPlazasCell.innerText = obj.NumPlazas;

            const zonaCell = document.createElement('td');
            zonaCell.innerText = obj.Zona;

            const disponibilidadCell = document.createElement('td');
            disponibilidadCell.innerText = obj.Disponibilidad;

            const opcionesCell = document.createElement('td');
            opcionesCell.innerText = obj.Opciones;

            const cells = [idCell, matriculaCell, marcaCell, modeloCell, precioHoraCell, numPlazasCell, zonaCell, disponibilidadCell, opcionesCell];
            cells.forEach(cell => {
                cell.classList.add('editable-cell');
                cell.setAttribute('contenteditable', 'true');
                cell.addEventListener('focus', () => {
                    cell.classList.add('editing');
                });
                cell.addEventListener('blur', () => {
                    cell.classList.remove('editing');
                    onBlurCell(row);
                });
            });
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Borrar';
            deleteButton.addEventListener('click', () => onDeleteRow(row, obj.id));

            const accionesCell = document.createElement('td');
            accionesCell.appendChild(deleteButton);


            row.appendChild(idCell);
            row.appendChild(matriculaCell);
            row.appendChild(marcaCell);
            row.appendChild(modeloCell);
            row.appendChild(precioHoraCell);
            row.appendChild(numPlazasCell);
            row.appendChild(zonaCell);
            row.appendChild(disponibilidadCell);
            row.appendChild(opcionesCell);
            row.appendChild(accionesCell);

            // Agregar el ID como atributo de datos a la fila
            row.setAttribute('data-id', obj.id);

            return row;
        }
        function onBlurCell(row) {
            const cells = row.querySelectorAll('.editable-cell');
            const id = row.getAttribute('data-id');

            const updatedData = {
                Matricula: cells[1].innerText,
                Marca: cells[2].innerText,
                Modelo: cells[3].innerText,
                PrecioHora: cells[4].innerText,
                NumPlazas: cells[5].innerText,
                Zona: cells[6].innerText,
                Disponibilidad: cells[7].innerText,
                Opciones: cells[8].innerText
            };

            updateRowInDatabase(id, updatedData);
        }



        function updateRowInDatabase(id, updatedData) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'php/tabla_coches/actualizar_fila.php');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                }
            };

            const data = `id=${encodeURIComponent(id)}&data=${encodeURIComponent(JSON.stringify(updatedData))}`;
            xhr.send(data);
        }



        function onDeleteRow(row, id) {
            table.deleteRow(row.rowIndex);
            deleteRowFromDatabase(id);
        }

        function deleteRowFromDatabase(id) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'php/tabla_coches/eliminar_fila.php');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                }
            };

            const data = 'ID=' + encodeURIComponent(id);
            xhr.send(data);
        }

        function showAddForm() {
            addForm.style.display = 'block';
        }


        function saveFormData(event) {
            event.preventDefault();

            const matricula = document.getElementById('matricula').value;
            const marca = document.getElementById('marca').value;
            const modelo = document.getElementById('modelo').value;
            const precio = document.getElementById('precio').value;
            const plazas = document.getElementById('plazas').value;
            const zona = document.getElementById('zona').value;
            const disponibilidad = document.getElementById('disponibilidad').value;
            const opciones = document.getElementById('opciones').value;

            // Envia los datos al servidor 
            const formData = new FormData();
            formData.append('matricula', matricula);
            formData.append('marca', marca);
            formData.append('modelo', modelo);
            formData.append('precio', precio);
            formData.append('plazas', plazas);
            formData.append('zona', zona);
            formData.append('disponibilidad', disponibilidad);
            formData.append('opciones', opciones);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'php/tabla_coches/guardar_fila.php');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                    // Actualiza la tabla después de agregar la fila
                    fetchData();
                    // Oculta el formulario
                    cancelAdd();
                }
            };
            xhr.send(formData);
        }

        fetchData();