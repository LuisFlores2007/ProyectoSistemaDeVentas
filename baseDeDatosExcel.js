// Funcion para cargar un archivo Excel de inventario y actualizar la matriz de productos
async function cargarInventarioExcel(evento) {
    // Obtiene el archivo seleccionado por el usuario en el input de tipo file
    const archivoExcel = evento.target.files[0];

    // Si no se selecciona ningun archivo detiene la ejecucion
    if (!archivoExcel) {
        return;
    }

    if (typeof XLSX === "undefined" || typeof ExcelJS === "undefined") {
        alert("No se pudieron cargar las herramientas de Excel. Revisa tu conexion a internet y vuelve a cargar la pagina.");
        return;
    }

    try {
        const datosExcel = await archivoExcel.arrayBuffer();
        let filasDeExcel;

        if (archivoExcel.name.toLowerCase().endsWith(".xlsx")) {
            const libroTrabajo = new ExcelJS.Workbook();
            await libroTrabajo.xlsx.load(datosExcel);
            const hojaTrabajo = libroTrabajo.worksheets[0];
            const imagenesPorFila = new Map();

            hojaTrabajo.getImages().forEach(imagen => {
                const rango = imagen.range;
                const fila = Math.floor(rango.tl.nativeRow ?? rango.tl.row);
                const imagenExcel = libroTrabajo.getImage(imagen.imageId);
                const dataUrl = convertirImagenExcelADataUrl(imagenExcel);
                if (dataUrl) {
                    imagenesPorFila.set(fila, dataUrl);
                }
            });

            filasDeExcel = [];
            hojaTrabajo.eachRow({ includeEmpty: true }, (fila, numeroFila) => {
                const valores = fila.values.slice(1);
                if (imagenesPorFila.has(numeroFila - 1)) {
                    valores[2] = imagenesPorFila.get(numeroFila - 1);
                }
                filasDeExcel.push(valores);
            });
        } else {
            const libroTrabajo = XLSX.read(datosExcel, { type: "array" });
            const hojaTrabajo = libroTrabajo.Sheets[libroTrabajo.SheetNames[0]];
            filasDeExcel = XLSX.utils.sheet_to_json(hojaTrabajo, { header: 1 });
        }

        // Si la hoja esta vacia o no tiene filas, muestra una alerta y termina
        if (filasDeExcel.length === 0) {
            alert("El archivo Excel esta vacio.");
            return;
        }

        const encabezadosOriginales = filasDeExcel.shift();

        // Limpia y normaliza los encabezados (quita espacios y mayusculas para evitar errores)
        const encabezadosNormalizados = encabezadosOriginales.map(function(encabezado) {
            return String(encabezado)
                .toLowerCase()
                .trim()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replaceAll(" ", "");
        });

        // Define las posiciones esperadas de las columnas en el Excel
        const posicionId = encabezadosNormalizados.indexOf("id");
        const posicionCategoria = encabezadosNormalizados.indexOf("categoria");
        const posicionImagen = encabezadosNormalizados.indexOf("imagen");
        const posicionNombre = encabezadosNormalizados.indexOf("nombre");
        const posicionPrecio = encabezadosNormalizados.indexOf("precio");
        const posicionCantidad = encabezadosNormalizados.indexOf("cantidad");

        // Verifica que todas las columnas obligatorias existan en el Excel
        if (posicionId === -1 || posicionCategoria === -1 || posicionImagen === -1 || 
            posicionNombre === -1 || posicionPrecio === -1 || posicionCantidad === -1) {
            alert("El Excel debe contener las columnas: ID, Categoria, Imagen, Nombre, Precio y Cantidad.");
            return;
        }

        const nuevosProductos = [];
        for (let indiceFila = 0; indiceFila < filasDeExcel.length; indiceFila = indiceFila + 1) {
            const filaActual = filasDeExcel[indiceFila];

            // Ignora las filas que esten completamente vacias
            if (filaActual.length === 0) {
                continue;
            }

            const idProducto = filaActual[posicionId] ?? "";
            const categoriaProducto = filaActual[posicionCategoria] ?? "";
            const imagenProducto = filaActual[posicionImagen] ?? "";
            const nombreProducto = filaActual[posicionNombre] ?? "";
            const precioProducto = filaActual[posicionPrecio] ?? "";
            const cantidadProducto = filaActual[posicionCantidad] ?? "";

            // Agrega la fila ordenada que utiliza tu sistema de inventario
            nuevosProductos.push([
                String(idProducto),
                String(categoriaProducto),
                String(imagenProducto),
                String(nombreProducto),
                String(precioProducto),
                String(cantidadProducto)
            ]);
        }

        // Vacia la matriz actual de productos y agrega los nuevos datos cargados del Excel
        informacionMatriz.splice(0, informacionMatriz.length, ...nuevosProductos);

        // Guarda el inventario actualizado en el almacenamiento local (localStorage)
        guardarInventario(informacionMatriz);
        localStorage.setItem("nombreUltimoExcel", archivoExcel.name);
        localStorage.setItem("fechaUltimaCargaExcel", new Date().toLocaleString());

        // Actualiza la pantalla para mostrar las tarjetas con los productos nuevos
        mostrarInformacionMatriz();

        alert("Inventario actualizado correctamente con " + nuevosProductos.length + " producto(s).");
        mostrarEstadoCargaExcel();
        evento.target.value = "";
    } catch (error) {
        console.error("Error al cargar el archivo Excel:", error);
        alert("No se pudo cargar el archivo Excel. Verifica que sea un archivo valido.");
    }
}

function convertirImagenExcelADataUrl(imagenExcel) {
    if (imagenExcel.base64) {
        return imagenExcel.base64;
    }

    if (!imagenExcel.buffer) {
        return "";
    }

    const bytes = new Uint8Array(imagenExcel.buffer);
    let binario = "";
    for (let indice = 0; indice < bytes.length; indice = indice + 1) {
        binario += String.fromCharCode(bytes[indice]);
    }
    return "data:image/" + imagenExcel.extension + ";base64," + btoa(binario);
}

function mostrarEstadoCargaExcel() {
    const estado = document.getElementById("estadoCargaExcel");
    const fecha = localStorage.getItem("fechaUltimaCargaExcel");
    const nombre = localStorage.getItem("nombreUltimoExcel");

    if (estado && fecha) {
        estado.textContent = "Archivo " + nombre + " cargado el " + fecha;
    }
}

mostrarEstadoCargaExcel();