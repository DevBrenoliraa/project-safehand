import { Router } from "express";
import { listarEpi, cadastrarEpi, atualizarEpi, deletarEpi } from "./epiController.js";

const routes = Router();

routes.get("/", listarEpi); // http://localhost:3000/api/epi
routes.post("/cadastro", cadastrarEpi); // http://localhost:3000/api/epi/cadastro
routes.put("/:id", atualizarEpi); // http://localhost:3000/api/epi/:id
routes.delete("/:id", deletarEpi); // http://localhost:3000/api/epi/:id

export default routes;