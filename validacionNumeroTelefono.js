function soloNumeros(input, permitirDecimales = false, maxLongitud = null) {
    if (!input) return;

    let valor = input.value;

    if (permitirDecimales) {
        valor = valor.replace(/[^0-9.]/g, "");
        let partes = valor.split(".");
        if (partes.length > 2) {
            valor = partes.shift() + "." + partes.join("");
        }
    } else {
        valor = valor.replace(/\D/g, "");
    }

    if (maxLongitud !== null && valor.length > maxLongitud) {
        valor = valor.slice(0, maxLongitud);
    }

    input.value = valor;
}

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

