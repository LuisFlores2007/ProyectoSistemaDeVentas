// Revisa las credenciales y dirige a la pantalla segun el tipo de usuario
function iniciarSesion() {

    // Lee el tipo de usuario el nombre y la contrasena
    let tipoUsuario = document.getElementById("tipoUsuario").value;
    let usuario = document.getElementById("usuario").value;
    let contrasena = document.getElementById("contrasena").value;

    // Comprueba las credenciales del administrador
    if (tipoUsuario == "administrador" &&
        usuario == "admin" &&
        contrasena == "1234") {

        document.getElementById("mensaje").innerHTML =
            "Bienvenido Administrador";
            // Abre la pantalla principal del administrador
            window.location.href = "IndexAdmin.html";

    } 
    // Comprueba las credenciales del empleado vendedor
    else if (tipoUsuario == "empleado" &&
             usuario == "vendedor" &&
             contrasena == "1234") {

        document.getElementById("mensaje").innerHTML =
            "Bienvenido Empleado";
            // Abre la pantalla principal del vendedor
            window.location.href = "IndexVendedor.html";

    } 
    // Informa que los datos ingresados no coinciden
    else {

        document.getElementById("mensaje").innerHTML =
            "Usuario o contraseña incorrectos";

    }
}