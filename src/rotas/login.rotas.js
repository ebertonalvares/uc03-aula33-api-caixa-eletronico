import { Router } from 'express'
import jwtUtils from '../utils/jwt.utils.js'

const router = Router()

const usuario = [{
    usuario_id: '',
    email: 'eberton@hotmail.com',
    senha: '123456789',
}]

router.post("/login", (request, response) =>{
    const {email, senha} = request.body;
    
    const usuario = usuario.find((usuario) => usuario.email === email)

    if(!usuario){
        response.send({error: "Usuario invalido"})
    }
    if(usuario.senha === senha){
        // gera o JWT - json web token 
        const payload ={
            usuario_id: usuario.usuario_id,
            email: usuario.email
        }
        const token = jwtUtils.gerarToken(payload)

        response.send({
            message: "Usuario autenticado",
            jwt:token
        })
    }else {
        response.send({error: "Usuario invalido"})
    }
})

export default {router}