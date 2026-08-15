function validarCorreo(correo) {

    if (correo === "") {
        return false;
    }

    let partes = correo.split("@");

    if (partes.length !== 2) {
        return false;
    }

    if (partes[0] === "") {
        return false;
    }

    if (partes[1] === "") {
        return false;
    }

    if (!partes[1].includes(".")) {
        return false;
    }

    if (partes[1].endsWith(".")) {
        return false;
    }

    return true;
}



let formularioProveedor = document.getElementById("proveedor");

if (formularioProveedor) {

    formularioProveedor.addEventListener("submit", function(event) {

        let correo = document.getElementById("Iemail").value;

        if (!validarCorreo(correo)) {
            event.preventDefault();
            alert("Ingrese un correo electrónico válido.");
        }

    });
}



let formularioCliente = document.getElementById("formularioCliente");

if (formularioCliente) {

    formularioCliente.addEventListener("submit", function(event) {

        let correo = document.getElementById("Iemail").value;

        if (!validarCorreo(correo)) {
            event.preventDefault();
            alert("Ingrese un correo electrónico válido.");
        }

    });
}