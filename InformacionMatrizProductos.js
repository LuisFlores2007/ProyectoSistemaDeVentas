// Conserva los productos registrados mientras la pagina esta abierta
const informacionMatriz = obtenerInventario();

// Guarda la posicion del producto que se esta editando
let indiceProductoEditando = -1;

function analizarCsv(texto) {
    const filas = [];
    let fila = [];
    let valor = "";
    let dentroDeComillas = false;

    for (let indice = 0; indice < texto.length; indice = indice + 1) {
        const caracter = texto[indice];
        const siguienteCaracter = texto[indice + 1];

        if (caracter === '"' && dentroDeComillas && siguienteCaracter === '"') {
            valor = valor + '"';
            indice = indice + 1;
        } else if (caracter === '"') {
            dentroDeComillas = !dentroDeComillas;
        } else if (caracter === "," && !dentroDeComillas) {
            fila.push(valor.trim());
            valor = "";
        } else if ((caracter === "\n" || caracter === "\r") && !dentroDeComillas) {
            if (caracter === "\r" && siguienteCaracter === "\n") {
                indice = indice + 1;
            }
            fila.push(valor.trim());
            if (fila.some(celda => celda !== "")) {
                filas.push(fila);
            }
            fila = [];
            valor = "";
        } else {
            valor = valor + caracter;
        }
    }

    fila.push(valor.trim());
    if (fila.some(celda => celda !== "")) {
        filas.push(fila);
    }
    return filas;
}

function normalizarImagenCsv(imagen) {
    if (!imagen || imagen.startsWith("data:") || imagen.startsWith("http://") || imagen.startsWith("https://")) {
        return imagen;
    }
    return new URL(imagen, window.location.href).href;
}

