// Funcion para calcular la prediccion

function predecir() {

    // Obtener las ganancias

    let mes1 = Number(document.getElementById("mes1").value)
    let mes2 = Number(document.getElementById("mes2").value)
    let mes3 = Number(document.getElementById("mes3").value)

    // Obtener el mes que se quiere predecir

    let mes = Number(document.getElementById("mesPrediccion").value)

    // Calcular la pendiente

    let m = (mes3 - mes1) / 2

    // Calcular el valor inicial

    let b = mes1 - m

    // Calcular la ganancia

    let resultado = m * mes + b

    // Mostrar resultado

    document.getElementById("resultado").textContent =
        "Ganancia estimada: $" + resultado.toFixed(2)

    // Crear la grafica

    new Chart(document.getElementById("grafica"), {

        type: "line",

        data: {

            labels: ["Mes 1", "Mes 2", "Mes 3", "Prediccion"],

            datasets: [{

                label: "Ganancias",

                data: [mes1, mes2, mes3, resultado],

                borderWidth: 2

            }]

        }

    })

}