// Guarda todos los proveedores mientras la pagina esta abierta
const informacionMatrizProveedores = [];

let indiceProveedorEditando = -1;

// Lee el formulario y guarda un proveedor nuevo o actualiza uno existente
function guardarProveedor(evento) {
	evento.preventDefault();

	const nuevaFila = [
		document.getElementById("nombreProveedor").value,
		document.getElementById("cedula").value,
		document.getElementById("razonSocial").value,
		document.getElementById("tipoProductoProveedor").value,
		document.getElementById("telefono").value,
		document.getElementById("Iemail").value,
		document.getElementById("numeroCuenta").value
	];

	if (indiceProveedorEditando >= 0) {
		informacionMatrizProveedores[indiceProveedorEditando] = nuevaFila;
		indiceProveedorEditando = -1;
		document.querySelector('#proveedor button[type="submit"]').textContent = "Guardar";
	} else {
		informacionMatrizProveedores.push(nuevaFila);
	}

	mostrarInformacionMatrizProveedores();
	document.getElementById("proveedor").reset();
}

// Dibuja los encabezados y todas las filas dentro del contenedor de proveedores
function mostrarInformacionMatrizProveedores() {
	const contenedor = document.getElementById("contenedorProveedores");

	contenedor.innerHTML = `
		<div class="encabezadosProveedores">
			<span>Nombre</span>
			<span>Cédula</span>
			<span>Razón social</span>
			<span>Tipo de producto</span>
			<span>Teléfono</span>
			<span>Correo</span>
			<span>Número de cuenta</span>
			<span>Acciones</span>
		</div>
	`;

	for (let i = 0; i < informacionMatrizProveedores.length; i = i + 1) {
		const filaActual = informacionMatrizProveedores[i];
		contenedor.innerHTML += `
			<div class="tarjetaProveedor">
				<span>${filaActual[0]}</span>
				<span>${filaActual[1]}</span>
				<span>${filaActual[2]}</span>
				<span>${filaActual[3]}</span>
				<span>${filaActual[4]}</span>
				<span>${filaActual[5]}</span>
				<span>${filaActual[6]}</span>
				<div class="accionesProveedor">
					<button class="btn btn-editar" type="button" onclick="editarProveedor(${i})">Editar</button>
					<button class="btn btn-red" type="button" onclick="eliminarProveedor(${i})">Eliminar</button>
				</div>
			</div>
		`;
	}
}

function eliminarProveedor(indiceProveedor) {
	informacionMatrizProveedores.splice(indiceProveedor, 1);
	mostrarInformacionMatrizProveedores();
}

function editarProveedor(indiceProveedor) {
	const proveedor = informacionMatrizProveedores[indiceProveedor];
	indiceProveedorEditando = indiceProveedor;

	document.getElementById("nombreProveedor").value = proveedor[0];
	document.getElementById("cedula").value = proveedor[1];
	document.getElementById("razonSocial").value = proveedor[2];
	document.getElementById("tipoProductoProveedor").value = proveedor[3];
	document.getElementById("telefono").value = proveedor[4];
	document.getElementById("Iemail").value = proveedor[5];
	document.getElementById("numeroCuenta").value = proveedor[6];
	document.querySelector('#proveedor button[type="submit"]').textContent = "Actualizar";
	document.getElementById("proveedor").scrollIntoView({ behavior: "smooth" });
}

mostrarInformacionMatrizProveedores();