function cargarInventarioCsv(evento) {
    const archivoCsv = evento.target.files[0];
    if (!archivoCsv) {
        return;
    }

    const lector = new FileReader();
    lector.onload = () => {
        const filas = analizarCsv(String(lector.result));
        const encabezados = filas.shift() || [];
        const encabezadosNormalizados = encabezados.map(encabezado => encabezado
            .replace(/^\uFEFF/, "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replaceAll(" ", ""));
        const posiciones = {
            id: encabezadosNormalizados.indexOf("id"),
            categoria: encabezadosNormalizados.indexOf("categoria"),
            imagen: encabezadosNormalizados.indexOf("imagen"),
            nombre: encabezadosNormalizados.indexOf("nombre"),
            precio: encabezadosNormalizados.indexOf("precio"),
            cantidad: encabezadosNormalizados.indexOf("cantidad")
        };

        if (Object.values(posiciones).some(posicion => posicion === -1)) {
            alert("El CSV debe tener las columnas: ID, Categoria, Imagen, Nombre, Precio y Cantidad.");
            return;
        }

        const inventarioCsv = filas.map(fila => [
            fila[posiciones.id],
            fila[posiciones.categoria],
            normalizarImagenCsv(fila[posiciones.imagen]),
            fila[posiciones.nombre],
            fila[posiciones.precio],
            fila[posiciones.cantidad]
        ]);

        if (inventarioCsv.some(producto => producto.some(valor => valor === ""))) {
            alert("El CSV contiene productos con campos vacíos.");
            return;
        }

        informacionMatriz.splice(0, informacionMatriz.length, ...inventarioCsv);
        guardarInventario(informacionMatriz);
        mostrarInformacionMatriz();
        alert(`Inventario cargado correctamente: ${inventarioCsv.length} producto(s).`);
    };
    lector.onerror = () => alert("No se pudo leer el archivo CSV.");
    lector.readAsText(archivoCsv);
}

// Lee el formulario y agrega un producto o actualiza uno existente
async function guardarProducto(evento) {
    // Evita que el formulario recargue la pagina
    evento.preventDefault();

    // Obtiene la imagen seleccionada por la persona
    const archivoImagen = document.getElementById("idImagenProducto").files[0];
    let imagenProducto = indiceProductoEditando >= 0 ? informacionMatriz[indiceProductoEditando][2] : "";

    if (archivoImagen) {
        imagenProducto = await convertirImagenADataUrl(archivoImagen);
    }

    // Reune los datos en el mismo orden que usa la matriz
    const nuevaFila = [
        document.getElementById("idProducto").value,
        document.getElementById("categoriaProducto").value,
        imagenProducto,
        document.getElementById("nombreProducto").value,
        document.getElementById("precioProducto").value,
        document.getElementById("cantidadProducto").value
    ];

    // Reemplaza la fila cuando se esta editando un producto
    if (indiceProductoEditando >= 0) {
        informacionMatriz[indiceProductoEditando] = nuevaFila;
        indiceProductoEditando = -1;
        document.querySelector('#productos button[type="submit"]').textContent = "Guardar";
        document.getElementById("idImagenProducto").required = true;
    // Agrega una fila nueva cuando no hay una edicion activa
    } else {
        informacionMatriz.push(nuevaFila);
    }

    guardarInventario(informacionMatriz);
    // Redibuja la matriz y limpia el formulario
    mostrarInformacionMatriz();
    document.getElementById("productos").reset();
}

// Dibuja los encabezados y las filas visibles de productos
function mostrarInformacionMatriz() {
    // Busca el contenedor donde aparecera la matriz
    let contendedor = document.getElementById("contenedorTarjetas");

    // Reemplaza el contenido anterior para evitar filas repetidas
    contendedor.innerHTML = `
        <div class="encabezadosProductos">
            <span>ID</span>
            <span>Imagen</span>
            <span>Nombre</span>
            <span>Categoría</span>
            <span>Precio</span>
            <span>Cantidad</span>
            <span>Acciones</span>
        </div>
    `;
    // Crea una fila visual por cada producto registrado
    for (let i = 0; i < informacionMatriz.length; i = i + 1) {
        // Separa los datos del producto para mostrar cada columna
        let filaActual = informacionMatriz[i];
        let idProducto = filaActual[0];
        let categoriaProducto = filaActual[1];
        let idImagenProducto = filaActual[2];
        let nombreProducto = filaActual[3];
        let precioProducto = filaActual[4];
        let cantidadProducto = filaActual[5];
        // Inserta la informacion y las acciones en el HTML
        contendedor.innerHTML += `
        <div class="tarjetaProducto">
            <span class="idProducto">${idProducto}</span>
            <img src="${idImagenProducto}" alt="Imagen del producto" class="imagenProducto">
            <h4 class="nombreProducto">${nombreProducto}</h4>
            <p class="categoriaProducto">${categoriaProducto}</p>
            <p class="precioProducto">$${precioProducto}</p>
            <p class="cantidadProducto">${cantidadProducto}</p>
            <div class="accionesProducto">
                <button class="btn btn-editar" type="button" onclick="editarProducto(${i})">Editar</button>
                <button class="btn btn-red" type="button" onclick="eliminarProducto('${idProducto}')">Eliminar</button>
            </div>
        </div>
        `;
    }
}

// Busca un producto por su identificador y vuelve a dibujar la matriz
function eliminarProducto(idProducto) {
    const indiceProducto = informacionMatriz.findIndex(fila => fila[0] === idProducto);
    if (indiceProducto !== -1) {
        informacionMatriz.splice(indiceProducto, 1);
        guardarInventario(informacionMatriz);
        mostrarInformacionMatriz();
    }
}

// Carga los datos de un producto en el formulario para editarlo
function editarProducto(indiceProducto) {
    const producto = informacionMatriz[indiceProducto];
    indiceProductoEditando = indiceProducto;

    document.getElementById("idProducto").value = producto[0];
    document.getElementById("categoriaProducto").value = producto[1];
    document.getElementById("nombreProducto").value = producto[3];
    document.getElementById("precioProducto").value = producto[4];
    document.getElementById("cantidadProducto").value = producto[5];
    document.getElementById("idImagenProducto").required = false;
    document.querySelector('#productos button[type="submit"]').textContent = "Actualizar";
    document.getElementById("productos").scrollIntoView({ behavior: "smooth" });
}

// Muestra los encabezados aunque aun no existan productos
mostrarInformacionMatriz();