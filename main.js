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

const serenex = new Producto(
  1,
  "SERENEX",
  "Feromonas",
  "img/serenex.jpg",
  5230
);
const seisA = new Producto(
  2,
  "CREMA 6A",
  "Crema dermica",
  "img/crema.jpg",
  1500
);
const acedan = new Producto(
  3,
  "ACEDAN",
  "Tranquilizante",
  "img/acedan.jpg",
  830
);
const algen = new Producto(
  4,
  "ALGEN 20",
  "Analgésico",
  "https://www.sani.com.ar/usr/timthumb.php?src=https://www.sani.com.ar/productos/fotos/5372.jpg&w=112&h=150&zc=1",
  750
);
const basken = new Producto(
  5,
  "Basken",
  "Antiparasitario Interno",
  "https://www.sani.com.ar/usr/timthumb.php?src=https://www.sani.com.ar/productos/fotos/1509.jpg&w=112&h=150&zc=1",
  205
);
const bactrovet = new Producto(
  6,
  "Bactrovet",
  "Curabichera",
  "https://www.sani.com.ar/usr/timthumb.php?src=https://www.sani.com.ar/productos/fotos/7454.jpg&w=112&h=150&zc=1",
  2420
);
const gelAntiplaca = new Producto(
  7,
  "Gel Antiplaca",
  "Antiséptico Bucal",
  "https://www.sani.com.ar/usr/timthumb.php?src=https://www.sani.com.ar/productos/fotos/2300.jpg&w=112&h=150&zc=1",
  1800
);
const apetil = new Producto(
  8,
  "Apetil",
  "Estimulante del apetito",
  "https://www.sani.com.ar/usr/timthumb.php?src=https://www.sani.com.ar/productos/fotos/2224.jpg&w=112&h=150&zc=1",
  2750
);
// Array de productos
const productos = [
  serenex,
  seisA,
  acedan,
  algen,
  basken,
  bactrovet,
  gelAntiplaca,
];

// Carrito vacío
let carrito = [];

//localstorage
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () => {
  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `
        <div class="card h-100">
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
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    const producto = productos.find((producto) => producto.id === id);
    carrito.push(producto);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  calcularTotal();
};

//ver carrito de compras

const verCarrito = document.getElementById("verCarrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");

verCarrito.addEventListener("click", () => {
  mostrarCarrito();
});

//funcion para mostrar el carrito

const mostrarCarrito = () => {
  contenedorCarrito.innerHTML = "";

  carrito.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `
        <div class="card h-100">
          <img class="card-img-top imgProductos" src="${producto.img}" alt="${producto.nombre}">
          <div class="card-body">
            <h2 class="card-title">${producto.nombre}</h2>
            <p class="card-text"> Precio: $${producto.precio}</p>
            <p class="card-text"> Cantidad: ${producto.cantidad}</p>
            <button class="btn btn-success btn-sm " id="aumentar${producto.id}">+</button>
            <button class="btn btn-success btn-sm " id="disminuir${producto.id}">-</button>
            <button class="btn btn-success" id="eliminar${producto.id}">Eliminar Producto</button>
          </div>
        </div>`;

    contenedorCarrito.appendChild(card);

    // Disminuir la cantidad del producto
    const disminuirBtn = document.getElementById(`disminuir${producto.id}`);
    disminuirBtn.addEventListener("click", () => {
      disminuirCantidad(producto.id);
    });

    // Aumentar la cantidad del producto
    const aumentarBtn = document.getElementById(`aumentar${producto.id}`);
    aumentarBtn.addEventListener("click", () => {
      aumentarCantidad(producto.id);
    });

    // Eliminar productos del carrito
    const boton = document.getElementById(`eliminar${producto.id}`);
    boton.addEventListener("click", () => {
      eliminarDelCarrito(producto.id);
    });
  });
  calcularTotal();
  const finalizarCompraBtn = document.createElement("button");
  finalizarCompraBtn.classList.add("btn", "btn-primary");
  finalizarCompraBtn.id = "finalizarCompraBtn";
  finalizarCompraBtn.textContent = "Finalizar Compra";
  contenedorCarrito.appendChild(finalizarCompraBtn);

  finalizarCompraBtn.addEventListener("click", () => {

    // Productos del carrito y calculo del total de compra
    const productosEnCarrito = carrito.map(
      (producto) => `${producto.nombre} - Cantidad: ${producto.cantidad}`
    );

    const CompraFinalCarrito = calcularTotalCarrito();

    // Mensaje de confirmación con los productos y el total
    const listaProductos = productosEnCarrito
      .map((producto) => `<li>${producto}</li>`)
      .join("");
    const mensaje = `<ul>${listaProductos}</ul>Total de compra: $${CompraFinalCarrito}`;

    // Confirmación con SweetAlert
    Swal.fire({
      title: "Confirmar compra",
      html: mensaje,
      icon: "info",
      buttons: ["Cancelar", "Confirmar"],
    }).then((confirmado) => {
      if (confirmado) {
        // Cuando se confirma la compra
        Swal.fire("¡Gracias por su compra!", "", "success");
      }
    });
  });
};

/*constante de calcular total carrito sweet alert*/

const calcularTotalCarrito = () => {
  let totalCompra = 0;
  carrito.forEach((producto) => {
    totalCompra += producto.precio * producto.cantidad;
  });
  return totalCompra;
};

/*Aumentar y disminuri cantidad constantes*/

const disminuirCantidad = (id) => {
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito && productoEnCarrito.cantidad > 1) {
    productoEnCarrito.cantidad--;
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
};

const aumentarCantidad = (id) => {
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
};

//funcion que elimina el producto

const eliminarDelCarrito = (id) => {
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito) {
    Swal.fire({
      title: "Eliminar producto",
      text: `¿Estás seguro de eliminar "${productoEnCarrito.nombre}" del carrito?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "grey",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const indice = carrito.indexOf(productoEnCarrito);
        carrito.splice(indice, 1);
        mostrarCarrito();
        localStorage.setItem("carrito", JSON.stringify(carrito));
      }
    });
  }
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
  carrito.forEach((producto) => {
    totalCompra += producto.precio * producto.cantidad;
  });
  total.innerHTML = `Total: $ ${totalCompra}`;
};

/*finalizar compra*/

/************************************/
//login

const login = document.getElementById("login");

const usuarioAutorizado = "admin";
const passwordAutorizado = "1234";

login.addEventListener("click", () => {
  Swal.fire({
    title: "Inicio de sesion Veterinarios",
    html: `<input type="text" id="usuario" class="swal2-input" placeholder="Usuario">
            <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
    confirmButtonText: "Enviar",
    showCancelButton: true,
    cancelButtonText: "cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      let usuario = document.getElementById("usuario").value;
      let password = document.getElementById("password").value;
      if (usuario === usuarioAutorizado && password === passwordAutorizado) {
        window.location.href = "login.html";
      } else {
        Swal.fire("Error", "Usuario o contraseña incorrectos", "error");
      }
    }
  });
});
