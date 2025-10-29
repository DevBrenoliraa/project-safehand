import { usuarioModel } from "./usuarioModel.js";

// Metodo para listar usuarios - GET
export const listarUsuarios = async (req, res, next) => {

    try {
        
        const usuarios = await usuarioModel.findAll({
            attributes: ['id', 'nome_completo', 'data_nascimento', 'email', 'usuario', 'senha'],
            order: [['id', 'ASC']]
        });

        res.status(200).json({
            sucesso: true,
            data: usuarios
        });

    } catch (error) {
        next(error);
    };
};

// Metodo para cadastrar usuarios - POST
export const cadastrarUsuario = async (req, res, next) => {

    const { nome_completo, data_nascimento, email, usuario, senha } = req.body;

    try {
        
        if (!nome_completo || !data_nascimento || !email || !usuario || !senha) {
            throw new Error('Todos os campos são obrigatórios');
        };

        const novoUsuario = await usuarioModel.create({
            nome_completo,
            data_nascimento,
            email,
            usuario,
            senha
        });

        res.status(201).json({
            message: 'Usuario cadastrado com sucesso',
            data: novoUsuario
        });

    } catch (error) {
        next(error);
    };
};

// Login - POST
export const loginUsuario = async (req, res, next) => {

    const { email, senha } = req.body;

    try {
        
        if (!email || !senha) {
            throw new Error('Todos os campos são obrigatórios');
        };

        const usuarioEncontrado = await usuarioModel.findOne({ where: { usuario }});

        if (!usuarioEncontrado || usuarioEncontrado.senha !== senha) {
            return res.status(401).json({ 
                message: 'Credenciais inválidas',
                usuario: {
                    id: usuarioEncontrado.id,
                    nome_completo: usuarioEncontrado.nome_completo
                }
            });
        };

        res.status(200).json({
            message: 'Login realizado com sucesso',
            data: usuarioEncontrado
        });

    } catch (error) {
        next(error);
    };
};

// Metodo para atualizar usuarios - PUT
export const atualizarUsuario = async (req, res, next) => {

    const { id } = req.params;
    const { nome_completo, data_nascimento, email, usuario, senha } = req.body;

    try {
        
        if (!id) {
            const err = new Error("O ID é obrigatório!");
            err.statusCode = 400;
            throw err;
        };

        const usuario = await usuarioModel.findByPk(id, {
            attributes: ['nome_completo', 'data_nascimento', 'email', 'usuario', 'senha']
        });

        if (!usuario) {
            const err = new Error("Usuario nao encontrado!");
            err.statusCode = 404;
            throw err;
        };

        if (nome_completo !== undefined) {
            usuario.nome_completo = nome_completo;
        };

        if (data_nascimento !== undefined) {
            usuario.data_nascimento = data_nascimento;
        };

        if (email !== undefined) {
            usuario.email = email;
        };

        if (usuario !== undefined) {
            usuario.usuario = usuario;
        };

        if (senha !== undefined) {
            usuario.senha = senha;
        };

        await usuario.save();

        res.status(200).json({
            message: 'Usuario atualizado com sucesso',
            data: usuario
        });

    } catch (error) {
        next(error);
    };
};

// Metodo para deletar usuarios - DELETE
export const deletarUsuario = async (req, res, next) => {

    const { id } = req.params;

    try {

        if (!id) {
            const err = new Error("O ID é obrigatório!");
            err.statusCode = 400;
            throw err;
        };

        const usuario = await usuarioModel.destroy({ where: { id }});

        if (usuario === 0) {
            const err = new Error("Usuario nao encontrado!");
            err.statusCode = 404;
            throw err;
        };

        res.status(204).send();
        
    } catch (error) {
        next(error);
    };
};