function iniciarSesion() {

    let tipoUsuario = document.getElementById("tipoUsuario").value;
    let usuario = document.getElementById("usuario").value;
    let contrasena = document.getElementById("contrasena").value;

    if (tipoUsuario == "administrador" &&
        usuario == "admin" &&
        contrasena == "1234") {

        document.getElementById("mensaje").innerHTML =
            "Bienvenido Administrador";
            window.location.href = "IndexAdmin.html"; // Redirige a la página del administrador

    } 
    else if (tipoUsuario == "empleado" &&
             usuario == "vendedor" &&
             contrasena == "1234") {

        document.getElementById("mensaje").innerHTML =
            "Bienvenido Empleado";
            window.location.href = "indexVendedor.html"; // Redirige a la página del vendedor

    } 
    else {

        document.getElementById("mensaje").innerHTML =
            "Usuario o contraseña incorrectos";

    }
}