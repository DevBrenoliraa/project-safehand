import { epiModel } from "./epiModel.js";

// Metodo para listar epi - GET
export const listarEpi = async (req, res, next) => {
    try {
        
        const epis = await epiModel.findAll({
            attributes: ['id', 'nome', 'validade', 'lote', 'quantidade', 'data_chegada'],
            order: [['id', 'ASC']]
        });
        
        res.status(200).json({
            sucesso: true,
            data: epis
        });

    } catch (error) {
        next(error);
    };
};

// Metodo para cadastrar epi - POST
export const cadastrarEpi = async (req, res, next) => {

    const { nome, validade, lote, quantidade, data_chegada } = req.body;

    try {
        
        if (!nome || !validade || !lote || !quantidade || !data_chegada) {
            throw new Error('Todos os campos são obrigatórios');
        };

        const novoEpi = await epiModel.create({
            nome,
            validade,
            lote,
            quantidade,
            data_chegada
        });
        
        res.status(201).json({
            message: 'Epi cadastrado com sucesso',
            data: novoEpi
        });

    } catch (error) {
        next(error);
    };
};

// Metodo para atualizar epi - PUT
export const atualizarEpi = async (req, res, next) => {

    const { id } = req.params;
    const { nome, validade, lote, quantidade, data_chegada } = req.body;

    try {
        
        if (!id) { // Verifica se o ID foi informado
            const err = new Error("O ID é obrigatório!");
            err.statusCode = 400;
            throw err;
        };
        
        const epi = await epiModel.findByPk(id, { // Busca o epi pelo ID
            attributes: ['nome', 'validade', 'lote', 'quantidade', 'data_chegada']
        });

        if (!epi) { // Verifica se o epi foi encontrado
            const err = new Error("Epi nao encontrado!");
            err.statusCode = 404;
            throw err;
        };

        if (nome !== undefined) {
            epi.nome = nome;
        };

        if (validade !== undefined) {
            epi.validade = validade;
        };

        if (lote !== undefined) {
            epi.lote = lote;
        };

        if (quantidade !== undefined) {
            epi.quantidade = quantidade;
        };

        if (data_chegada !== undefined) {
            epi.data_chegada = data_chegada;
        };

        await epi.save(); // Salva as alterações
        
        res.status(200).json({
            message: 'Epi atualizado com sucesso',
            data: epi
        });


    } catch (error) {
        next(error);
    };
};

// Metodo para deletar epi - DELETE
export const deletarEpi = async (req, res, next) => {

    const { id } = req.params;

    try {
        
        if (!id) { // Verifica se o ID foi informado
            const err = new Error("O ID é obrigatório!");
            err.statusCode = 400;
            throw err;
        };

        const epi = await epiModel.destroy({ where: { id }}); // Deleta o epi pelo ID

        if (epi === 0) {
            const err = new Error("Epi nao encontrado!");
            err.statusCode = 404;
            throw err;
        };

        res.status(204).send();
        
    } catch (error) {
        next(error);
    }
}