// Cambia el título principal y muestra el contenido correspondiente cuando la persona hace clic en un botón del menú
function mostrarSeccion(nombreSeccion) {
    const tituloPantalla = document.getElementById('tituloPantallaActual');
    const botonesMenu = document.querySelectorAll('.botonOpcion');
    const seccionesContenido = document.querySelectorAll('.contenidoSeccion');

    tituloPantalla.textContent = nombreSeccion;

    botonesMenu.forEach(botonActual => {
        const textoBoton = botonActual.textContent.trim();
        botonActual.classList.toggle('active', textoBoton === nombreSeccion);
    });

    seccionesContenido.forEach(seccionActual => {
        const seccionEsperada = seccionActual.dataset.seccion;
        seccionActual.classList.toggle('active', seccionEsperada === nombreSeccion);
    });
}

// Muestra una confirmación simple cuando presiona Salir
function cerrarSesionAdmin() {
    alert("Cerrando sesión de Administrador...");
    window.location.href = "index.login.html"; // Redirige a la página de inicio de sesión
}