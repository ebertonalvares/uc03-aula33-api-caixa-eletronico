import jwtUtils from "../utils/jwt.utils.js"


function authorizeMiddleware(request, response, next) {
    //busca dos header o paramentro Authorization
    const { authorization } = request.headers

    //validar se o token foi informado, caso não 
    // retornr erro 401 - Unauthenticated 
    if (!authorization) {
        response.status(401).send({ message: "Usuario não autenticado" })
    }


    const [, token] = authorization.split("")

    const tokenValidado = jwtUtils.validadeToken(token)
    // Validar se o token está valido, caso não esteja,
    // retornar erro 403 - Unauthorized
    if (!tokenValidado || tokenValidado.error) {
        response.status(403).json({ message: 'Token invalido' })
    } else {
        request.session = tokenValidado.payload
        // seguir com a requisição 
        next()
    }
}

export { authorizeMiddleware }


