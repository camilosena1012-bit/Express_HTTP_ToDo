const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let tareas = [
  { id: 1, titulo: "maqueta", descripcion: "", estado: "pendiente", pasos: [] },
  { id: 2, titulo: "expo", descripcion: "", estado: "pendiente", pasos: [] },
  { id: 3, titulo: "fisica", descripcion: "", estado: "pendiente", pasos: [] },
  { id: 4, titulo: "vocabulario", descripcion: "", estado: "pendiente", pasos: [] },
  { id: 5, titulo: "informe", descripcion: "", estado: "pendiente", pasos: [] }
];

app.get("/tareas", (req, res) => {
  res.json(tareas);
});

app.get("/tareas/estado/pendientes", (req, res) => {
  const pendientes = tareas.filter(t => t.estado === "pendiente");
  res.json(pendientes);
});

app.get("/tareas/estado/completadas", (req, res) => {
  const completadas = tareas.filter(t => t.estado === "completada");
  res.json(completadas);
});

app.get("/tarea/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  const tarea = tareas.find((t) => t.titulo === nombre);

  if (!tarea) {
    return res.status(404).json({ mensaje: "Tarea no encontrada" });
  }

  res.json(tarea);
});

app.post("/tareas", (req, res) => {
  const { titulo, descripcion, estado, pasos } = req.body;

  if (!titulo || !estado) {
    return res.status(400).json({ mensaje: "El título y el estado son obligatorios" });
  }

  const nuevaTarea = {
    id: tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1,
    titulo,
    descripcion: descripcion || "",
    estado,
    pasos: pasos || []
  };

  tareas.push(nuevaTarea);
  res.status(201).json({ mensaje: "Tarea creada con éxito", tarea: nuevaTarea });
});

app.put("/tareas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, descripcion, estado, pasos } = req.body;

  const tareaIndex = tareas.findIndex(t => t.id === id);

  if (tareaIndex === -1) {
    return res.status(404).json({ mensaje: "Tarea no encontrada" });
  }

  tareas[tareaIndex] = {
    id,
    titulo: titulo || tareas[tareaIndex].titulo,
    descripcion: descripcion !== undefined ? descripcion : tareas[tareaIndex].descripcion,
    estado: estado || tareas[tareaIndex].estado,
    pasos: pasos || tareas[tareaIndex].pasos
  };

  res.json({ mensaje: "Tarea actualizada con éxito", tarea: tareas[tareaIndex] });
});

app.patch("/tareas/:id/estado", (req, res) => {
  const id = parseInt(req.params.id);
  const { estado } = req.body;

  if (!estado) {
    return res.status(400).json({ mensaje: "El campo estado es requerido" });
  }

  const tarea = tareas.find(t => t.id === id);

  if (!tarea) {
    return res.status(404).json({ mensaje: "Tarea no encontrada" });
  }

  tarea.estado = estado;
  res.json({ mensaje: "Estado de la tarea actualizado con éxito", tarea });
});

app.delete("/tareas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tareaIndex = tareas.findIndex(t => t.id === id);

  if (tareaIndex === -1) {
    return res.status(404).json({ mensaje: "Tarea no encontrada" });
  }

  const tareaEliminada = tareas.splice(tareaIndex, 1);
  res.json({ mensaje: "Tarea eliminada con éxito", tarea: tareaEliminada[0] });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});