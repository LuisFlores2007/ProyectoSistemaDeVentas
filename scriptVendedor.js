// Cambia la seccion visible y marca el boton activo del menu
function mostrarSeccion(nombreSeccion) {
    // Busca el titulo los botones y las secciones de la pantalla
    const tituloPantalla = document.getElementById('tituloPantallaActual');
    const botonesMenu = document.querySelectorAll('.botonOpcion');
    const seccionesContenido = document.querySelectorAll('.contenidoSeccion');

    // Actualiza el titulo con la seccion seleccionada
    tituloPantalla.textContent = nombreSeccion;

    // Activa el boton cuyo texto coincide con la seccion elegida
        // Muestra solo la seccion que corresponde al boton elegido
    botonesMenu.forEach(botonActual => {
        // Compara el texto del boton con la seccion seleccionada
        const textoBoton = botonActual.textContent.trim();
        botonActual.classList.toggle('active', textoBoton === nombreSeccion);
    });

    seccionesContenido.forEach(seccionActual => {
        // Compara el nombre guardado en cada seccion con la seleccion actual
        const seccionEsperada = seccionActual.dataset.seccion;
        seccionActual.classList.toggle('active', seccionEsperada === nombreSeccion);
    });

    if (nombreSeccion === "Procesar venta") {
        mostrarInventarioVendedor();
    }
}

// Cierra la sesion del vendedor y vuelve al inicio
function cerrarSesionVendedor() {
    alert("Cerrando sesión de Vendedor...");
    // Regresa a la pantalla de inicio de sesion
    window.location.href = "index.login.html";
}

function mostrarInventarioVendedor() {
    const contenedor = document.getElementById("contenedorInventario");
    const inventario = obtenerInventario();

    if (inventario.length === 0) {
        contenedor.innerHTML = '<p class="textoVacio">No hay productos disponibles en el inventario.</p>';
        return;
    }

    contenedor.innerHTML = inventario.map((producto, indice) => `
        <article class="tarjetaInventario">
            <img src="${escaparHtml(producto[2] || "")}" alt="Imagen de ${escaparHtml(producto[3])}" class="imagenInventario">
            <div class="datosInventario">
                <h4>${escaparHtml(producto[3])}</h4>
                <span>${escaparHtml(producto[1])}</span>
                <strong>$${escaparHtml(producto[4])}</strong>
                <p>Stock disponible: <b>${Number(producto[5]) || 0}</b></p>
            </div>
            <div class="accionesInventario">
                <label for="cantidadVenta-${indice}">Cantidad</label>
                <input id="cantidadVenta-${indice}" type="number" min="1" max="${Number(producto[5]) || 0}" value="1">
                <button class="btn btn-red" type="button" onclick="venderProducto(${indice})">Vender</button>
            </div>
        </article>
    `).join("");
}

function venderProducto(indiceProducto) {
    const inventario = obtenerInventario();
    const producto = inventario[indiceProducto];
    const entradaCantidad = document.getElementById(`cantidadVenta-${indiceProducto}`);
    const cantidad = entradaCantidad ? Number(entradaCantidad.value) : 0;
    const stock = producto ? Number(producto[5]) : 0;

    if (!producto || !Number.isInteger(cantidad) || cantidad < 1 || cantidad > stock) {
        alert("La cantidad debe estar dentro del stock disponible.");
        return;
    }

    producto[5] = stock - cantidad;
    guardarInventario(inventario);
    mostrarInventarioVendedor();
}

mostrarInventarioVendedor();
window.addEventListener("storage", mostrarInventarioVendedor);
