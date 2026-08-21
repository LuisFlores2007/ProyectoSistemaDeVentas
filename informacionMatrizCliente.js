// Guarda todos los clientes mientras la pagina esta abierta
const informacionMatrizClientes = [];

let indiceClienteEditando = -1;

function guardarCliente(evento) {
	evento.preventDefault();

	const nuevaFila = [
		document.getElementById("nombreProveedor").value,
		document.getElementById("cedula").value,
		document.getElementById("telefono").value,
		document.getElementById("Iemail").value
	];

	if (indiceClienteEditando >= 0) {
		informacionMatrizClientes[indiceClienteEditando] = nuevaFila;
		indiceClienteEditando = -1;
		document.querySelector('#formularioCliente button[type="submit"]').textContent = "Guardar";
	} else {
		informacionMatrizClientes.push(nuevaFila);
	}

	mostrarInformacionMatrizClientes();
	document.getElementById("formularioCliente").reset();
}

function mostrarInformacionMatrizClientes() {
	const contenedor = document.getElementById("contenedorClientes");

	contenedor.innerHTML = `
		<div class="encabezadosClientes">
			<span>Nombre</span>
			<span>Cédula</span>
			<span>Teléfono</span>
			<span>Correo electrónico</span>
			<span>Acciones</span>
		</div>
	`;

	for (let i = 0; i < informacionMatrizClientes.length; i = i + 1) {
		const filaActual = informacionMatrizClientes[i];
		contenedor.innerHTML += `
			<div class="tarjetaCliente">
				<span>${filaActual[0]}</span>
				<span>${filaActual[1]}</span>
				<span>${filaActual[2]}</span>
				<span>${filaActual[3]}</span>
				<div class="accionesCliente">
					<button class="btn btn-editar" type="button" onclick="editarCliente(${i})">Editar</button>
					<button class="btn btn-red" type="button" onclick="eliminarCliente(${i})">Eliminar</button>
				</div>
			</div>
		`;
	}
}

function eliminarCliente(indiceCliente) {
	informacionMatrizClientes.splice(indiceCliente, 1);
	mostrarInformacionMatrizClientes();
}

function editarCliente(indiceCliente) {
	const cliente = informacionMatrizClientes[indiceCliente];
	indiceClienteEditando = indiceCliente;

	document.getElementById("nombreProveedor").value = cliente[0];
	document.getElementById("cedula").value = cliente[1];
	document.getElementById("telefono").value = cliente[2];
	document.getElementById("Iemail").value = cliente[3];
	document.querySelector('#formularioCliente button[type="submit"]').textContent = "Actualizar";
	document.getElementById("formularioCliente").scrollIntoView({ behavior: "smooth" });
}

mostrarInformacionMatrizClientes();
