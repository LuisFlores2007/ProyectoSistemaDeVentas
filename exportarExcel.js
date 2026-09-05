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
async function descargarInventarioExcel() {
    if (typeof ExcelJS === "undefined") {
        alert("No se pudo cargar la herramienta para guardar Excel. Revisa tu conexion a internet y vuelve a cargar la pagina.");
        return;
    }

    // Lee los datos mas recientes del inventario
    const inventarioActual = obtenerInventario();
    informacionMatriz.splice(0, informacionMatriz.length, ...inventarioActual);

    const clientesActuales = leerMatrizGuardada("clientesSistemaVentas", window.informacionMatrizClientes);
    const proveedoresActuales = leerMatrizGuardada("proveedoresSistemaVentas", window.informacionMatrizProveedores);
    const ventasActuales = leerMatrizGuardada("ventasSistemaVentas", []);

    try {
        const libroTrabajo = new ExcelJS.Workbook();
        const hojaInventario = libroTrabajo.addWorksheet("Inventario");
        hojaInventario.columns = [
            { header: "ID", key: "id", width: 16 },
            { header: "Categoria", key: "categoria", width: 18 },
            { header: "Imagen", key: "imagen", width: 16 },
            { header: "Nombre", key: "nombre", width: 24 },
            { header: "Precio", key: "precio", width: 14 },
            { header: "Cantidad", key: "cantidad", width: 14 }
        ];

        for (const fila of inventarioActual) {
            const filaExcel = hojaInventario.addRow([fila[0], fila[1], "", fila[3], fila[4], fila[5]]);
            filaExcel.height = 60;
            if (typeof fila[2] === "string" && fila[2].startsWith("data:")) {
                const imagenPng = await convertirImagenAPng(fila[2]);
                if (imagenPng) {
                    const imagenId = libroTrabajo.addImage({ base64: imagenPng, extension: "png" });
                    hojaInventario.addImage(imagenId, {
                        tl: { col: 2, row: filaExcel.number - 1 },
                        ext: { width: 90, height: 70 }
                    });
                }
            }
        }

        agregarHojaDatos(libroTrabajo, "Proveedores", [
            ["Nombre", "Cedula", "Razon social", "Tipo de producto", "Telefono", "Correo", "Numero de cuenta"],
            ...proveedoresActuales
        ]);
        agregarHojaDatos(libroTrabajo, "Clientes", [
            ["Nombre", "Cedula", "Telefono", "Correo"],
            ...clientesActuales
        ]);
        agregarHojaDatos(libroTrabajo, "Ventas", [
            ["Numero venta", "Fecha", "Cliente", "Cedula cliente", "ID producto", "Producto", "Cantidad", "Precio unitario", "Subtotal", "Descuento", "Total"],
            ...ventasActuales
        ]);

        const contenidoExcel = await libroTrabajo.xlsx.writeBuffer();
        const archivoExcel = new Blob([contenidoExcel], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        const enlaceDescarga = document.createElement("a");
        enlaceDescarga.href = URL.createObjectURL(archivoExcel);
        enlaceDescarga.download = "sistema_ventas.xlsx";
        document.body.appendChild(enlaceDescarga);
        enlaceDescarga.click();
        enlaceDescarga.remove();
        setTimeout(() => URL.revokeObjectURL(enlaceDescarga.href), 1000);
    } catch (error) {
        console.error("Error al generar el archivo Excel:", error);
        alert("No se pudo generar el archivo Excel. Revisa la consola para ver el error.");
    }
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

// Agrega una hoja con filas normales de datos
function agregarHojaDatos(libroTrabajo, nombre, datos) {
    const hojaTrabajo = libroTrabajo.addWorksheet(nombre);
    datos.forEach(fila => hojaTrabajo.addRow(fila));
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

// Actualiza la pantalla con el inventario guardado
function actualizarExcel() {
    const inventarioGuardado = obtenerInventario();
    informacionMatriz.splice(0, informacionMatriz.length, ...inventarioGuardado);
    mostrarInformacionMatriz();
    mostrarEstadoCargaExcel();
    alert("Datos actualizados desde localStorage");
}

// Convierte la imagen guardada en el sistema a PNG para Excel
function convertirImagenAPng(dataUrl) {
    return new Promise(resolve => {
        const imagen = new Image();

        imagen.onload = function() {
            const lienzo = document.createElement("canvas");
            lienzo.width = imagen.width;
            lienzo.height = imagen.height;
            lienzo.getContext("2d").drawImage(imagen, 0, 0);
            resolve(lienzo.toDataURL("image/png"));
        };

        imagen.onerror = function() {
            resolve(null);
        };

        imagen.src = dataUrl;
    });
}