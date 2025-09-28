const express = require("express");
const router = express.Router();

let professores = [
  { id: 1, nome: "Carlos Pereira", email: "carlos@exemplo.com", cpf: "11111111111", curso: "Engenharia", disciplina: "Matemática" },
  { id: 2, nome: "Ana Lima", email: "ana@exemplo.com", cpf: "22222222222", curso: "História", disciplina: "História Antiga" }
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
  const { nome, email, cpf, curso, disciplina } = req.body;

  if (!nome || !email || !cpf || !curso || !disciplina) {
    return res.status(400).json({ error: "Todos os campos (nome, email, cpf, curso, disciplina) são obrigatórios" });
  }

  if (professores.some(p => p.cpf === cpf)) {
    return res.status(400).json({ error: "Professor já cadastrado com esse CPF" });
  }

  const novoProfessor = {
    id: professores.length > 0 ? professores[professores.length - 1].id + 1 : 1,
    nome,
    email,
    cpf,
    curso,
    disciplina
  };

  professores.push(novoProfessor);
  res.status(201).json(novoProfessor);
});

router.put("/:id", (req, res) => {
  const professor = professores.find(p => p.id === parseInt(req.params.id));
  if (!professor) return res.status(404).json({ error: "Professor não encontrado" });

  const { nome, email, cpf, curso, disciplina } = req.body;

  if (nome) professor.nome = nome;
  if (email) professor.email = email;
  if (cpf) professor.cpf = cpf;
  if (curso) professor.curso = curso;
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
