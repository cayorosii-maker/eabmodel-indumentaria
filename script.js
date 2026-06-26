document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // BOTONES + Y -
    // =========================

    document.querySelectorAll('.btn-mas').forEach(boton => {
        boton.addEventListener('click', function () {

            const input = this
                .closest('.grupo-cant')
                .querySelector('.cant');

            input.value = parseInt(input.value) + 1;
        });
    });

    document.querySelectorAll('.btn-menos').forEach(boton => {
        boton.addEventListener('click', function () {

            const input = this
                .closest('.grupo-cant')
                .querySelector('.cant');

            let cantidad = parseInt(input.value);

            if (cantidad > 1) {
                input.value = cantidad - 1;
            }
        });
    });

    // =========================
    // CARGAR CARRITO
    // =========================

    let carrito =
        JSON.parse(localStorage.getItem('carrito')) || [];

    actualizarContador();

    const botonConfirmar = document.querySelector(
        'a[href="gracias.html"]'
    );

    if (botonConfirmar) {

        botonConfirmar.addEventListener('click', () => {

            const total = carrito.reduce(
                (acum, producto) =>
                    acum + (producto.precio * producto.cantidad),0
            );

            localStorage.setItem(
                'totalCompra',
                total
            );
        });

    }

    // =========================
    // AGREGAR AL CARRITO
    // =========================

    document.querySelectorAll('.btn-agregar').forEach(boton => {

        boton.addEventListener('click', function () {

            const card = this.closest('.card');

            const nombre =
                card.querySelector('.card-title').textContent;

            const precioTexto =
                card.querySelector('.card-text').textContent;

            const precio =
                parseInt(
                    precioTexto
                        .replace('$', '')
                        .replace('.', '')
                );

            const imagen =
                card.querySelector('img').getAttribute('src');

            const cantidad =
                parseInt(
                    card.querySelector('.cant').value
                );

            const productoExistente =
                carrito.find(
                    producto => producto.nombre === nombre
                );

            if (productoExistente) {

                productoExistente.cantidad += cantidad;

            } else {

                carrito.push({
                    nombre,
                    precio,
                    imagen,
                    cantidad
                });

            }

            localStorage.setItem(
                'carrito',
                JSON.stringify(carrito)
            );

            actualizarContador();

            // Efecto visual

            const texto = this.innerHTML;

            this.innerHTML =
                '<i class="bi bi-check2-circle"></i> ¡Agregado!';

            this.classList.replace(
                'btn-primary',
                'btn-success'
            );

            setTimeout(() => {

                this.innerHTML = texto;

                this.classList.replace(
                    'btn-success',
                    'btn-primary'
                );

            }, 1500);

        });

    });

    // =========================
    // CARGAR TABLA CARRITO
    // =========================

    const cuerpo =
        document.getElementById('cuerpo-carrito');

    if (cuerpo) {

        mostrarCarrito();

    }

    // =========================
    // FUNCIONES
    // =========================

    function actualizarContador() {

        const contador =
            document.getElementById('icono-contador');

        if (!contador) return;

        const total =
            carrito.reduce(
                (acum, producto) =>
                    acum + producto.cantidad,
                0
            );

        contador.textContent = total;

        if (total > 0) {
            contador.classList.remove('d-none');
        } else {
            contador.classList.add('d-none');
        }
    }

    function mostrarCarrito() {

        const vacio =
            document.getElementById('carrito-vacio');

        cuerpo.innerHTML = '';

        if (carrito.length === 0) {

            document
                .getElementById('tabla-carrito')
                .classList.add('d-none');

            vacio.classList.remove('d-none');

            return;
        }

        let total = 0;

        carrito.forEach((producto, indice) => {

            const subtotal =
                producto.precio * producto.cantidad;

            total += subtotal;

            cuerpo.innerHTML += `
                <tr>

                    <td>
                        <div class="d-flex align-items-center gap-3">

                            <img
                                src="${producto.imagen}"
                                class="img-prod"
                                alt="${producto.nombre}">

                            <div>
                                <h6 class="mb-0">
                                    ${producto.nombre}
                                </h6>
                            </div>

                        </div>
                    </td>

                    <td class="text-center">
                        ${producto.cantidad}
                    </td>

                    <td class="text-end">
                        $${producto.precio.toLocaleString('es-AR')}
                    </td>

                    <td class="text-end fw-bold">
                        $${subtotal.toLocaleString('es-AR')}
                    </td>

                    <td class="text-center">
                        <button
                            class="btn btn-outline-danger btn-sm btn-eliminar"
                            data-id="${indice}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>

                </tr>
            `;
        });

        document.getElementById(
            'total-carrito'
        ).textContent =
            '$' + total.toLocaleString('es-AR');

        // =========================
        // ELIMINAR PRODUCTO
        // =========================

        document.querySelectorAll('.btn-eliminar')
            .forEach(boton => {

                boton.addEventListener('click', function () {

                    const indice =
                        this.dataset.id;

                    carrito.splice(indice, 1);

                    localStorage.setItem(
                        'carrito',
                        JSON.stringify(carrito)
                    );

                    actualizarContador();
                    mostrarCarrito();

                });

            });
    }

});

