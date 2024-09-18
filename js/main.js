
const carrito = document.getElementById("carrito"),
      listaCursos = document.getElementById("lista-cursos"),
      contenedorCarrito = document.querySelector('.buy-card .lista_de_cursos'),
      vaciarCarritoBtn = document.querySelector('#vaciar_carrito');

let articulosCarrito = [];

registrarEventsListeners()

function registrarEventsListeners() {
    listaCursos.addEventListener('click', agregarCurso);


    carrito.addEventListener('click', eliminarCurso);

    vaciarCarritoBtn.addEventListener('click', e => {
        articulosCarrito = [];
        limpiarHTML()
    })
}

function agregarCurso(e) {
    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerInfo(cursoSeleccionado)
    }
}

function eliminarCurso(e) {
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute('data-id');
        
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

        carritoHTML()

    }
}

function leerInfo(curso) {
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo: curso.querySelector('h3').textContent,
        precio: curso.querySelector('.descuento').textContent,
        id : curso.querySelector('button').getAttribute('data-id'),
        cantidad : 1
    }

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)

    if (existe) {
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso 
            } else {
                return curso;
            }
        });
        [...articulosCarrito,infoCurso]
    } else {
        articulosCarrito = [...articulosCarrito,infoCurso]
    }
    carritoHTML()
}


function carritoHTML() {
    limpiarHTML()
    articulosCarrito.forEach(curso => {
        const fila = document.createElement('div');
        fila.innerHTML = `
            <img src="${curso.imagen}"></img>
            <p>${curso.titulo}</p>
            <p>${curso.precio}</p>
            <p>${curso.cantidad}</p>
            <p><span class="borrar-curso" data-id="${curso.id}">X</span></p>
        `;

        contenedorCarrito.appendChild(fila)
    });
}

function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

