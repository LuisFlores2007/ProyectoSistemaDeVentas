// Conserva los proveedores registrados y recupera los datos guardados
const informacionMatrizProveedores = JSON.parse(localStorage.getItem("proveedoresSistemaVentas") || "[]");

// Guarda la posicion del proveedor que se esta editando
let indiceProveedorEditando = -1;

// Lee el formulario y agrega un proveedor o actualiza uno existente
function guardarProveedor(evento) {
	// Evita que el formulario recargue la pagina
	evento.preventDefault();

	// Reune los datos en el mismo orden que usa la matriz
	const nuevaFila = [
		document.getElementById("nombreProveedor").value,
		document.getElementById("cedula").value,
		document.getElementById("razonSocial").value,
		document.getElementById("tipoProductoProveedor").value,
		document.getElementById("telefono").value,
		document.getElementById("Iemail").value,
		document.getElementById("numeroCuenta").value
	];

	// Reemplaza la fila cuando se esta editando un proveedor
	if (indiceProveedorEditando >= 0) {
		informacionMatrizProveedores[indiceProveedorEditando] = nuevaFila;
		indiceProveedorEditando = -1;
		document.querySelector('#proveedor button[type="submit"]').textContent = "Guardar";
	// Agrega una fila nueva cuando no hay una edicion activa
	} else {
		informacionMatrizProveedores.push(nuevaFila);
	}

	// Redibuja la matriz y limpia el formulario
	localStorage.setItem("proveedoresSistemaVentas", JSON.stringify(informacionMatrizProveedores));
	mostrarInformacionMatrizProveedores();
	document.getElementById("proveedor").reset();
}

// Dibuja los encabezados y las filas visibles de proveedores
function mostrarInformacionMatrizProveedores() {
	// Busca el contenedor donde aparecera la matriz
	const contenedor = document.getElementById("contenedorProveedores");

	// Reemplaza el contenido anterior para evitar filas repetidas
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

	// Crea una fila visual por cada proveedor registrado
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

// Elimina un proveedor por su posicion y actualiza la matriz
function eliminarProveedor(indiceProveedor) {
	informacionMatrizProveedores.splice(indiceProveedor, 1);
	localStorage.setItem("proveedoresSistemaVentas", JSON.stringify(informacionMatrizProveedores));
	mostrarInformacionMatrizProveedores();
}

// Carga los datos de un proveedor en el formulario para editarlo
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

// Muestra los encabezados aunque aun no existan proveedores
mostrarInformacionMatrizProveedores();
