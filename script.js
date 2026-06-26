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