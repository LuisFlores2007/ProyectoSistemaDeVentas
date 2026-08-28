// ==========================================
// VALIDACIÓN DE CORREO ELECTRÓNICO
// ==========================================

// Revisa las partes básicas que debe tener una dirección de correo
function validarCorreo(correo) {

    // Quita espacios al inicio y al final
    correo = correo.trim();

    // Rechaza un correo vacío
    if (correo === "") {
        return false;
    }

    // Separa el correo en usuario y dominio
    let partes = correo.split("@");

    // Debe existir un solo arroba
    if (partes.length !== 2) {
        return false;
    }

    // Debe existir texto antes del @
    if (partes[0] === "") {
        return false;
    }

    // Debe existir texto después del @
    if (partes[1] === "") {
        return false;
    }

    // El dominio debe tener un punto
    if (!partes[1].includes(".")) {
        return false;
    }

    // El dominio no puede comenzar con punto
    if (partes[1].startsWith(".")) {
        return false;
    }

    // El dominio no puede terminar en punto
    if (partes[1].endsWith(".")) {
        return false;
    }

    return true;
}

// ==========================================
// VALIDACIÓN MIENTRAS SE ESCRIBE
// ==========================================

function validarCorreoEnTiempoReal() {

    // Busca el campo de correo
    let campoCorreo = document.getElementById("Iemail");

    // Busca el lugar donde aparecerá el mensaje
    let mensajeCorreo = document.getElementById("mensajeCorreo");

    // Verifica que los elementos existan
    if (!campoCorreo || !mensajeCorreo) {
        return;
    }

    // Obtiene el correo escrito
    let correo = campoCorreo.value.trim();

    // Si está vacío, no muestra ningún mensaje
    if (correo === "") {
        mensajeCorreo.innerHTML = "";
        return;
    }

    // Si el correo NO es válido
    if (!validarCorreo(correo)) {

        mensajeCorreo.innerHTML = "Correo electrónico no válido";
        mensajeCorreo.style.color = "#ff5252";

        return;
    }

    // Si el correo SÍ es válido
    mensajeCorreo.innerHTML = "✓ Correo electrónico válido";
    mensajeCorreo.style.color = "#00a8ff";
}

// ==========================================
// VALIDACIÓN DEL FORMULARIO DE PROVEEDOR
// ==========================================

let formularioProveedor = document.getElementById("proveedor");

if (formularioProveedor) {

    formularioProveedor.addEventListener("submit", function(event) {

        let campoCorreo = document.getElementById("Iemail");

        if (!campoCorreo) {
            return;
        }

        let correo = campoCorreo.value.trim();

        // Si el correo no es válido, evita guardar
        if (!validarCorreo(correo)) {

            event.preventDefault();

            let mensajeCorreo = document.getElementById("mensajeCorreo");

            if (mensajeCorreo) {
                mensajeCorreo.innerHTML = "Correo electrónico no válido";
                mensajeCorreo.style.color = "#ff5252";
            }
        }

    });
}

// ==========================================
// VALIDACIÓN DEL FORMULARIO DE CLIENTE
// ==========================================

let formularioCliente = document.getElementById("formularioCliente");

if (formularioCliente) {

    formularioCliente.addEventListener("submit", function(event) {

        let campoCorreo = document.getElementById("Iemail");

        if (!campoCorreo) {
            return;
        }

        let correo = campoCorreo.value.trim();

        // Si el correo no es válido, evita guardar
        if (!validarCorreo(correo)) {

            event.preventDefault();

            let mensajeCorreo = document.getElementById("mensajeCorreo");

            if (mensajeCorreo) {
                mensajeCorreo.innerHTML = "Correo electrónico no válido";
                mensajeCorreo.style.color = "#ff5252";
            }
        }

    });
}