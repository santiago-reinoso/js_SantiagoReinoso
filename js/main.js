const carrito = document.getElementById("carrito"),
    contenedorCarrito = document.querySelector('.buy-card .lista_de_zapatillas'),
    vaciarCarritoBtn = document.querySelector('#vaciar_carrito'),
    finalizarPedidoBtn = document.querySelector('#finalizar_pedido'),
    formulario = document.getElementById('formulario');

let articulosCarrito = [];

registrarEventsListeners();

function registrarEventsListeners() {
    document.getElementById("lista-zapatillas").addEventListener('click', agregarZapatilla);
    carrito.addEventListener('click', eliminarZapatilla);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    finalizarPedidoBtn.addEventListener('click', mostrarFormulario);
    document.addEventListener("DOMContentLoaded", cargarZapatillas);
}

function cargarZapatillas() {
    try {
        fetch('./json/zapatillas.json') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la carga de datos');
                }
                return response.json();
            })
            .then(zapatillas => {
                const listaZapatillas = document.getElementById("lista-zapatillas");

                zapatillas.forEach(zapatilla => {
                    const div = document.createElement('div');
                    div.classList.add('items');
                    div.innerHTML = `
                        <img src="${zapatilla.imagen}">
                        <div class="info">
                            <h3>${zapatilla.marca}</h3>
                            <p>${zapatilla.modelo}</p>
                            <div class="precio">
                                <p>$${zapatilla.precio}</p>
                                <p class="descuento">$${zapatilla.descuento}</p>
                            </div>
                            <button class="agregar-carrito" data-id="${zapatilla.id}">Agregar al Carrito</button>
                        </div>
                    `;
                    listaZapatillas.appendChild(div);
                });
            });
    } catch (error) {
        console.error('Error al cargar las zapatillas:', error);
    } finally {
        console.log('Carga de zapatillas completada.');
    }
}

function agregarZapatilla(e) {
    if (e.target.classList.contains("agregar-carrito")) {
        const zapaSeleccionado = e.target.parentElement.parentElement;
        leerInfo(zapaSeleccionado);
    }
}

function eliminarZapatilla(e) {
    if (e.target.classList.contains("borrar-zapatilla")) {
        const zapatillaId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(zapatilla => zapatilla.id !== zapatillaId);
        carritoHTML();
    }
}

function leerInfo(zapatilla) {
    const infoZapatilla = {
        imagen: zapatilla.querySelector('img').src,
        titulo: zapatilla.querySelector('p').textContent,
        precio: zapatilla.querySelector('.descuento').textContent,
        id: zapatilla.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    };

    const existe = articulosCarrito.some(zapatilla => zapatilla.id === infoZapatilla.id);

    if (existe) {
        articulosCarrito = articulosCarrito.map(zapatilla => {
            if (zapatilla.id === infoZapatilla.id) {
                zapatilla.cantidad++;
                return zapatilla;
            }
            return zapatilla;
        });
    } else {
        articulosCarrito.push(infoZapatilla);
    }

    carritoHTML();
}

function carritoHTML() {
    LimpiarHTML();
    articulosCarrito.forEach(zapatilla => {
        const fila = document.createElement('div');
        fila.innerHTML = `
            <img src="${zapatilla.imagen}">
            <p>${zapatilla.titulo}</p>
            <p>${zapatilla.precio}</p>
            <p>${zapatilla.cantidad}</p>
            <p><span class="borrar-zapatilla" data-id="${zapatilla.id}">X</span></p>
        `;
        contenedorCarrito.appendChild(fila);
    });
    sincronizarStorage();
}

function vaciarCarrito() {
    articulosCarrito = [];
    LimpiarHTML();
}

function mostrarFormulario() {
    if (articulosCarrito.length > 0) {
        formulario.style.display = 'block';
    }
}

function leerFormulario() {
    const nombre = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const direccion = document.getElementById('adress').value;

    try {
        if (!nombre || !email || !direccion) {
            throw new Error("Por favor, completa todos los campos.");
        }
         articulosCarrito = [];
        LimpiarHTML();
        formulario.style.display = 'none';
    } catch (error) {
        document.getElementById('error-cliente').textContent = error.message;
    } finally {
        console.log('Intento de envío de formulario completado.');
    }
}

function sincronizarStorage() {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

function LimpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    sincronizarStorage();
}

document.getElementById('submit-form').addEventListener('click', leerFormulario);
