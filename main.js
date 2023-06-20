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
const ciprovet = new Producto(
  9,
  "Ciprovet",
  "colirio",
  "https://www.sani.com.ar/usr/timthumb.php?src=https://www.sani.com.ar/productos/fotos/7434.jpg&w=188&h=250&zc=1",
  1890
);
const geriox = new Producto(
  10,
  "Geriox",
  "Condroprotector",
  "https://www.sani.com.ar/usr/timthumb.php?src=https://www.sani.com.ar/productos/fotos/5986.jpg&w=112&h=150&zc=1",
  4350
);
const labyderms = new Producto(
  11,
  "Labyderms",
  "Vitaminas Sopt On",
  "https://www.sani.com.ar/usr/timthumb.php?src=https://www.sani.com.ar/productos/fotos/7430.jpg&w=112&h=150&zc=1",
  3477
);
const tau = new Producto(
  12,
  "Tau",
  "Colirio",
  "https://www.sani.com.ar/usr/timthumb.php?src=https://www.sani.com.ar/productos/fotos/5993.jpg&w=112&h=150&zc=1",
  1960
);
const pipetaLabyderms = new Producto(
  13,
  "Pipeta Labyderms",
  "Antiparasitario Externo",
  "https://www.sani.com.ar/usr/timthumb.php?src=https://www.sani.com.ar/productos/fotos/7427.jpg&w=112&h=150&zc=1",
  1786
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
  ciprovet,
  geriox,
  labyderms,
  tau,
  pipetaLabyderms,
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
    const mensaje = `<ul>${listaProductos}</ul>Total de su compra: $${CompraFinalCarrito}`;

    // Confirmación con SweetAlert
    Swal.fire({
      title: "Confirmar compra",
      html: mensaje,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Cuando se confirma la compra
        Swal.fire({
          title: "¡Gracias por su compra!",
          icon: "success",
          confirmButtonText: "Salir",
        });
      } else {
        // Cuando se cancela la compra
        // No se muestra ningún mensaje adicional
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

/****Buscador*****/
const buscarProductos = () => {
  const termino = document.getElementById("busqueda").value.toLowerCase();
  const resultados = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(termino) ||
      producto.descripcion.toLowerCase().includes(termino)
  );

  mostrarResultados(resultados);
};


document.getElementById("busqueda").addEventListener("input", buscarProductos);

const mostrarResultados = (resultados) => {
  // Limpiar el contenedor de productos antes de mostrar los resultados
  contenedorProductos.innerHTML = "";

  resultados.forEach((producto) => {
      const card = document.createElement("div");
      card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
      card.innerHTML = `
          <div class="card h-100">
            <img class="card-img-top imgProductos" src="${producto.img}" alt="${producto.nombre}">
            <div class="card-body">
              <h2 class="card-title">${producto.nombre}</h2>
              <h3 class="card-text">${producto.descripcion}</h3>
              <p class="card-text"> Precio: $${producto.precio}</p>
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

/***set interval colores *****/
let coloresFondo = [
  "rgb(232, 248, 245)", "rgb(232, 246, 243)", "rgb(233, 247, 239)", "rgb(234, 250, 241)", "rgb(244, 246, 246)",
  "rgb(240, 248, 232)", "rgb(238, 245, 232)", "rgb(236, 247, 233)", "rgb(238, 250, 234)", "rgb(243, 246, 244)",
  "rgb(255, 254, 211)", "rgb(255, 252, 208)", "rgb(255, 255, 204)", "rgb(255, 253, 201)", "rgb(255, 255, 198)",
  "rgb(243, 243, 243)", "rgb(241, 241, 241)", "rgb(239, 239, 239)", "rgb(237, 237, 237)", "rgb(235, 235, 235)",
  "rgb(220, 255, 190)", "rgb(225, 255, 195)", "rgb(230, 255, 200)", "rgb(235, 255, 205)", "rgb(240, 255, 210)",
  "rgb(255, 250, 200)", "rgb(255, 245, 195)", "rgb(255, 240, 190)", "rgb(255, 235, 185)", "rgb(255, 230, 180)",
  "rgb(204, 255, 255)", "rgb(207, 252, 255)", "rgb(210, 249, 255)", "rgb(213, 246, 255)", "rgb(216, 243, 255)",
  "rgb(255, 220, 220)", "rgb(255, 215, 215)", "rgb(255, 210, 210)", "rgb(255, 205, 205)", "rgb(255, 200, 200)",
  "rgb(228, 228, 255)", "rgb(224, 224, 255)", "rgb(220, 220, 255)", "rgb(216, 216, 255)", "rgb(212, 212, 255)",
  "rgb(230, 230, 230)", "rgb(232, 232, 232)", "rgb(234, 234, 234)", "rgb(236, 236, 236)", "rgb(238, 238, 238)"
];

let i = 0;
const intervalos = setInterval(() => {
  document.querySelector('footer').style.backgroundColor = coloresFondo[i];
  i++;
  if (i == coloresFondo.length) {
    clearInterval(intervalos);
  }
}, 2000);

/*** fetch Api comentario clienetes*******/

const apiUrl = "https://jsonplaceholder.typicode.com/comments";

const apiComentarios = document.getElementById("apiComentarios");

fetch(apiUrl)
    .then(respuesta => respuesta.json())
    .then(datos => {
      console.log(datos);
      mostrarComentarios(datos.slice(0, 9)); 
    })
    .catch(error => console.log(error));

function mostrarComentarios(datos) {
  let html = '<div class="grid-container">';
  
  datos.forEach((comentario, index) => {
    html += `
      <div class="card2">
        <div class="card-body2">
          <h2 class="fw-bold title2">${comentario.name}</h2>
          <p>${comentario.body}</p>
          <p>${comentario.email}</p>
        </div>
      </div>
    `;
  });

  html += '</div>';
  
  apiComentarios.innerHTML = html;
}


