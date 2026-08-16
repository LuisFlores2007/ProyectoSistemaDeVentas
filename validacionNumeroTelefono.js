//Definimos la funcion para validar el nuemro de telefono celular. 

function numeroCelular() {
    let numeroTelf = document.getElementById("telefono").value;
    let mensajeTelf = document.getElementById("mensajeTelf");

    if (numeroTelf.length === 0) {
        mensajeTelf.innerHTML = "";
        return;
    }

    if (numeroTelf[0] != 0) {
        mensajeTelf.innerHTML = "El número debe empezar por cero";
        mensajeTelf.style.color = "#ff5252";
        return;
    }

    if (numeroTelf.length != 10 || isNaN(numeroTelf)) {
        mensajeTelf.innerHTML = "El número cceluar debe tener 10 digitos";
        mensajeTelf.style.color = "#ff5252";
        return;
    }

    else {
        mensajeTelf.innerHTML = "✓ Teléfono válido";
        mensajeTelf.style.color = "#00a8ff";
    }
}

