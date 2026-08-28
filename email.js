// ==========================================
// CONFIGURACIÓN EMAILJS
// ==========================================

const EMAILJS_SERVICE_ID = "service_w8uqrjl";
const EMAILJS_TEMPLATE_ID = "template_xjtqe48";
const EMAILJS_PUBLIC_KEY = "RWyiScVHfSgLW92lw";

// Inicializar EmailJS
emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
});


// ==========================================
// ENVIAR FACTURA POR CORREO
// ==========================================

function enviarFacturaPorCorreo(
    cliente,
    numeroVenta,
    fecha,
    carrito,
    subtotal,
    descuento,
    total
) {

    if (!cliente) {
        console.error("No se encontró información del cliente.");
        return;
    }

    const correoCliente = cliente[3];

    if (!correoCliente) {
        console.error("El cliente no tiene un correo registrado.");
        return;
    }

    const productos = carrito.map(item => {
        const importe = item.cantidad * item.precio;

        return `${item.nombre} x ${item.cantidad} - $${importe.toFixed(2)}`;
    }).join("\n");

    const datosFactura = {
        cliente_nombre: cliente[0],
        cliente_email: correoCliente,
        numero_factura: numeroVenta,
        fecha: fecha,
        productos: productos,
        subtotal: Number(subtotal).toFixed(2),
        descuento: Number(descuento).toFixed(2),
        total: Number(total).toFixed(2)
    };

    emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        datosFactura
    )
    .then(function(response) {

        console.log("Factura enviada correctamente:", response.status);

    })
    .catch(function(error) {

        console.error("Error al enviar la factura:", error);

    });
}