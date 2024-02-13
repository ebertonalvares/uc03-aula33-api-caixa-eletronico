import { randomUUID } from 'node:crypto'
import database from '../database.index.js'

const db = database.getDB()

class PessoaRepository{
    async findPessoaByCPF(cpf){
        return await db.oneOrNone(
            `SELECT * FROM  banco.PESSOAS WHERE banco.PESSOAS.delected_at is null AND banco.PESSOAS.cpf = $1`,[cpf]        )
    }

    async findPessoaById(pessoa_id){
        return await db.oneOrNone(
            `SELECT * FROM  Pessoa WHERE pessoa_id = $1`,
            [pessoa_id])
    }

    async create(nome_completo, cpf, usuario, senha){
        return await db.none(`UPDATE banco.PESSOAS SET nome_completo = $1, cpf = $2, usuario = $3, senha = $4, privilegio = $5, updated_at = $6 WHERE pessoa_id = $7`, //statement SQL
        [
            nome_completo,
            cpf,
            usuario,
            senha,
            privilegio,
            new Date(),
            pessoa_id
        ]
        )
    }
}


export default new PessoaRepository()