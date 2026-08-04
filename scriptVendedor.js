// Función para cambiar el texto en el centro al presionar cualquier opción del vendedor
function cambiarSeccionVista(nombreDeLaSeccion) {
    // Guardamos la etiqueta HTML en la variable
    const tituloPantallaActual = document.getElementById('titulo-pantalla-actual');
    
    // Le asignamos el nuevo texto
    tituloPantallaActual.textContent = nombreDeLaSeccion;

    // Guardamos la lista con todos los botones
    const listaDeBotones = document.querySelectorAll('.boton-opcion');
    
    // Recorremos los botones para cambiar el estado activo
    listaDeBotones.forEach(botonActual => {
        const textoDelBoton = botonActual.textContent.trim();
        
        if (textoDelBoton === nombreDeLaSeccion) {
            botonActual.classList.add('active'); // Activa el color azul/celeste
        } else {
            botonActual.classList.remove('active'); // Desactiva el resto
        }
    });
}

// Acción del botón salir
function cerrarSesionUsuario() {
    alert("Cerrando sesión de Vendedor...");
    window.location.href = "index.login.html"; // Redirige a la página de inicio de sesión
}
