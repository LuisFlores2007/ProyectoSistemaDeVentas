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


