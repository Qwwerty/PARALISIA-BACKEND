export default class UsuariosController {
    constructor(Usuario){
        this.usuarios = Usuario
    }

    getAll(){
        return this.usuarios
            .findAll({
                attributes: { exclude: ['senha'] }
            })
            .then(result => {
                return result
            })
            .catch(error => {
                console.log(error)
            })
    }

    create(data){
        return this.usuarios
            .create(data)
            .then(result => { return result })
            .catch(error => { return error })
    }

    autenticate(email_usuario, senha){
        return this.usuarios
        .findOne({
            where: { email: email_usuario}
        })
        .then(result => {
            if(result){
                let data = null
                if(this.usuarios.isSenha(result.dataValues.senha, senha)){
                    return data = {
                        data: result,
                        status: 'ok'
                    }
                }
                else{                
                    return data = {
                        data: null,
                        status: 'not'
                    }
                }
            }
        })
        .catch(error => { return error })
    }
}