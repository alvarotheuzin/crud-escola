const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(" ----- LOG DE REQUISIÇÃO ----- ");
    console.log("Time: ", new Date().toLocaleString());
    console.log("METODO: ", req.method);
    console.log("ROTA: ", req.route);
    next();
});

const Alunos = require("./routes/alunos");
app.use(Alunos);

app.listen(3000, () => {
    console.log("Rodando em http://localhost:3000");
});
