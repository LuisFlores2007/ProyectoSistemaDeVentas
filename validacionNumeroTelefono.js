// Obtiene el telefono escrito y muestra si cumple el formato esperado

function numeroCelular() {
    // Lee el valor actual del campo de telefono
    let numeroTelf = document.getElementById("telefono").value;
    // Busca el elemento donde se mostrara el resultado de la validacion
    let mensajeTelf = document.getElementById("mensajeTelf");

    // Limpia el mensaje cuando el campo esta vacio
    if (numeroTelf.length === 0) {
        mensajeTelf.innerHTML = "";
        return;
    }

    // Verifica que el telefono comience con cero
    if (numeroTelf[0] != 0) {
        mensajeTelf.innerHTML = "El número debe empezar por cero";
        mensajeTelf.style.color = "#ff5252";
        return;
    }

    // Verifica que el telefono tenga diez caracteres numericos
    if (numeroTelf.length != 10 || isNaN(numeroTelf)) {
        mensajeTelf.innerHTML = "El número cceluar debe tener 10 digitos";
        mensajeTelf.style.color = "#ff5252";
        return;
    }

    // Informa que el telefono cumple las reglas
    else {
        mensajeTelf.innerHTML = "✓ Teléfono válido";
        mensajeTelf.style.color = "#00a8ff";
    }
}

