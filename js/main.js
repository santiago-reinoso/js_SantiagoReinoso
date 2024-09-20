const carrito = document.getElementById("carrito"),
    listaZapatilla = document.getElementById("lista-zapatillas"),
    contenedorCarrito = document.querySelector('.buy-card .lista_de_zapatillas'),
    vaciarCarritoBtn = document.querySelector('#vaciar_carrito');

let articulosCarrito = [];

registrarEventsListeners();

function registrarEventsListeners() {
    listaZapatilla.addEventListener('click', agregarZapatilla);
    carrito.addEventListener('click', eliminarZapatilla);

    document.addEventListener("DOMContentLoaded", () => {
        articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carritoHTML();
    });

    vaciarCarritoBtn.addEventListener('click', e => {
        articulosCarrito = [];
        LimpiarHTML();
    });
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
        titulo: zapatilla.querySelector('h3').textContent,
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
    if (contenedorCarrito) { 
        articulosCarrito.forEach(zapatilla => {
            const fila = document.createElement('div');
            fila.innerHTML = `
                <img src="${zapatilla.imagen}"></img>
                <p>${zapatilla.titulo}</p>
                <p>${zapatilla.precio}</p>
                <p>${zapatilla.cantidad}</p>
                <p><span class="borrar-zapatilla" data-id="${zapatilla.id}">X</span></p>
            `;
            contenedorCarrito.appendChild(fila);
        });
    } else {
        console.error('El contenedor del carrito no existe.');
    }
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

function LimpiarHTML() {
    if (contenedorCarrito) { 
        while (contenedorCarrito.firstChild) {
            contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        }
    } else {
        console.error('El contenedor del carrito no existe.');
    }
    sincronizarStorage();
}
