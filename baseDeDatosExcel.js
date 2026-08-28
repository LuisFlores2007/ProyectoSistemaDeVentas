// Funcion para cargar un archivo Excel de inventario y actualizar la matriz de productos
function cargarInventarioExcel(evento) {
    // Obtiene el archivo seleccionado por el usuario en el input de tipo file
    const archivoExcel = evento.target.files[0];

    // Si no se selecciona ningun archivo detiene la ejecucion
    if (!archivoExcel) {
        return;
    }

    // Crea un lector de archivos para leer el contenido del Excel
    if (typeof XLSX === "undefined") {
        alert("No se pudo cargar la herramienta de Excel. Revisa tu conexion a internet.");
        return;
    }

    const lectorDeArchivos = new FileReader();

    // Evento que se ejecuta cuando el archivo termina de leerse
    lectorDeArchivos.onload = function(eventoLectura) {
        // Obtiene los datos binarios del archivo leido
        const datosBinarios = eventoLectura.target.result;

        // Lee el libro de trabajo de Excel usando la libreria XLSX
        const libroTrabajo = XLSX.read(datosBinarios, { type: "binary" });

        // Obtiene el nombre de la primera hoja del archivo Excel
        const nombrePrimeraHoja = libroTrabajo.SheetNames[0];

        // Obtiene la hoja de trabajo utilizando su nombre
        const hojaTrabajo = libroTrabajo.Sheets[nombrePrimeraHoja];

        // Convierte los datos de la hoja de Excel en una matriz de filas y columnas (JSON)
        const filasDeExcel = XLSX.utils.sheet_to_json(hojaTrabajo, { header: 1 });

        // Si la hoja esta vacia o no tiene filas, muestra una alerta y termina
        if (filasDeExcel.length === 0) {
            alert("El archivo Excel esta vacio.");
            return;
        }

        // Extrae la primera fila como encabezados de las columnas
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

        // Recorre las filas restantes del Excel y construye la nueva matriz de productos
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

        // Actualiza la pantalla para mostrar las tarjetas con los productos nuevos
        mostrarInformacionMatriz();

        // Muestra un mensaje de exito indicando cuantos productos se cargaron
        alert("Inventario actualizado correctamente con " + nuevosProductos.length + " producto(s).");
        evento.target.value = "";
    };

    // Lee el archivo Excel como una cadena binaria
    lectorDeArchivos.readAsBinaryString(archivoExcel);
}