//---------- BÚSQUEDA ----------
 
function inicializarBusqueda() {
 
    const input = document.querySelector('input[type="search"]');
 
    if (!input) return;
 
    const formulario = input.closest('form');
 
    input.addEventListener('input', () => {
 
        const texto = input.value.toLowerCase();
 
        document.querySelectorAll('.card').forEach(card => {
 
            const titulo = card
                .querySelector('.card-title')
                .textContent
                .toLowerCase();
 
            card.style.display =
                titulo.includes(texto) ? '' : 'none';
 
        });
 
    });
 
    if (formulario) {
 
        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault(); // evita que se recargue la página al presionar Enter o "Buscar"
        });
 
    }
 
}
 
// ---------- VALIDACIÓN DEL FORMULARIO DE CONTACTO ----------
 
function mostrarError(campo, mensaje) {
 
    limpiarError(campo);
 
    const error = document.createElement('small');
    error.className = 'mensaje-error';
    error.style.color = 'red';
    error.textContent = mensaje;
 
    campo.insertAdjacentElement('afterend', error);
}
 
function limpiarError(campo) {
 
    const siguiente = campo.nextElementSibling;
 
    if (siguiente && siguiente.classList.contains('mensaje-error')) {
        siguiente.remove();
    }
}
 
function validarFormulario(evento) {
  evento.preventDefault();
 
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const telefono = document.getElementById("telefono");
  const pedido = document.getElementById("pedido");
  let esValido = true;
 
  if (nombre.value.trim().length < 3) {
    mostrarError(nombre, "Ingresá tu nombre completo.");
    esValido = false;
  } else {
    limpiarError(nombre);
  }
 
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    mostrarError(email, "Ingresá un correo válido.");
    esValido = false;
  } else {
    limpiarError(email);
  }
 
  if (telefono.value.trim().length < 6) {
    mostrarError(telefono, "Ingresá un teléfono válido.");
    esValido = false;
  } else {
    limpiarError(telefono);
  }
 
  if (pedido.value.trim().length < 10) {
    mostrarError(pedido, "Contanos un poco más sobre tu pedido.");
    esValido = false;
  } else {
    limpiarError(pedido);
  }
 
  if (esValido) {
    evento.target.reset(); // RESETEA EL FORMULARIO
    window.location.href = "respuesta.html"; // REDIRIGE
  }
}
 
function inicializarValidacion() {
 
    const formulario = document.querySelector('form[action="respuesta.html"]');
 
    if (!formulario) return;
 
    formulario.addEventListener('submit', validarFormulario);
}
 
// ---------- INICIO ----------
 
document.addEventListener("DOMContentLoaded", () => {
  inicializarBusqueda();
  inicializarValidacion();
});