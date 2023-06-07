class Producto {
  constructor(id, nombre, descripcion, img, precio) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.img = img;
    this.precio = precio;
    this.cantidad = 1;
  }
}

const serenex = new Producto(1, "SERENEX", "Feromonas", "img/serenex.jpg", 5230);
const seisA = new Producto(2, "CREMA 6A", "Crema dermica", "img/crema.jpg", 1500);
const acedan = new Producto(3, "ACEDAN", "Tranquilizante", "img/acedan.jpg", 830);
const algen = new Producto(4, "ALGEN 20", "Analgésico", "https://www.sani.com.ar/usr/timthumb.php?src=https://www.sani.com.ar/productos/fotos/5372.jpg&w=112&h=150&zc=1", 750);

// Array de productos
const productos = [serenex, seisA, acedan, algen];

// Carrito vacío
let carrito = [];

//localstorage
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
};

const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () => {
  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `
        <div class="card h-100 m-3 pt-2">
          <img class="card-img-top imgProductos" src="${producto.img}" alt="${producto.nombre}">
          <div class="card-body">
            <h2 class="card-title">${producto.nombre}</h2>
            <h3 class="card-text">${producto.descripcion}</h3>
            <p class="card-text">Precio: $${producto.precio}</p>
            <button class="btn btn-success botonCompras" id="boton ${producto.id}">Agregar al carrito</button>
          </div>
        </div>`;

    contenedorProductos.appendChild(card);

    // Agregar al carrito
    const boton = document.getElementById(`boton ${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });
  });
};

mostrarProductos();

//funcion agregar productos al carrito

const agregarAlCarrito = (id) => {
  const productoEnCarrito = carrito.find(producto => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    const producto = productos.find(producto => producto.id === id);
    carrito.push(producto);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  calcularTotal();
}

//ver carrito de compras

const verCarrito = document.getElementById("verCarrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");

verCarrito.addEventListener("click", () => {
  mostrarCarrito();
});

//funcion para mostrar el carrito

const mostrarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carrito.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `
        <div class="card h-100 m-3 pt-2">
          <img class="card-img-top imgProductos" src="${producto.img}" alt="${producto.nombre}">
          <div class="card-body">
            <h2 class="card-title">${producto.nombre}</h2>
            <p class="card-text"> Precio: $${producto.precio}</p>
            <p class="card-text"> Cantidad: ${producto.cantidad}</p>
            <button class="btn btn-success" id="eliminar${producto.id}">Eliminar Producto</button>
          </div>
        </div>`;
    contenedorCarrito.appendChild(card);
    // eliminar productos del carrito
    const boton = document.getElementById(`eliminar${producto.id}`);
    boton.addEventListener("click", () => {
      eliminarDelCarrito(producto.id);
    });
  })
  calcularTotal();
};
//funcion que elimina el producto

const eliminarDelCarrito = (id) => {
  const producto = carrito.find(producto => producto.id === id);
  let indice = carrito.indexOf(producto);
  carrito.splice(indice, 1);
  mostrarCarrito();

  localStorage.setItem("carrito", JSON.stringify(carrito));
};

//vaciamos carrito de compras

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
  eliminarTodoElCarrito();
});

//funcion que elimina todo el carrito
const eliminarTodoElCarrito = () => {
  carrito = [];
  localStorage.clear();
  mostrarCarrito();
};

//mostrar el total de la compra 

const total = document.getElementById("total");

const calcularTotal = () => {
  let totalCompra = 0;
  carrito.forEach(producto => {
    totalCompra += producto.precio * producto.cantidad;
  })
  total.innerHTML = `Total: $ ${totalCompra}`;
};
