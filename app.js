const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let tareas = [
  { id: 1, materia: "Matemáticas", nombre: "maqueta" },
  { id: 2, materia: "Programación", nombre: "expo" },
  { id: 3, materia: "Base de Datos", nombre: "fisica" },
  { id: 4, materia: "Inglés", nombre: "vocabulario" },
  { id: 5, materia: "Analisis y Desarrollo", nombre: "informe" }
];

app.get("/tareas", (req, res) => {
  res.json(tareas);
});

app.get("/tarea/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  const tarea = tareas.find((t) => t.nombre === nombre);

})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
