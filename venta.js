// Define el porcentaje de descuento aplicado a compras mayores de treinta
const DESCUENTO_PORCENTAJE = 10;

// Guarda los productos seleccionados para la venta actual
let carritoVenta = [];

// Lee una lista guardada en el almacenamiento local
const leer = clave => JSON.parse(localStorage.getItem(clave) || "[]");

// Calcula el subtotal descuento y total de la venta actual
function calcularTotales() {
    const subtotal = carritoVenta.reduce((suma, p) => suma + p.cantidad * p.precio, 0);
    const descuento = subtotal > 30 ? subtotal * DESCUENTO_PORCENTAJE / 100 : 0;
    return { subtotal, descuento, total: subtotal - descuento };
}

// Muestra los productos disponibles para el vendedor
function mostrarInventarioVendedor() {
    const contenedor = document.getElementById("contenedorInventario");
    const inventario = obtenerInventario();

    cargarClientesVenta();

    // Informa cuando el inventario no tiene productos disponibles
    if (!inventario.length) {
        contenedor.innerHTML = '<p class="textoVacio">No hay productos disponibles en el inventario.</p>';
        return;
    }

    contenedor.innerHTML = inventario.map((p, i) => `
        <article class="tarjetaInventario">
            <img src="${escaparHtml(p[2] || "")}" class="imagenInventario">

            <div class="datosInventario">
                <h4>${escaparHtml(p[3])}</h4>
                <span>${escaparHtml(p[1])}</span>
                <strong>$${escaparHtml(p[4])}</strong>
                <p>Stock disponible: <b>${Number(p[5]) || 0}</b></p>
            </div>

            <div class="accionesInventario">
                <label>Cantidad</label>

                <input
                    id="cantidadVenta-${i}"
                    type="number"
                    min="1"
                    max="${Number(p[5]) || 0}"
                    value="1"
                >

                <button
                    class="btn btn-red"
                    type="button"
                    onclick="agregarAlCarrito(${i})"
                >
                    Agregar
                </button>
            </div>
        </article>
    `).join("");
}

// Carga los clientes guardados dentro del selector de ventas
function cargarClientesVenta() {
    const selector = document.getElementById("clienteVenta");
    const seleccionado = selector.value;

    selector.innerHTML =
        '<option value="">Selecciona un cliente</option>' +
        leer("clientesSistemaVentas").map((c, i) =>
            `<option value="${i}">${escaparHtml(c[0])} - ${escaparHtml(c[1])}</option>`
        ).join("");

    selector.value = seleccionado;
}

// Valida la cantidad y agrega un producto al carrito
function agregarAlCarrito(indice) {
    const producto = obtenerInventario()[indice];
    const input = document.getElementById(`cantidadVenta-${indice}`);
    const cantidad = Number(input.value);
    const stock = Number(producto[5]);

    const existente = carritoVenta.find(p => p.indice === indice);
    const cantidadActual = existente ? existente.cantidad : 0;

    // Evita cantidades invalidas o mayores al stock disponible
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidadActual + cantidad > stock) {
        alert("La cantidad debe estar dentro del stock disponible.");
        return;
    }

    // Aumenta la cantidad de un producto existente o crea una nueva linea
    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carritoVenta.push({
            indice,
            id: producto[0],
            nombre: producto[3],
            precio: Number(producto[4]),
            cantidad
        });
    }

    input.value = 1;
    mostrarCarrito();
}

// Muestra los productos del carrito y los valores de la venta
function mostrarCarrito() {
    const contenedor = document.getElementById("carritoVenta");
    const { subtotal, descuento, total } = calcularTotales();

    contenedor.innerHTML = carritoVenta.length
        ? carritoVenta.map((p, i) => `
            <div class="productoCarrito">
                <span>${escaparHtml(p.nombre)} x ${p.cantidad}</span>
                <strong>$${(p.cantidad * p.precio).toFixed(2)}</strong>

                <button
                    class="btn btn-red"
                    onclick="quitarDelCarrito(${i})"
                >
                    Quitar
                </button>
            </div>
        `).join("")
        : '<p class="textoVacio">No hay productos seleccionados</p>';

    document.getElementById("subtotalVenta").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("descuentoVenta").textContent = `$${descuento.toFixed(2)}`;
    document.getElementById("totalVenta").textContent = `$${total.toFixed(2)}`;
}

