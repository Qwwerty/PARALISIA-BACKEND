import app from "../app";
import Bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export default class UtilController {
  constructor(Usuarios) {
    this.usuarios = Usuarios;
  }

  async pedirSenha(email) {
    try {
      return await app.datasource.sequelize.transaction(async (t) => {
        const salt = Bcrypt.genSaltSync();
        let newPassword = Math.floor(Math.random() * 10000);

        if (newPassword < 100) newPassword = newPassword * 100;

        let password = Bcrypt.hashSync("" + newPassword, salt);

        const resultUsuario = await this.usuarios.findOne(
          {
            where: { email: email },
          },
          { transaction: t }
        );

        if (resultUsuario) {
          await app.datasource.sequelize.query(
            "UPDATE Usuarios SET senha = ? WHERE id = " +
              resultUsuario.dataValues.id,
            { replacements: [`${password}`] },
            { transaction: t }
          );

          let remetente = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "paralisiaweb@gmail.com",
              pass: "Paralisiaweb123",
            },
          });

          remetente
            .sendMail({
              from: "Web Paralisia <paralisiaweb@gmail.com>",
              to: `${email}`,
              subject: "Senha temporária",
              text: `Sua senha foi alterada para ${newPassword}`,
            })
            .then((message) => {
              return true
            })
            .catch((error) => console.log(error));
            return true
        }
        else{
          return false
        }
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
