// Calcula si la cedula cumple el algoritmo de validacion nacional

function verificarCedula() {
    // Lee la cedula y busca el mensaje donde se mostrara el resultado
    let cedula = document.getElementById("cedula").value;
    let mensajeCedula = document.getElementById("resultadoCedula");
    // Limpia el resultado cuando el campo esta vacio
    if (cedula.length === 0) {
        mensajeCedula.innerHTML = "";
        return;
    }

    // Rechaza valores que no tengan diez digitos numericos
    if (cedula.length != 10 || isNaN(cedula)) {
        mensajeCedula.innerHTML = "La cédula debe tener 10 dígitos.";
        mensajeCedula.style.color = "#ff5252"; // Color rojo de advertencia/error
        return;
    }

    // Guarda por separado los resultados de las posiciones alternas
    let sumaImpares = 0;
    let sumaPares = 0;

    // Procesa los primeros nueve digitos para obtener el digito verificador
    for (let i = 0; i < 9; i++) {
        let numero = parseInt(cedula[i]);

        // Duplica los digitos de las posiciones impares y ajusta los mayores a nueve
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

    // Suma los valores y calcula el digito esperado
    let sumaTotal = sumaImpares + sumaPares;
    let decena = Math.ceil(sumaTotal / 10) * 10;
    let resultado = decena - sumaTotal;

    if (resultado == 10) {
        resultado = 0;
    }

    // Compara el digito calculado con el ultimo digito de la cedula
    if (resultado == parseInt(cedula[9])) {
        mensajeCedula.innerHTML = "✓ Cédula válida";
        mensajeCedula.style.color = "#00a8ff";
    } else {
        mensajeCedula.innerHTML = "✕ Cédula no válida";
        mensajeCedula.style.color = "#ff5252";
    }
}

