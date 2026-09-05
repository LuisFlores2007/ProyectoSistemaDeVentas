let graficaGanancias;

function actualizarGrafica() {

    const diasSemana = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo"
    ];

    const gananciaLunes =
        Number(document.getElementById("lunes").value) || 0;

    const gananciaMiercoles =
        Number(document.getElementById("miercoles").value) || 0;

    const gananciaSabado =
        Number(document.getElementById("sabado").value) || 0;


    // ECUACION 1 lunes a miércoles
    // y = mx + b

    const pendiente1 =
        (gananciaMiercoles - gananciaLunes) / (3 - 1);

    const interseccion1 =
        gananciaLunes - pendiente1 * 1;


    // ECUACION 2 miércoles a sábado
    // y = mx + b

    const pendiente2 =
        (gananciaSabado - gananciaMiercoles) / (6 - 3);

    const interseccion2 =
        gananciaMiercoles - pendiente2 * 3;


    // Aplicamos y = mx + b
    const gananciasSemanales = [

        pendiente1 * 1 + interseccion1, // Lunes
        pendiente1 * 2 + interseccion1, // Martes
        pendiente1 * 3 + interseccion1, // Miércoles

        pendiente2 * 4 + interseccion2, // Jueves
        pendiente2 * 5 + interseccion2, // Viernes
        pendiente2 * 6 + interseccion2, // Sábado
        pendiente2 * 7 + interseccion2  // Domingo
    ];


    const gananciaTotal = gananciasSemanales.reduce(
        (suma, ganancia) => suma + ganancia,
        0
    );


    document.getElementById("resultado").textContent =
        `Ganancia semanal: $${gananciaTotal.toFixed(2)}`;


    if (graficaGanancias) {
        graficaGanancias.destroy();
    }


    graficaGanancias = new Chart(
        document.getElementById("grafica"),
        {
            type: "line",

            data: {
                labels: diasSemana,

                datasets: [{
                    label: "Ganancia diaria",
                    data: gananciasSemanales,
                    borderWidth: 2,
                    tension: 0.3,
                    pointRadius: 5
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                scales: {
                    y: {
                        beginAtZero: true,

                        suggestedMax:
                            Math.max(...gananciasSemanales) + 20,

                        ticks: {
                            callback: valor => "$" + valor
                        }
                    }
                }
            }
        }
    );
}


function predecir() {
    actualizarGrafica();
}