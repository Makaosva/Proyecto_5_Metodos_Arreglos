// Seleccionar los elementos del DOM
const nuevaTareaInput = document.querySelector("#task");
const tbody = document.querySelector("#task-list");
const btn = document.querySelector("button");
const [totalSpan, realizadasSpan] = document.querySelectorAll("#stats span");

// Arreglo para almacenar las tareas
const tareas = [];

// Objeto para almacenar el resumen de libros
let resumen = {
  total: 0,
  realizadas: 0,
};

// Función para agregar una tarea a la lista
const addTarea = (tarea) => {
  const id = Math.floor(Math.random() * 99);
  const task = {
    id,
    tarea,
    realizada: false,
  };
  tareas.push(task);
};

// Función para marcar una tarea como realizado o no realizado
const checkInput = (id) => {
  const task = tareas.find((task) => task.id === id);
  task.realizada = !task.realizada;
  refresh();
};

// Función para eliminar una tarea de la lista
const deleteTarea = (id) => {
  const index = tareas.findIndex((task) => task.id === id);
  tareas.splice(index, 1);
  refresh();
};

const fillList = () => {
  const taskList = document.querySelector("#task-list");
  taskList.innerHTML = ""; // Limpiar la lista antes de agregar elementos

  tareas.forEach(({ id, tarea, realizada }) => {
    const listItem = document.createElement("li");

    // Agregar contenido al elemento <li>
    listItem.innerHTML = `
        <p><span>${id}</span></p>
        <p><span>${tarea}</span>
        <input onchange="checkInput(${id})" ${
      realizada ? "checked" : ""
    } type="checkbox"/>
        <span onclick="deleteTarea(${id})">❌</span></p>
        `;

    taskList.appendChild(listItem); // Agregar el elemento <li> a la lista
  });
};

// Función para actualizar la lista y el resumen
const refresh = () => {
  fillList(); // Llenar la lista en lugar de la tabla
  calculateResumen();
  updateResumen();
};

// Función para calcular el resumen de tareas
const calculateResumen = () => {
  resumen.total = tareas.length;
  resumen.realizadas = tareas.filter(({ realizada }) => realizada).length;
};

// Función para actualizar el resumen en la interfaz
const updateResumen = () => {
  const { total, realizadas } = resumen;
  totalSpan.textContent = total;
  realizadasSpan.textContent = realizadas;
};

// Event listener para el botón de agregar tarea
btn.addEventListener("click", () => {
  const nuevaTarea = nuevaTareaInput.value.trim();
  if (nuevaTarea) {
    addTarea(nuevaTarea);
    refresh();
    nuevaTareaInput.value = "";
  } else {
    alert("Debe completar el campo.");
  }
});

// Llenar la tabla inicial con algunas tareas predefinidas
addTarea("Estudiar para la prueba");
addTarea("Preparar Almuerzo");
addTarea("Comprar comida para los gatos");
refresh();
