document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.btn-mas').forEach(boton => {
        boton.addEventListener('click', function () {
            const input = this
                .closest('.grupo-cant')
                .querySelector('.cant');

            input.value = parseInt(input.value || 0) + 1;
        });
    });

    document.querySelectorAll('.btn-menos').forEach(boton => {
        boton.addEventListener('click', function () {
            const input = this
                .closest('.grupo-cant')
                .querySelector('.cant');

            const valor = parseInt(input.value || 0);

            if (valor > 1) {
                input.value = valor - 1;
            }
        });
    });

    let total = 0;
    const contador = document.getElementById('icono-contador');

    document.querySelectorAll('.btn-agregar').forEach(boton => {
        boton.addEventListener('click', function () {

            const input = this
                .closest('.card-body')
                .querySelector('.cant');

            let cantidad = parseInt(input.value);

            if (isNaN(cantidad) || cantidad < 1) {
                cantidad = 1;
                input.value = 1;
            }

            total += cantidad;

            if (contador) {
                contador.textContent = total;
                contador.classList.remove('d-none');
            }

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
});