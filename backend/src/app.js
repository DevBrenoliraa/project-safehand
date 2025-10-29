import express from "express";
import cors from "cors";

import { erroHandller } from "./middleware/erroHandller.js";
import { connection } from "./config/sequelize.js";

// Rotas
import usuarioRouter from "./features/usuario/usuarioRouter.js";
import funcionarioRouter from "./features/funcionario/funcionarioRouter.js";
import epiRouter from "./features/epi/epiRouter.js";
import routes from "./features/usuario/usuarioRouter.js";

const app = express();
connection.sync();

app.use(cors({
    orrigin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        statusCode: 200,
        message: 'Ativo',
        endpoints: "http://localhost:3000/api/funcionario, http://localhost:3000/api/usuario, http://localhost:3000/api/epi"
    });
});

app.use("/api/usuario", usuarioRouter);
app.use("/api/funcionario", funcionarioRouter);
app.use("/api/epi", epiRouter);

app.use(erroHandller);

export default app;