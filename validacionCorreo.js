// Revisa las partes basicas que debe tener una direccion de correo
function validarCorreo(correo) {

    // Rechaza un correo que no tenga contenido
    if (correo === "") {
        return false;
    }

    // Separa el correo en usuario y dominio
    let partes = correo.split("@");

    // Un correo valido debe tener un solo arroba
    if (partes.length !== 2) {
        return false;
    }

    // Verifica que exista un usuario antes del arroba
    if (partes[0] === "") {
        return false;
    }

    // Verifica que exista un dominio despues del arroba
    if (partes[1] === "") {
        return false;
    }

    // El dominio debe tener un punto interno
    if (!partes[1].includes(".")) {
        return false;
    }

    // El dominio no puede terminar en punto
    if (partes[1].endsWith(".")) {
        return false;
    }

    // Confirma que el correo paso todas las revisiones
    return true;
}
// Busca el formulario de proveedores si existe en la pagina actual
let formularioProveedor = document.getElementById("proveedor");

if (formularioProveedor) {

    // Revisa el correo antes de permitir el envio del formulario
    formularioProveedor.addEventListener("submit", function(event) {

        // Obtiene el correo escrito por la persona
        let correo = document.getElementById("Iemail").value;

        if (!validarCorreo(correo)) {
            // Detiene el envio cuando el correo no es valido
            event.preventDefault();
            alert("Ingrese un correo electrónico válido.");
        }

    });
}
// Busca el formulario de clientes si existe en la pagina actual
let formularioCliente = document.getElementById("formularioCliente");

if (formularioCliente) {

    // Revisa el correo antes de permitir el envio del formulario
    formularioCliente.addEventListener("submit", function(event) {

        // Obtiene el correo escrito por la persona
        let correo = document.getElementById("Iemail").value;

        if (!validarCorreo(correo)) {
            // Detiene el envio cuando el correo no es valido
            event.preventDefault();
            alert("Ingrese un correo electrónico válido.");
        }

    });
}