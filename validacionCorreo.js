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