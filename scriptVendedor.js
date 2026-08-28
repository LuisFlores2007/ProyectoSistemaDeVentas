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

const DESCUENTO_PORCENTAJE = 10;
let carritoVenta = [];

function mostrarInventarioVendedor() {
    const contenedor = document.getElementById("contenedorInventario");
    const inventario = obtenerInventario();

    cargarClientesVenta();

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
                <button class="btn btn-red" type="button" onclick="agregarAlCarrito(${indice})">Agregar</button>
            </div>
        </article>
    `).join("");
}

function actualizarDatosVendedor() {
    mostrarInventarioVendedor();
    mostrarCarrito();
    mostrarFacturas();
    alert("Datos actualizados correctamente");
}

function cargarClientesVenta() {
    const selector = document.getElementById("clienteVenta");
    const clientes = JSON.parse(localStorage.getItem("clientesSistemaVentas") || "[]");
    const clienteSeleccionado = selector.value;
    selector.innerHTML = '<option value="">Selecciona un cliente</option>';

    clientes.forEach((cliente, indice) => {
        selector.innerHTML += `<option value="${indice}">${escaparHtml(cliente[0])} - ${escaparHtml(cliente[1])}</option>`;
    });

    selector.value = clienteSeleccionado;
}

function agregarAlCarrito(indiceProducto) {
    const inventario = obtenerInventario();
    const producto = inventario[indiceProducto];
    const entradaCantidad = document.getElementById(`cantidadVenta-${indiceProducto}`);
    const cantidad = entradaCantidad ? Number(entradaCantidad.value) : 0;
    const stock = producto ? Number(producto[5]) : 0;
    const productoEnCarrito = carritoVenta.find(item => item.indice === indiceProducto);
    const cantidadActual = productoEnCarrito ? productoEnCarrito.cantidad : 0;

    if (!producto || !Number.isInteger(cantidad) || cantidad < 1 || cantidadActual + cantidad > stock) {
        alert("La cantidad debe estar dentro del stock disponible.");
        return;
    }

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
    } else {
        carritoVenta.push({
            indice: indiceProducto,
            id: producto[0],
            nombre: producto[3],
            precio: Number(producto[4]) || 0,
            cantidad: cantidad
        });
    }

    mostrarCarrito();
    entradaCantidad.value = 1;
}

function mostrarCarrito() {
    const contenedor = document.getElementById("carritoVenta");
    const subtotal = carritoVenta.reduce((total, item) => total + item.cantidad * item.precio, 0);
    const descuento = subtotal > 30 ? subtotal * DESCUENTO_PORCENTAJE / 100 : 0;
    const total = subtotal - descuento;

    if (carritoVenta.length === 0) {
        contenedor.innerHTML = '<p class="textoVacio">No hay productos seleccionados</p>';
    } else {
        contenedor.innerHTML = carritoVenta.map((item, indice) => `
            <div class="productoCarrito">
                <span>${escaparHtml(item.nombre)} x ${item.cantidad}</span>
                <strong>$${(item.cantidad * item.precio).toFixed(2)}</strong>
                <button class="btn btn-red" type="button" onclick="quitarDelCarrito(${indice})">Quitar</button>
            </div>
        `).join("");
    }

    document.getElementById("subtotalVenta").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("descuentoVenta").textContent = `$${descuento.toFixed(2)}`;
    document.getElementById("totalVenta").textContent = `$${total.toFixed(2)}`;
}

function quitarDelCarrito(indiceCarrito) {
    carritoVenta.splice(indiceCarrito, 1);
    mostrarCarrito();
}

function obtenerSiguienteNumeroVenta(ventasGuardadas) {
    const numerosVenta = ventasGuardadas
        .map(venta => String(venta[0] || ""))
        .filter(numero => /^\d{4,12}$/.test(numero))
        .map(numero => Number(numero))
        .filter(numero => Number.isSafeInteger(numero));
    const siguienteNumero = numerosVenta.length > 0 ? Math.max(...numerosVenta) + 1 : 1;

    return String(siguienteNumero).padStart(4, "0");
}

function confirmarVenta() {
    const selector = document.getElementById("clienteVenta");
    const clientes = JSON.parse(localStorage.getItem("clientesSistemaVentas") || "[]");
    const cliente = clientes[Number(selector.value)];

    if (!cliente) {
        alert("Selecciona un cliente antes de confirmar la venta.");
        return;
    }

    if (carritoVenta.length === 0) {
        alert("Agrega al menos un producto al carrito.");
        return;
    }

    const inventario = obtenerInventario();
    const subtotal = carritoVenta.reduce((total, item) => total + item.cantidad * item.precio, 0);
    const descuento = subtotal > 30 ? subtotal * DESCUENTO_PORCENTAJE / 100 : 0;
    const total = subtotal - descuento;
    const fecha = new Date().toLocaleString();
    const ventasGuardadas = JSON.parse(localStorage.getItem("ventasSistemaVentas") || "[]");
    const numeroVenta = obtenerSiguienteNumeroVenta(ventasGuardadas);

    carritoVenta.forEach(item => {
        inventario[item.indice][5] = Number(inventario[item.indice][5]) - item.cantidad;
        ventasGuardadas.push([
            numeroVenta,
            fecha,
            cliente[0],
            cliente[1],
            item.id,
            item.nombre,
            item.cantidad,
            item.precio,
            item.cantidad * item.precio,
            descuento * (item.cantidad * item.precio / subtotal),
            total * (item.cantidad * item.precio / subtotal)
        ]);
    });

    localStorage.setItem("ventasSistemaVentas", JSON.stringify(ventasGuardadas));
    guardarInventario(inventario);
    // Enviar factura automáticamente al correo del cliente
enviarFacturaPorCorreo(
    cliente,
    numeroVenta,
    fecha,
    carritoVenta,
    subtotal,
    descuento,
    total
);
    alert(`Venta confirmada por $${total.toFixed(2)}`);
    carritoVenta = [];
    mostrarCarrito();
    mostrarInventarioVendedor();
    mostrarFacturas();
}

mostrarInventarioVendedor();
mostrarCarrito();
mostrarFacturas();
window.addEventListener("storage", function() {
    mostrarInventarioVendedor();
    mostrarCarrito();
    mostrarFacturas();
});

function mostrarFacturas() {
    const contenedor = document.getElementById("facturasVenta");
    if (!contenedor) return;
    const ventas = JSON.parse(localStorage.getItem("ventasSistemaVentas") || "[]");

    if (ventas.length === 0) {
        contenedor.innerHTML = '<p class="textoVacio">Todavia no hay ventas registradas</p>';
        return;
    }

    const ventasUnicas = [...new Map(ventas.map(venta => [venta[0], venta])).values()];
    contenedor.innerHTML = ventasUnicas.reverse().map(venta => `
        <div class="facturaGuardada">
            <span>Venta ${venta[0]} Cliente ${escaparHtml(venta[2])}</span>
            <strong>$${Number(venta[10] || venta[5] || 0).toFixed(2)}</strong>
        </div>
    `).join("");
}
