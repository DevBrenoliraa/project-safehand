export function erroHandller (err, req, res, next) {
    
    console.log(err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erro interno do servidor';

    res.status(statusCode).json({
        sucesso: false,
        statusCode: statusCode,
        message: message
    });

};