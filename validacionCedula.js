//Definimos la funcion para validar la cedula

function verificarCedula() {
    let cedula = document.getElementById("cedula").value;
    let mensajeCedula = document.getElementById("resultadoCedula");


    if (cedula.length === 0) {
        mensajeCedula.innerHTML = "";
        return;
    }

    
    if (cedula.length != 10 || isNaN(cedula)) {
        mensajeCedula.innerHTML = "La cédula debe tener 10 dígitos.";
        mensajeCedula.style.color = "#ff5252"; // Color rojo de advertencia/error
        return;
    }

    let sumaImpares = 0;
    let sumaPares = 0;

    for (let i = 0; i < 9; i++) {
        let numero = parseInt(cedula[i]);

        if (i % 2 == 0) {
            numero = numero * 2;
            if (numero > 9) {
                numero = numero - 9;
            }
            sumaImpares = sumaImpares + numero;
        } else {
            sumaPares = sumaPares + numero;
        }
    }

    let sumaTotal = sumaImpares + sumaPares;
    let decena = Math.ceil(sumaTotal / 10) * 10;
    let resultado = decena - sumaTotal;

    if (resultado == 10) {
        resultado = 0;
    }

    
    if (resultado == parseInt(cedula[9])) {
        mensajeCedula.innerHTML = "✓ Cédula válida";
        mensajeCedula.style.color = "#00a8ff"; // Color celeste/azul de éxito acorde a tu diseño
    } else {
        mensajeCedula.innerHTML = "✕ Cédula no válida";
        mensajeCedula.style.color = "#ff5252"; // Color rojo de error
    }
}

