import app from "../app";
import Bcrypt from 'bcrypt'

export default class UsuariosController {
  constructor(Usuario, Sequelize) {
    this.usuarios = Usuario;
    this.op = Sequelize;
  }

  getAll() {
    return this.usuarios
      .findAll({
        attributes: { exclude: ["senha"] },
      })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  create(data) {
    return this.usuarios
      .create(data)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      });
  }

  autenticate(email_usuario, senha) {
    return this.usuarios
      .findOne({
        where: { email: email_usuario },
      })
      .then((result) => {
        if (result) {
          let data = null;
          if (this.usuarios.isSenha(result.dataValues.senha, senha)) {
            return (data = {
              data: result,
              status: "ok",
            });
          } else {
            return (data = {
              data: null,
              status: "not",
            });
          }
        }else{
          let data = {
            data: null,
            status: "not"
          }
          return data
        }
      })
      .catch((error) => {
        return error;
      });
  }

  update(data, email){
    const salt = Bcrypt.genSaltSync()
    let password = Bcrypt.hashSync('' + data.senha, salt)
    let newData = { senha: password }
    return this.usuarios.update(newData, {
      where: { email: email }
    })
    .then((result) => {
      if(result == 1)
         return true
      else
        return false
    })
    .catch((error) => console.log(error))
  }

  carregarRanking() {
    return this.usuarios
      .findAll({
        attributes: { exclude: ["senha"] },
        order: this.op.literal("pontos DESC"),
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async atualizarPontos(email) {
    try {
      const result = await app.datasource.sequelize.transaction(async (t) => {
        const resultUsuario = await this.usuarios.findOne(
          {
            where: { email: email },
          },
          { transaction: t }
        )

        if(resultUsuario){
            let atualPontos = resultUsuario.dataValues.pontos
            await app.datasource.sequelize.query(
                `UPDATE Usuarios SET pontos = ${atualPontos + 1} WHERE id = ${resultUsuario.dataValues.id}`
            )   
        }
        return true;
      });
    } catch (error) {
        console.log(error);
        return false;
    }
  }
}