// Elimina un producto seleccionado del carrito
function quitarDelCarrito(indice) {
    carritoVenta.splice(indice, 1);
    mostrarCarrito();
}

// Genera el siguiente numero consecutivo para una venta
function obtenerSiguienteNumeroVenta(ventas) {
    const numeros = ventas.map(v => Number(v[0])).filter(Number.isSafeInteger);
    return String(numeros.length ? Math.max(...numeros) + 1 : 1).padStart(4, "0");
}

// Valida y registra la venta completa
function confirmarVenta() {
    const selector = document.getElementById("clienteVenta");

    // Exige seleccionar un cliente antes de registrar la venta
    if (selector.value === "") {
        alert("Selecciona un cliente antes de confirmar la venta.");
        return;
    }

    // Exige tener productos dentro del carrito
    if (!carritoVenta.length) {
        alert("Agrega al menos un producto al carrito.");
        return;
    }

    const cliente = leer("clientesSistemaVentas")[Number(selector.value)];
    const inventario = obtenerInventario();
    const ventas = leer("ventasSistemaVentas");

    const numero = obtenerSiguienteNumeroVenta(ventas);
    const fecha = new Date().toLocaleString();
    const { subtotal, descuento, total } = calcularTotales();

    // Descuenta el stock y crea una linea para cada producto vendido
    carritoVenta.forEach(p => {
        inventario[p.indice][5] -= p.cantidad;

        const subtotalProducto = p.cantidad * p.precio;
        const parte = subtotalProducto / subtotal;

        ventas.push([
            numero,
            fecha,
            cliente[0],
            cliente[1],
            p.id,
            p.nombre,
            p.cantidad,
            p.precio,
            subtotalProducto,
            descuento * parte,
            total * parte
        ]);
    });

    // Guarda las ventas y el inventario actualizado en el almacenamiento local
    localStorage.setItem("ventasSistemaVentas", JSON.stringify(ventas));
    guardarInventario(inventario);

    enviarFacturaPorCorreo(
        cliente,
        numero,
        fecha,
        carritoVenta,
        subtotal,
        descuento,
        total
    );

    alert(`Venta confirmada por $${total.toFixed(2)}`);

    carritoVenta = [];
    actualizarPantalla();
}

// Muestra el resumen de las facturas registradas
function mostrarFacturas() {
    const contenedor = document.getElementById("facturasVenta");
    if (!contenedor) return;

    const ventas = leer("ventasSistemaVentas");

    // Informa cuando aun no existen ventas registradas
    if (!ventas.length) {
        contenedor.innerHTML = '<p class="textoVacio">Todavia no hay ventas registradas</p>';
        return;
    }

    const facturas = {};

    // Agrupa las lineas de cada venta para calcular su total
    ventas.forEach(v => {
        if (!facturas[v[0]]) {
            facturas[v[0]] = {
                numero: v[0],
                cliente: v[2],
                total: 0
            };
        }

        facturas[v[0]].total += Number(v[10]) || 0;
    });

    contenedor.innerHTML = Object.values(facturas).reverse().map(f => `
        <div class="facturaGuardada">
            <span>Venta ${f.numero} Cliente ${escaparHtml(f.cliente)}</span>
            <strong>$${f.total.toFixed(2)}</strong>
        </div>
    `).join("");
}

// Actualiza inventario carrito y facturas en la pantalla
function actualizarPantalla() {
    mostrarInventarioVendedor();
    mostrarCarrito();
    mostrarFacturas();
}

// Actualiza los datos visibles y confirma la accion al vendedor
function actualizarDatosVendedor() {
    actualizarPantalla();
    alert("Datos actualizados correctamente");
}

// Carga la pantalla al iniciar y cuando cambia el almacenamiento local
actualizarPantalla();
window.addEventListener("storage", actualizarPantalla);