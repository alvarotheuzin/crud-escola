const express = require('express');
const router = express.Router();

let ListaDeAlunos = [
    {
        id: "1",
        nome: "Alvaro Matheus",
        email: "alvarotheus@gmail.com",
        cpf: "00011122234",
        telefone: "(61) 999999999",
        dataNascimento: "28/04/2003",
    },
    {
        id: "2",
        nome: "João Victor",
        email: "joaovictor@gmail.com",
        cpf: "99911122200",
        telefone: "(61) 999999999",
        dataNascimento: "27/04/2003",
    },
];


router.post("/alunos", (req, res) => {
    const { nome, email, cpf, telefone, dataNascimento } = req.body;

    if (!nome || !email || !cpf || !telefone || !dataNascimento) {
        return res.status(400).json({ error: "nome, email, cpf, telefone e dataNascimento são OBRIGATÓRIOS!" });
    }

    const alunoExistente = ListaDeAlunos.find(aluno => aluno.cpf == cpf);
    if (alunoExistente) {
        return res.status(409).json({ error: "CPF já cadastrado!" });
    }

    const novoAluno = {
        id: Date.now(),
        nome,
        email,
        cpf,
        telefone,
        dataNascimento,
    };

    ListaDeAlunos.push(novoAluno);
    res.status(201).json({ message: "Aluno cadastrado com sucesso!", aluno: novoAluno });
});


router.get('/alunos', (req, res) => {
    res.json(ListaDeAlunos);
});


router.get("/alunos/:id", (req, res) => {
    const idRecebido = req.params.id;
    const aluno = ListaDeAlunos.find(aluno => aluno.id == idRecebido);

    if (!aluno) {
        return res.status(404).json({ error: "Aluno não encontrado!" });
    }

    res.status(200).json(aluno);
});


router.put("/alunos/:id", (req, res) => {
    const idRecebido = req.params.id;
    const { nome, telefone, email, dataNascimento } = req.body;

    if (!nome || !telefone || !email || !dataNascimento) {
        return res.status(400).json({
            error: "nome, telefone, email e dataNascimento são OBRIGATÓRIOS!",
        });
    }

    const aluno = ListaDeAlunos.find(aluno => aluno.id == idRecebido);
    if (!aluno) {
        return res.status(404).json({ error: "Aluno não ENCONTRADO!!!" });
    }

    aluno.nome = nome;
    aluno.telefone = telefone;
    aluno.email = email;
    aluno.dataNascimento = dataNascimento;

    res.json({ message: "Aluno atualizado com SUCESSO!!!", aluno });
});


router.delete("/alunos/:id", (req, res) => {
    const idRecebido = req.params.id;
    const aluno = ListaDeAlunos.find(aluno => aluno.id == idRecebido);

    if (!aluno) {
        return res.status(404).json({ error: "Aluno não ENCONTRADO!!!" });
    }

    ListaDeAlunos = ListaDeAlunos.filter(aluno => aluno.id != idRecebido);

    res.json({ message: "Aluno excluído com SUCESSO!" });
});

module.exports = router;
