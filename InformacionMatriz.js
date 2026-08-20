// Guarda todos los productos mientras la pagina esta abierta
const informacionMatriz = [];

// Indica que producto se esta editando y -1 significa que es un producto nuevo
let indiceProductoEditando = -1;

// Lee el formulario y guarda un producto nuevo o actualiza uno existente
function guardarProducto(evento) {
    // Evita que el formulario recargue la pagina
    evento.preventDefault();

    // Obtiene la imagen seleccionada por el usuario
    const archivoImagen = document.getElementById("idImagenProducto").files[0];

    // Crea una fila con los datos en el mismo orden de los encabezados
    const nuevaFila = [
        document.getElementById("idProducto").value,
        document.getElementById("categoriaProducto").value,
        archivoImagen ? URL.createObjectURL(archivoImagen) : indiceProductoEditando >= 0 ? informacionMatriz[indiceProductoEditando][2] : "",
        document.getElementById("nombreProducto").value,
        document.getElementById("precioProducto").value,
        document.getElementById("cantidadProducto").value
    ];

    // Si hay un indice reemplaza el producto y si no agrega uno nuevo
    if (indiceProductoEditando >= 0) {
        informacionMatriz[indiceProductoEditando] = nuevaFila;
        indiceProductoEditando = -1;
        document.querySelector('#productos button[type="submit"]').textContent = "Guardar";
        document.getElementById("idImagenProducto").required = true;
    } else {
        informacionMatriz.push(nuevaFila);
    }

    // Actualiza la lista visible y limpia el formulario
    mostrarInformacionMatriz();
    document.getElementById("productos").reset();
}

// Dibuja los encabezados y todas las filas dentro del contenedor de productos
function mostrarInformacionMatriz() {
    // Busca el elemento HTML donde se mostraran los productos
    let contendedor = document.getElementById("contenedorTarjetas");

    // Borra la lista anterior para evitar productos repetidos
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
    // Recorre la matriz y crea una fila visual por cada producto
    for (let i = 0; i < informacionMatriz.length; i = i + 1) {
        // Obtiene los datos del producto actual
        let filaActual = informacionMatriz[i];
        let idProducto = filaActual[0];
        let categoriaProducto = filaActual[1];
        let idImagenProducto = filaActual[2];
        let nombreProducto = filaActual[3];
        let precioProducto = filaActual[4];
        let cantidadProducto = filaActual[5];
        // Inserta la informacion y los botones en el HTML
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

// Busca un producto por su ID lo elimina y vuelve a dibujar la lista
function eliminarProducto(idProducto) {
    const indiceProducto = informacionMatriz.findIndex(fila => fila[0] === idProducto);
    if (indiceProducto !== -1) {
        informacionMatriz.splice(indiceProducto, 1);
        mostrarInformacionMatriz();
    }
}

// Carga los datos del producto en el formulario para poder modificarlos
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

// Muestra los encabezados aunque todavia no existan productos
mostrarInformacionMatriz();