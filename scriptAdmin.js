// Cambia el título principal cuando la persona hace clic en un botón del menú
function cambiarSeccionVista(nombreDeLaSeccion) {
    // Variable para guardar la etiqueta HTML del título
    const tituloPantallaActual = document.getElementById('titulo-pantalla-actual');
    
    // Le asignamos el nuevo texto según el botón presionado
    tituloPantallaActual.textContent = nombreDeLaSeccion;

    // Variable con la lista de todos los botones del menú
    const listaDeBotones = document.querySelectorAll('.boton-opcion');
    
    // Recorremos cada botón para resaltar únicamente el que fue presionado
    listaDeBotones.forEach(botonActual => {
        const textoDelBoton = botonActual.textContent.trim();
        
        if (textoDelBoton === nombreDeLaSeccion) {
            botonActual.classList.add('active'); // Resalta el botón
        } else {
            botonActual.classList.remove('active'); // Quita el resalte
        }
    });
}

// Muestra una confirmación simple cuando presiona Salir
function cerrarSesionUsuario() {
    alert("Cerrando sesión de Administrador...");
}