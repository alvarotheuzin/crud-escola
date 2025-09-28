const express = require("express");
const router = express.Router();

let professores = [
  { id: 1, nome: "Carlos Pereira", disciplina: "Matemática" },
  { id: 2, nome: "Ana Lima", disciplina: "História" }
];


router.get("/", (req, res) => {
  res.json(professores);
});

router.get("/:id", (req, res) => {
  const professor = professores.find(p => p.id === parseInt(req.params.id));
  if (!professor) return res.status(404).json({ error: "Professor não encontrado" });
  res.json(professor);
});


router.post("/", (req, res) => {
  const { nome, disciplina } = req.body;

  if (!nome || !disciplina) {
    return res.status(400).json({ error: "Nome e disciplina são obrigatórios" });
  }

  if (professores.some(p => p.nome === nome && p.disciplina === disciplina)) {
    return res.status(400).json({ error: "Professor já cadastrado" });
  }

  const novoProfessor = {
    id: professores.length + 1,
    nome,
    disciplina
  };

  professores.push(novoProfessor);
  res.status(201).json(novoProfessor);
});


router.put("/:id", (req, res) => {
  const professor = professores.find(p => p.id === parseInt(req.params.id));
  if (!professor) return res.status(404).json({ error: "Professor não encontrado" });

  const { nome, disciplina } = req.body;
  if (nome) professor.nome = nome;
  if (disciplina) professor.disciplina = disciplina;

  res.json(professor);
});

router.delete("/:id", (req, res) => {
  const index = professores.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Professor não encontrado" });

  const removido = professores.splice(index, 1);
  res.json(removido[0]);
});

module.exports = router;