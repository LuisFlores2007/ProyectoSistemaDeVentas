// Funcion para leer una matriz guardada en el navegador
function leerMatrizGuardada(clave, matrizActual) {
    const datosGuardados = localStorage.getItem(clave);

    if (!datosGuardados) {
        return matrizActual || [];
    }

    try {
        const matrizGuardada = JSON.parse(datosGuardados);
        return Array.isArray(matrizGuardada) ? matrizGuardada : matrizActual || [];
    } catch (error) {
        return matrizActual || [];
    }
}

// Funcion para descargar todos los datos en hojas separadas
function descargarInventarioExcel() {
    // Lee los datos mas recientes del inventario
    const inventarioActual = obtenerInventario();
    informacionMatriz.splice(0, informacionMatriz.length, ...inventarioActual);

    const clientesActuales = leerMatrizGuardada("clientesSistemaVentas", window.informacionMatrizClientes);
    const proveedoresActuales = leerMatrizGuardada("proveedoresSistemaVentas", window.informacionMatrizProveedores);
    const ventasActuales = leerMatrizGuardada("ventasSistemaVentas", []);

    // Valida si existe algun dato para crear el archivo
    if (inventarioActual.length === 0 && clientesActuales.length === 0 && proveedoresActuales.length === 0 && ventasActuales.length === 0) {
        alert("No hay datos guardados para descargar.");
        return;
    }

    // Crea una hoja para cada grupo de datos
    const hojasExcel = [
        crearHojaExcel("Inventario", [
        ["ID", "Categoria", "Imagen", "Nombre", "Precio", "Cantidad"],
        ...inventarioActual
        ]),
        crearHojaExcel("Proveedores", [
        ["Nombre", "Cedula", "Razon social", "Tipo de producto", "Telefono", "Correo", "Numero de cuenta"],
        ...proveedoresActuales
        ]),
        crearHojaExcel("Clientes", [
        ["Nombre", "Cedula", "Telefono", "Correo"],
        ...clientesActuales
        ]),
        crearHojaExcel("Ventas", [
        ["Fecha", "ID producto", "Producto", "Cantidad", "Precio unitario", "Total"],
        ...ventasActuales
        ])
    ].join("");

    // Forma un libro Excel sin usar librerias externas
    const contenidoExcel = `<?xml version="1.0"?>
        <?mso-application progid="Excel.Sheet"?>
        <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
            xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:x="urn:schemas-microsoft-com:office:excel"
            xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
            ${hojasExcel}
        </Workbook>`;
    const archivoExcel = new Blob([contenidoExcel], { type: "application/vnd.ms-excel" });
    const enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = URL.createObjectURL(archivoExcel);
    enlaceDescarga.download = "sistema_ventas.xls";
    document.body.appendChild(enlaceDescarga);
    enlaceDescarga.click();
    enlaceDescarga.remove();
    URL.revokeObjectURL(enlaceDescarga.href);
}

// Crea una hoja con sus filas y columnas
function crearHojaExcel(nombreHoja, datos) {
    const filas = datos.map((fila, indiceFila) => {
        const celdas = fila.map(dato => {
            const tipoDato = typeof dato === "number" ? "Number" : "String";
            return `<Cell><Data ss:Type="${tipoDato}">${escaparDatoExcel(dato)}</Data></Cell>`;
        }).join("");
        return `<Row>${celdas}</Row>`;
    }).join("");

    return `<Worksheet ss:Name="${escaparDatoExcel(nombreHoja)}"><Table>${filas}</Table></Worksheet>`;
}

// Protege los datos para que sean validos en XML
function escaparDatoExcel(dato) {
    return String(dato ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");
}

// Funcion para actualizar y refrescar la vista visual del inventario
function actualizarVistaInventario() {
    // Vuelve a cargar el inventario desde el almacenamiento local
    const inventarioActualizado = obtenerInventario();

    // Actualiza la matriz global con los datos mas recientes
    informacionMatriz.splice(0, informacionMatriz.length, ...inventarioActualizado);

    // Dibuja nuevamente los productos en la pantalla
    mostrarInformacionMatriz();

    // Muestra un aviso de confirmacion
    alert("Vista de inventario actualizada correctamente.");
}

// Abre el selector para subir un Excel que ya fue editado
function actualizarExcel() {
    document.getElementById("datosExcel").click();
}