// Conserva los clientes registrados y recupera los datos guardados
const informacionMatrizClientes = JSON.parse(localStorage.getItem("clientesSistemaVentas") || "[]");

// Guarda la posicion del cliente que se esta editando
let indiceClienteEditando = -1;

// Lee el formulario y agrega un cliente o actualiza uno existente
function guardarCliente(evento) {
	// Evita que el formulario recargue la pagina
	evento.preventDefault();

	const cedulaValor = document.getElementById("cedula").value.replace(/\D/g, "");
	const telefonoValor = document.getElementById("telefono").value.replace(/\D/g, "");

	if (cedulaValor === "" || telefonoValor === "") {
		alert("La cédula y el teléfono deben contener solo números.");
		return;
	}

	// Reune los datos en el mismo orden que usa la matriz
	const nuevaFila = [
		document.getElementById("nombreProveedor").value,
		cedulaValor,
		telefonoValor,
		document.getElementById("Iemail").value
	];

	// Reemplaza la fila cuando se esta editando un cliente
	if (indiceClienteEditando >= 0) {
		informacionMatrizClientes[indiceClienteEditando] = nuevaFila;
		indiceClienteEditando = -1;
		document.querySelector('#formularioCliente button[type="submit"]').textContent = "Guardar";
	// Agrega una fila nueva cuando no hay una edicion activa
	} else {
		informacionMatrizClientes.push(nuevaFila);
	}

	// Redibuja la matriz y limpia el formulario
	localStorage.setItem("clientesSistemaVentas", JSON.stringify(informacionMatrizClientes));
	mostrarInformacionMatrizClientes();
	document.getElementById("formularioCliente").reset();
}

// Dibuja los encabezados y las filas visibles de clientes
function mostrarInformacionMatrizClientes() {
	// Busca el contenedor donde aparecera la matriz
	const contenedor = document.getElementById("contenedorClientes");

	// Reemplaza el contenido anterior para evitar filas repetidas
	contenedor.innerHTML = `
		<div class="encabezadosClientes">
			<span>Nombre</span>
			<span>Cédula</span>
			<span>Teléfono</span>
			<span>Correo electrónico</span>
			<span>Acciones</span>
		</div>
	`;

	// Crea una fila visual por cada cliente registrado
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

// Elimina un cliente por su posicion y actualiza la matriz
function eliminarCliente(indiceCliente) {
	informacionMatrizClientes.splice(indiceCliente, 1);
	localStorage.setItem("clientesSistemaVentas", JSON.stringify(informacionMatrizClientes));
	mostrarInformacionMatrizClientes();
}

// Carga los datos de un cliente en el formulario para editarlo
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

// Muestra los encabezados aunque aun no existan clientes
mostrarInformacionMatrizClientes();
