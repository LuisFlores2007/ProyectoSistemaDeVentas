const CLAVE_INVENTARIO = "inventarioSistemaVentas";
const PREFIJO_INVENTARIO_VENTANA = "sistemaVentasInventario:";
const CLAVE_LIMPIEZA_INICIAL = "sistemaVentasLimpiezaInicial";

// Quita datos viejos de prueba solo la primera vez
function limpiarDatosIniciales() {
    if (localStorage.getItem(CLAVE_LIMPIEZA_INICIAL)) {
        return;
    }

    localStorage.removeItem(CLAVE_INVENTARIO);
    localStorage.removeItem("clientesSistemaVentas");
    localStorage.removeItem("proveedoresSistemaVentas");
    localStorage.removeItem("ventasSistemaVentas");

    if (window.name.startsWith(PREFIJO_INVENTARIO_VENTANA)) {
        window.name = "";
    }

    localStorage.setItem(CLAVE_LIMPIEZA_INICIAL, "si");
}

limpiarDatosIniciales();

function obtenerInventario() {
    const inventarioGuardado = localStorage.getItem(CLAVE_INVENTARIO)
        || (window.name.startsWith(PREFIJO_INVENTARIO_VENTANA)
            ? window.name.slice(PREFIJO_INVENTARIO_VENTANA.length)
            : "");

    if (!inventarioGuardado) {
        return [];
    }

    try {
        const inventario = JSON.parse(inventarioGuardado);
        return Array.isArray(inventario) ? inventario : [];
    } catch (error) {
        console.error("No se pudo leer el inventario guardado.", error);
        return [];
    }
}

function guardarInventario(inventario) {
    const inventarioSerializado = JSON.stringify(inventario);
    localStorage.setItem(CLAVE_INVENTARIO, inventarioSerializado);
    window.name = PREFIJO_INVENTARIO_VENTANA + inventarioSerializado;
}

function convertirImagenADataUrl(archivo) {
    return new Promise((resolver, rechazar) => {
        const lector = new FileReader();
        lector.onload = () => resolver(lector.result);
        lector.onerror = () => rechazar(new Error("No se pudo leer la imagen del producto."));
        lector.readAsDataURL(archivo);
    });
}

function escaparHtml(valor) {
    return String(valor)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
