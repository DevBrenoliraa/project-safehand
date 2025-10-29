import { Router } from "express";
import { listarFuncionarios, cadastrarFuncionario, atualizarFuncionario, deletarFuncionario } from "./funcionarioController.js";

const routes = Router();

routes.get("/", listarFuncionarios); // http://localhost:3000/api/funcionario
routes.post("/cadastro", cadastrarFuncionario); // http://localhost:3000/api/funcionario/cadastro
routes.put("/:id", atualizarFuncionario); // http://localhost:3000/api/funcionario/:id
routes.delete("/:id", deletarFuncionario); // http://localhost:3000/api/funcionario/:id

export default routes;