//login 

const login = document.getElementById("login");

login.addEventListener("click", () => {
  Swal.fire({
    title: "Inicio de sesión Veterinarios",
    html: `<input type="text" id="apellido" class="swal2-input" placeholder="Apellido">
           <input type="text" id="dni" class="swal2-input" placeholder="DNI">`,
    confirmButtonText: "Igresar",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      const apellido = document.getElementById("apellido").value.toLowerCase();
      const dni = parseInt(document.getElementById("dni").value);
      const cliente = arrayClientes.find((cliente) => cliente.apellido.toLowerCase() === apellido && cliente.dni === dni);
      
      if (cliente) {
        Swal.fire("¡Inicio de sesión exitoso!", `${cliente.nombre.toUpperCase()} eres una veterinaria autorizada.`, "success").then(() => {
          window.location.href = "login.html";
        });
      } else {
        Swal.fire("Error", "Apellido o DNI incorrectos", "error");
      }
    }
  });
});



/****Nuevos Clientes*****/

//DATOS CLIENTES VETERINARIA

const nuevoUsuario = document.getElementById("nuevoUsuario");

//Constructor de clientes
class Cliente {
  constructor(nombre, apellido, dni, nombreMascota, edadMascota) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.nombreMascota = nombreMascota;
    this.edadMascota = edadMascota;
  }
}

//Algunos clientes ficticios con el constructor
const clienteZarazaga = new Cliente(
  "pilar",
  "zarazaga",
  30899271,
  "finita",
  16
);
const clienteLopez = new Cliente("tania", "lopez", 30899272, "clona", 5);
const clienteProietti = new Cliente(
  "josefina",
  "proietti",
  30899273,
  "nilo",
  3
);
const clientePerotti = new Cliente("antonella", "perroti", 30899274, "gala", 8);

//Creamos array de clientes
const arrayClientes = [];

//Ingresamos los clientes al array
arrayClientes.push(clienteZarazaga);
arrayClientes.push(clienteLopez);
arrayClientes.push(clienteProietti);
arrayClientes.push(clientePerotti);

//Funcion menu de opciones:
nuevoUsuario.addEventListener("click", () => {
  function menuPrincipal() {
    return Swal.fire({
            title: "¡Bienvenido a Kanus Veterinaria!",
            text: "Por favor, seleccione una opción:",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            buttonsStyling: true,
            showCloseButton: true,
            html: `
              <div class="swal2-content">
                <div class="swal2-radio">
                  <input type="radio" id="alta" name="opcion" value="alta">
                  <label for="alta">Alta como cliente</label>
                </div>
                <div class="swal2-radio">
                  <input type="radio" id="baja" name="opcion" value="baja">
                  <label for="baja">Baja como cliente</label>
                </div>
                <div class="swal2-radio">
                  <input type="radio" id="consulta" name="opcion" value="consulta">
                  <label for="consulta">Consulta de datos</label>
                </div>
              </div>
            `,
            preConfirm: () => {
              const selectedOption = document.querySelector('input[name="opcion"]:checked');
              return selectedOption ? selectedOption.value : null;
            }
          });
  };


//Inscripcion como cliente
function altaCliente() {
    Swal.fire({
      title: "Inscripción como cliente",
      text: "Por favor, complete los siguientes campos:",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      html: `
        <input type="text" id="nombre" placeholder="Nombre" class="swal2-input">
        <input type="text" id="apellido" placeholder="Apellido" class="swal2-input">
        <input type="text" id="dni" placeholder="DNI" class="swal2-input">
        <input type="text" id="nombreMascota" placeholder="Nombre de la mascota" class="swal2-input">
        <input type="text" id="edadMascota" placeholder="Edad de la mascota" class="swal2-input">
      `,
      preConfirm: () => {
        const nombre = document.getElementById("nombre").value.toLowerCase();
        const apellido = document.getElementById("apellido").value.toLowerCase();
        const dni = parseInt(document.getElementById("dni").value);
        const nombreMascota = document.getElementById("nombreMascota").value;
        const edadMascota = parseInt(document.getElementById("edadMascota").value);
        
        if (!nombre || !apellido || isNaN(dni) || !nombreMascota || isNaN(edadMascota)) {
          Swal.showValidationMessage("Por favor, complete todos los campos.");
        } else {
          const cliente = new Cliente(nombre, apellido, dni, nombreMascota, edadMascota);
          arrayClientes.push(cliente);
          return cliente;
        }
      }
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          "¡Alta exitosa!",
          "Usted ha sido registrado como cliente.",
          "success"
        );
      }
    });
  }
//baja como cliente
function bajaCliente() {
    Swal.fire({
      title: "Baja como cliente",
      text: "Ingrese su DNI:",
      icon: "warning",
      input: "text",
      inputAttributes: {
        pattern: "\\d*",
      },
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        const dni = parseInt(result.value);
        const cliente = arrayClientes.find((cliente) => cliente.dni === dni);
        if (cliente) {
          const indice = arrayClientes.indexOf(cliente);
          arrayClientes.splice(indice, 1);
          Swal.fire(
            "¡Baja exitosa!",
            `Tu baja fue exitosa, ${cliente.apellido.toUpperCase()} ${cliente.nombre.toUpperCase()}.`,
            "success"
          );
        } else {
          Swal.fire("Error", "El cliente no existe en la base de datos.", "error");
        }
      }
    });
  }
  
  
//Consultar datos
function consultaCliente() {
    Swal.fire({
      title: "Consulta de datos",
      text: "Ingrese su DNI:",
      input: "text",
      inputAttributes: {
        pattern: "\\d*",
      },
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const dni = parseInt(result.value);
        const cliente = arrayClientes.find((cliente) => cliente.dni === dni);
        if (cliente) {
          Swal.fire(
            "Base de datos Kanus",
            `Se encuentra registrado como ${cliente.apellido.toUpperCase()} ${cliente.nombre.toUpperCase()}, propietario de ${cliente.nombreMascota} de ${cliente.edadMascota} años de edad.`,
            
          );
        } else {
          Swal.fire("Error", "El cliente no se encuentra registrado.", "error");
        }
      }
    });
  }

//menu principal
function menuPrincipal() {
    Swal.fire({
      title: "¡Bienvenido a Kanus Veterinaria!",
      text: "Por favor, seleccione una opción:",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      buttonsStyling: true,
      showCloseButton: true,
      html: `
        <div class="swal2-content">
          <div class="swal2-radio">
            <input type="radio" id="alta" name="opcion" value="alta">
            <label for="alta">Alta como cliente</label>
          </div>
          <div class="swal2-radio">
            <input type="radio" id="baja" name="opcion" value="baja">
            <label for="baja">Baja como cliente</label>
          </div>
          <div class="swal2-radio">
            <input type="radio" id="consulta" name="opcion" value="consulta">
            <label for="consulta">Consulta de datos</label>
          </div>
        </div>
      `,
      preConfirm: () => {
        const selectedOption = document.querySelector('input[name="opcion"]:checked');
        return selectedOption ? selectedOption.value : null;
      }
    }).then((result) => {
      if (result.value) {
        switch (result.value) {
          case "alta":
            altaCliente();
            break;
          case "baja":
            bajaCliente();
            break;
          case "consulta":
            consultaCliente();
            break;
          default:
            Swal.fire("Opción inválida", "", "error");
            break;
        }
      }
    });
  }
  
  menuPrincipal();
});
