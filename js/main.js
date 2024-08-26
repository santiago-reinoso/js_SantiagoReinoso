// Array para almacenar las zapatillas en el carrito
const carrito = [];

// Función para mostrar el menú principal y manejar las opciones del usuario
function mostrarMenu() {
  let opcion;
  do {
    opcion = prompt(
      "Bienvenido al carrito de compras de zapatillas:\n" +
      "1. Añadir zapatilla" +
      "2. Ver carrito" +
      "3. Eliminar zapatilla" +
      "4. Salir" +
      "Elige una opción (1-4):"
    );

    switch (opcion) {
      case '1':
        anadirZapatilla();
        break;
      case '2':
        verCarrito();
        break;
      case '3':
        eliminarZapatilla();
        break;
      case '4':
        alert("¡Gracias por su compra!");
        break;
      default:
        alert("Opción no válida. Por favor, elige entre 1 y 4.");
    }
  } while (opcion !== '4');
}

function anadirZapatilla() {
  const marca = prompt("Introduce la marca de la zapatilla:");
  const talla = prompt("Introduce la talla de la zapatilla:");
  const precio = prompt("Introduce el precio de la zapatilla:");
  
  if (marca && talla && precio) {
    carrito.push({ marca, talla, precio: parseFloat(precio) });
    alert("Zapatilla añadida al carrito.");
  } else {
    alert("Todos los campos son obligatorios.");
  }
}

function verCarrito() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
  } else {
    let mensaje = "Contenido del carrito:\n";
    for (let i = 0; i < carrito.length; i++) {
      const zapatilla = carrito[i];
      mensaje += `${i + 1}. Marca: ${zapatilla.marca}, Talla: ${zapatilla.talla}, Precio: $${zapatilla.precio.toFixed(2)}\n`;
    }
    alert(mensaje);
  }
}

function eliminarZapatilla() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  
  let index = parseInt(prompt("Introduce el número de la zapatilla a eliminar (1 - " + carrito.length + "):")) - 1;
  
  if (index >= 0 && index < carrito.length) {
    if (confirm("¿Estás seguro de que deseas eliminar esta zapatilla?")) {
      carrito.splice(index, 1);
      alert("Zapatilla eliminada del carrito.");
    } else {
      alert("Eliminación cancelada.");
    }
  } else {
    alert("Número de zapatilla no válido.");
  }
}

mostrarMenu();
