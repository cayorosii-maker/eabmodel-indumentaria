# EABMODEL | Tienda de Indumentaria

Proyecto realizado como trabajo práctico integrador utilizando **HTML, CSS y JavaScript**. El objetivo fue desarrollar una tienda online de indumentaria masculina con un diseño responsive, un carrito de compras funcional y un formulario de contacto con validaciones.

El sitio fue pensado para que el usuario pueda navegar de forma sencilla entre las distintas categorías, seleccionar productos y simular una compra de manera intuitiva.

---

## Descripción del proyecto

EABMODEL es una tienda ficticia dedicada a la venta de ropa masculina. Durante el desarrollo se buscó aplicar los conocimientos adquiridos sobre estructura de páginas web, estilos con CSS y programación con JavaScript.

El sitio permite recorrer diferentes categorías de productos, agregarlos al carrito, modificar cantidades y finalizar una compra simulada. Además, cuenta con un formulario de contacto que verifica que la información ingresada sea correcta antes de enviarla.

---

## Funcionalidades

- Catálogo organizado por categorías.
- Selección de cantidad antes de agregar un producto.
- Carrito de compras dinámico.
- Almacenamiento del carrito mediante **LocalStorage**.
- Contador automático de productos en el carrito.
- Eliminación de productos del carrito.
- Cálculo automático del total de la compra.
- Confirmación de compra.
- Buscador de productos en tiempo real.
- Formulario de contacto con validación mediante HTML5 y JavaScript.
- Diseño adaptable para distintos tamaños de pantalla.

---

## Estructura del proyecto

```
├── index.html
├── remeras.html
├── buzos.html
├── pantalones.html
├── carrito.html
├── contacto.html
├── respuesta.html
├── gracias.html
├── style.css
├── script.js
└── Imagenes/
```

---

## Tecnologías utilizadas

- HTML5
- CSS3
- Bootstrap 5
- Bootstrap Icons
- JavaScript (Vanilla)

---

## Funcionalidades de JavaScript

El archivo `script.js` concentra toda la lógica del sitio. Entre las funciones principales se encuentran:

- Control de la cantidad de productos mediante los botones **+** y **-**.
- Agregado de productos al carrito.
- Actualización automática del contador del carrito.
- Guardado de la información utilizando **LocalStorage**.
- Visualización del contenido del carrito.
- Eliminación de productos.
- Cálculo del total de la compra.
- Confirmación de compra.
- Buscador dinámico de productos.
- Validación del formulario de contacto.
- Mensajes de error personalizados cuando un dato no es válido.

---

## Cómo ejecutar el proyecto

1. Descargar o clonar el repositorio.

```bash
git clone https://github.com/Braian436/eabmodel-indumentaria.git
```

2. Abrir la carpeta del proyecto.

3. Ejecutar el archivo `index.html` desde cualquier navegador.

También puede utilizarse **Live Server** en Visual Studio Code para una mejor visualización durante el desarrollo.

No es necesario instalar dependencias ni utilizar un servidor, ya que el proyecto funciona completamente del lado del cliente.

---

## Objetivos del trabajo

Durante la realización del proyecto se buscó:

- Aplicar HTML semántico.
- Diseñar una interfaz limpia y responsive utilizando CSS y Bootstrap.
- Implementar interactividad mediante JavaScript.
- Utilizar LocalStorage para conservar la información del carrito.
- Validar formularios del lado del cliente.
- Mejorar la experiencia del usuario mediante una navegación sencilla.

---

## Autores

- Amaya
- Cayo
- Tolaba
- Zambrano
- Celeste
- Braian

---

## Licencia

Proyecto desarrollado únicamente con fines académicos como trabajo práctico de la materia de Desarrollo Web.