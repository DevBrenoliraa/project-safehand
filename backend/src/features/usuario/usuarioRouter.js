import { Router } from "express";
import { listarUsuarios, cadastrarUsuario, atualizarUsuario, deletarUsuario } from "./usuarioController.js";
import { loginUsuario } from "./usuarioController.js";

const routes = Router();

routes.get("/", listarUsuarios); // http://localhost:3000/api/usuario
routes.post("/cadastro", cadastrarUsuario); // http://localhost:3000/api/usuario/cadastro
routes.post("/login", loginUsuario); // http://localhost:3000/api/usuario/login
routes.put("/:id", atualizarUsuario); // http://localhost:3000/api/usuario/:id
routes.delete("/:id", deletarUsuario); // http://localhost:3000/api/usuario/:id

export default routes;

