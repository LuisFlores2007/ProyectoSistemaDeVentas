function iniciarSesion() {

    let tipoUsuario = document.getElementById("tipoUsuario").value;
    let usuario = document.getElementById("usuario").value;
    let contrasena = document.getElementById("contrasena").value;

    if (tipoUsuario == "administrador" &&
        usuario == "admin" &&
        contrasena == "1234") {

        document.getElementById("mensaje").innerHTML =
            "Bienvenido Administrador";

    } 
    else if (tipoUsuario == "empleado" &&
             usuario == "empleado" &&
             contrasena == "1234") {

        document.getElementById("mensaje").innerHTML =
            "Bienvenido Empleado";

    } 
    else {

        document.getElementById("mensaje").innerHTML =
            "Usuario o contraseña incorrectos";

    }
}