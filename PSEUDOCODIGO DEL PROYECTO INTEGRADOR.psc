Algoritmo SistemaDeVentas
	
	Definir opcion, opcionAdmin, opcionVendedor Como Entero
	Definir usuario, clave Como Caracter
	Definir codigo, categoria, nombre, correo, telefono Como Caracter
	Definir razonSocial, tipoProducto, numeroCuenta Como Caracter
	Definir cantidad, precio, subtotal, descuento, total Como Real
	Definir i, pos Como Entero
	
	Definir contadorProductos, contadorClientes Como Entero
	Definir contadorProveedores, contadorVentas Como Entero
	
	Definir idProducto, catProducto, nomProducto Como Caracter
	Definir precioProducto, stockProducto Como Real
	
	Definir clientes Como Caracter
	Definir proveedores Como Caracter
	
	Definir ventaProducto Como Caracter
	Definir ventaCantidad, ventaSubtotal, ventaDescuento, ventaTotal Como Real
	
	
	Dimension idProducto[100]
	Dimension catProducto[100]
	Dimension nomProducto[100]
	Dimension precioProducto[100]
	Dimension stockProducto[100]
	
	Dimension clientes[100,4]
	
	Dimension proveedores[100,7]
	
	Dimension ventaProducto[100]
	Dimension ventaCantidad[100]
	Dimension ventaSubtotal[100]
	Dimension ventaDescuento[100]
	Dimension ventaTotal[100]
	
	
	contadorProductos <- 0
	contadorClientes <- 0
	contadorProveedores <- 0
	contadorVentas <- 0
	
	
	Repetir
		
		Escribir "======================================"
		Escribir "          SISTEMA DE VENTAS"
		Escribir "======================================"
		Escribir "1. Administrador"
		Escribir "2. Vendedor"
		Escribir "3. Salir"
		Escribir "Seleccione una opcion:"
		Leer opcion
		
		
		Segun opcion Hacer
			
			1:
				
				Escribir "Ingrese usuario:"
				Leer usuario
				
				Escribir "Ingrese clave:"
				Leer clave
				
				
				Si usuario = "admin" Y clave = "1234" Entonces
					
					Repetir
						
						Escribir "======================================"
						Escribir "        MENU ADMINISTRADOR"
						Escribir "======================================"
						Escribir "1. Registrar producto"
						Escribir "2. Ver productos"
						Escribir "3. Registrar cliente"
						Escribir "4. Ver clientes"
						Escribir "5. Registrar proveedor"
						Escribir "6. Ver proveedores"
						Escribir "7. Ver ventas"
						Escribir "8. Cerrar sesion"
						Escribir "Seleccione una opcion:"
						Leer opcionAdmin
						
						
						Segun opcionAdmin Hacer
							
							1:
								
								Si contadorProductos < 100 Entonces
									
									contadorProductos <- contadorProductos + 1
									
									Escribir "Ingrese el codigo del producto:"
									Leer idProducto[contadorProductos]
									
									Escribir "Ingrese la categoria:"
									Leer catProducto[contadorProductos]
									
									Escribir "Ingrese el nombre del producto:"
									Leer nomProducto[contadorProductos]
									
									Escribir "Ingrese el precio:"
									Leer precioProducto[contadorProductos]
									
									Escribir "Ingrese el stock:"
									Leer stockProducto[contadorProductos]
									
									Escribir "Producto registrado correctamente."
									
								Sino
									
									Escribir "No hay espacio para mas productos."
									
								FinSi
								
								
							2:
								
								Si contadorProductos = 0 Entonces
									
									Escribir "No hay productos registrados."
									
								Sino
									
									Escribir "======================================"
									Escribir "          LISTA DE PRODUCTOS"
									Escribir "======================================"
									
									Para i <- 1 Hasta contadorProductos Hacer
										
										Escribir "Codigo: ", idProducto[i]
										Escribir "Categoria: ", catProducto[i]
										Escribir "Nombre: ", nomProducto[i]
										Escribir "Precio: $", precioProducto[i]
										Escribir "Stock: ", stockProducto[i]
										Escribir "--------------------------------------"
										
									FinPara
									
								FinSi
								
								
							3:
								
								Si contadorClientes < 100 Entonces
									
									contadorClientes <- contadorClientes + 1
									
									Escribir "Ingrese el nombre del cliente:"
									Leer clientes[contadorClientes,1]
									
									Escribir "Ingrese la cedula:"
									Leer clientes[contadorClientes,2]
									
									Escribir "Ingrese el telefono:"
									Leer clientes[contadorClientes,3]
									
									Escribir "Ingrese el correo:"
									Leer clientes[contadorClientes,4]
									
									Escribir "Cliente registrado correctamente."
									
								Sino
									
									Escribir "No hay espacio para mas clientes."
									
								FinSi
								
								
							4:
								
								Si contadorClientes = 0 Entonces
									
									Escribir "No hay clientes registrados."
									
								Sino
									
									Escribir "======================================"
									Escribir "           LISTA DE CLIENTES"
									Escribir "======================================"
									
									Para i <- 1 Hasta contadorClientes Hacer
										
										Escribir "Nombre: ", clientes[i,1]
										Escribir "Cedula: ", clientes[i,2]
										Escribir "Telefono: ", clientes[i,3]
										Escribir "Correo: ", clientes[i,4]
										Escribir "--------------------------------------"
										
									FinPara
									
								FinSi
								
								
							5:
								
								Si contadorProveedores < 100 Entonces
									
									contadorProveedores <- contadorProveedores + 1
									
									Escribir "Ingrese el nombre del proveedor:"
									Leer proveedores[contadorProveedores,1]
									
									Escribir "Ingrese la cedula:"
									Leer proveedores[contadorProveedores,2]
									
									Escribir "Ingrese la razon social:"
									Leer proveedores[contadorProveedores,3]
									
									Escribir "Ingrese el tipo de producto:"
									Leer proveedores[contadorProveedores,4]
									
									Escribir "Ingrese el telefono:"
									Leer proveedores[contadorProveedores,5]
									
									Escribir "Ingrese el correo:"
									Leer proveedores[contadorProveedores,6]
									
									Escribir "Ingrese el numero de cuenta:"
									Leer proveedores[contadorProveedores,7]
									
									Escribir "Proveedor registrado correctamente."
									
								Sino
									
									Escribir "No hay espacio para mas proveedores."
									
								FinSi
								
								
							6:
								
								Si contadorProveedores = 0 Entonces
									
									Escribir "No hay proveedores registrados."
									
								Sino
									
									Escribir "======================================"
									Escribir "         LISTA DE PROVEEDORES"
									Escribir "======================================"
									
									Para i <- 1 Hasta contadorProveedores Hacer
										
										Escribir "Nombre: ", proveedores[i,1]
										Escribir "Cedula: ", proveedores[i,2]
										Escribir "Razon Social: ", proveedores[i,3]
										Escribir "Tipo de producto: ", proveedores[i,4]
										Escribir "Telefono: ", proveedores[i,5]
										Escribir "Correo: ", proveedores[i,6]
										Escribir "Numero de cuenta: ", proveedores[i,7]
										Escribir "--------------------------------------"
										
									FinPara
									
								FinSi
								
								
							7:
								
								Si contadorVentas = 0 Entonces
									
									Escribir "No hay ventas registradas."
									
								Sino
									
									Escribir "======================================"
									Escribir "            LISTA DE VENTAS"
									Escribir "======================================"
									
									Para i <- 1 Hasta contadorVentas Hacer
										
										Escribir "Producto: ", ventaProducto[i]
										Escribir "Cantidad: ", ventaCantidad[i]
										Escribir "Subtotal: $", ventaSubtotal[i]
										Escribir "Descuento: $", ventaDescuento[i]
										Escribir "Total: $", ventaTotal[i]
										Escribir "--------------------------------------"
										
									FinPara
									
								FinSi
								
								
							8:
								
								Escribir "Cerrando sesion de administrador..."
								
								
							De Otro Modo:
								
								Escribir "Opcion invalida."
								
						FinSegun
						
						
					Hasta Que opcionAdmin = 8
					
					
				Sino
					
					Escribir "Usuario o clave incorrectos."
					
				FinSi
				
				
				
			2:
				
				Escribir "Ingrese usuario:"
				Leer usuario
				
				Escribir "Ingrese clave:"
				Leer clave
				
				
				Si usuario = "vendedor" Y clave = "1234" Entonces
					
					Repetir
						
						Escribir "======================================"
						Escribir "           MENU VENDEDOR"
						Escribir "======================================"
						Escribir "1. Ver productos"
						Escribir "2. Vender producto"
						Escribir "3. Ver ventas"
						Escribir "4. Cerrar sesion"
						Escribir "Seleccione una opcion:"
						Leer opcionVendedor
						
						
						Segun opcionVendedor Hacer
							
							1:
								
								Si contadorProductos = 0 Entonces
									
									Escribir "No hay productos registrados."
									
								Sino
									
									Escribir "======================================"
									Escribir "          LISTA DE PRODUCTOS"
									Escribir "======================================"
									
									Para i <- 1 Hasta contadorProductos Hacer
										
										Escribir "Codigo: ", idProducto[i]
										Escribir "Categoria: ", catProducto[i]
										Escribir "Nombre: ", nomProducto[i]
										Escribir "Precio: $", precioProducto[i]
										Escribir "Stock: ", stockProducto[i]
										Escribir "--------------------------------------"
										
									FinPara
									
								FinSi
								
								
							2:
								
								Si contadorProductos = 0 Entonces
									
									Escribir "No hay productos en el inventario."
									
								Sino
									
									Escribir "Ingrese el codigo del producto a vender:"
									Leer codigo
									
									pos <- -1
									
									Para i <- 1 Hasta contadorProductos Hacer
										
										Si idProducto[i] = codigo Entonces
											
											pos <- i
											
										FinSi
										
									FinPara
									
									
									Si pos = -1 Entonces
										
										Escribir "Producto no encontrado."
										
									Sino
										
										Escribir "Ingrese la cantidad a vender:"
										Leer cantidad
										
										
										Si cantidad <= 0 Entonces
											
											Escribir "La cantidad debe ser mayor que cero."
											
										Sino
											
											Si cantidad > stockProducto[pos] Entonces
												
												Escribir "No hay suficiente stock."
												
											Sino
												
												Si contadorVentas < 100 Entonces
													
													subtotal <- precioProducto[pos] * cantidad
													
													
													Si subtotal > 30 Entonces
														
														descuento <- subtotal * 0.10
														
													Sino
														
														descuento <- 0
														
													FinSi
													
													
													total <- subtotal - descuento
													
													stockProducto[pos] <- stockProducto[pos] - cantidad
													
													contadorVentas <- contadorVentas + 1
													
													ventaProducto[contadorVentas] <- nomProducto[pos]
													ventaCantidad[contadorVentas] <- cantidad
													ventaSubtotal[contadorVentas] <- subtotal
													ventaDescuento[contadorVentas] <- descuento
													ventaTotal[contadorVentas] <- total
													
													
													Escribir "======================================"
													Escribir "       VENTA REALIZADA CON EXITO"
													Escribir "======================================"
													Escribir "Producto: ", nomProducto[pos]
													Escribir "Cantidad: ", cantidad
													Escribir "Subtotal: $", subtotal
													Escribir "Descuento: $", descuento
													Escribir "Total: $", total
													
												Sino
													
													Escribir "No hay espacio para registrar mas ventas."
													
												FinSi
												
											FinSi
											
										FinSi
										
									FinSi
									
								FinSi
								
								
							3:
								
								Si contadorVentas = 0 Entonces
									
									Escribir "No hay ventas registradas."
									
								Sino
									
									Escribir "======================================"
									Escribir "            LISTA DE VENTAS"
									Escribir "======================================"
									
									Para i <- 1 Hasta contadorVentas Hacer
										
										Escribir "Producto: ", ventaProducto[i]
										Escribir "Cantidad: ", ventaCantidad[i]
										Escribir "Subtotal: $", ventaSubtotal[i]
										Escribir "Descuento: $", ventaDescuento[i]
										Escribir "Total: $", ventaTotal[i]
										Escribir "--------------------------------------"
										
									FinPara
									
								FinSi
								
								
							4:
								
								Escribir "Cerrando sesion de vendedor..."
								
								
							De Otro Modo:
								
								Escribir "Opcion invalida."
								
						FinSegun
						
						
					Hasta Que opcionVendedor = 4
					
					
				Sino
					
					Escribir "Usuario o clave incorrectos."
					
				FinSi
				
				
				
			3:
				
				Escribir "Saliendo del sistema..."
				
				
			De Otro Modo:
				
				Escribir "Opcion invalida."
				
		FinSegun
		
		
	Hasta Que opcion = 3
	
	
FinAlgoritmo