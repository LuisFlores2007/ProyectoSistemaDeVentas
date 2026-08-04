#Importamos las librerias
import numpy as np
import pandas as pd
import plotly.graph_objects as go
import plotly.io as pio 

#Definimos como queremso que se visualize al grafica
pio.renderers.default = "browser"

#Generamos los datos
np.random.seed(42)
meses = np.arange(1, 25)
ganancias = (50 + 5 * meses + np.random.normal(0, 10, 24))

#Hacemos un data frame
df = pd.DataFrame({"Mes":meses, "Ganancia":ganancias})

#Definimos la ecuacion
coeficientes = np.polyfit(df["Mes"], df["Ganancia"], 1)
modelo = np.poly1d(coeficientes)

#Generamos la lista de perdiccion
x_pred = np.linspace(df["Mes"].min(), df["Mes"].max(), 100)
y_pred = modelo(x_pred)

#Creamos el grafico
fig = go.Figure()
fig.add_trace(go.Scatter(
    x = df["Mes"],
    y = df["Ganancia"],
    mode="markers",
    name="Prediccion de ganancias",
    marker=dict(color="blue", size=8, opacity=0.6)
))

fig.add_trace(
    go.Scatter(
        x=x_pred,
        y=y_pred, 
        mode="lines",
        name="Tendencia lineal", 
        line=dict(color="red", width=3)
    )
)

#Agregamos titulos
fig.update_layout(
    title="Pronostico de ganancias a futuro", 
    xaxis_title="Meses",
    yaxis_title="Ganancia en miles"
)

#Graficamos
fig.show()
