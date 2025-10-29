import { funcionarioModel } from "./funcionarioModel.js";

// Metodo para listar funcionarios - GET
export const listarFuncionarios = async (req, res, next) => {

    try {
        
        const funcionarios = await funcionarioModel.findAll({
            attributes: ['id', 'nome', 'data_nascimento', 'email', 'funcao'],
            order: [['id', 'ASC']]
        });

        res.status(200).json({
            sucesso: true,
            data: funcionarios
        });

    } catch (error) {
        next(error);
    };
};

// Metodo para cadastro de funcionarios - POST
export const cadastrarFuncionario = async (req, res, next) => {

    const { nome, data_nascimento, email, funcao } = req.body;

    try {
        
        if (!nome || !data_nascimento || !email || !funcao) {
            throw new Error('Todos os campos são obrigatórios');
        };

        const novoFuncionario = await funcionarioModel.create({
            nome,
            data_nascimento,
            email,
            funcao
        });

        res.status(201).json({
            message: 'Funcionario cadastrado com sucesso',
            data: novoFuncionario
        });

    } catch (error) {
        next(error);;
    };
};

// Metodo para deletar funcionarios - DELETE
export const atualizarFuncionario = async (req, res, next) => {

    const { id  } = req.params;
    const { nome, data_nascimento, email, funcao } = req.body;

    try {
        
        if (!id) {
            const err = new Error("O ID é obrigatório!");
            err.statusCode = 400;
            throw err;
        };

        const funcionario = await funcionarioModel.findByPk(id, {
            attributes: ['nome', 'data_nascimento', 'email', 'funcao']
        });

        if (!funcionario) {
            const err = new Error("Funcionario nao encontrado!");
            err.statusCode = 404;
            throw err;
        };

        if (nome !== undefined) {
            funcionario.nome = nome;
        };

        if (data_nascimento !== undefined) {
            funcionario.data_nascimento = data_nascimento;
        };

        if (email !== undefined) {
            funcionario.email = email;
        };

        if (funcao !== undefined) {
            funcionario.funcao = funcao;
        };

        await funcionario.save();

        res.status(200).json({
            message: 'Funcionario atualizado com sucesso',
            data: funcionario
        });

    } catch (error) {
        next(error);
    };
};

// Metodo para deletar funcionarios - DELETE
export const deletarFuncionario = async (req, res, next) => {

    const { id } = req.params;

    try {
        
        if (!id) {
            const err = new Error("O ID é obrigatório!");
            err.statusCode = 400;
            throw err;
        };

        const funcionario = await funcionarioModel.destroy({ where: { id }});

        if (funcionario === 0) {
            const err = new Error("Funcionario nao encontrado!");
            err.statusCode = 404;
            throw err;
        };

        res.status(204).send();
        
    } catch (error) {
        next(error);
    };
};