import Bcrypt from "bcrypt";

export default (sequelize, Datatype) => {
    const Usuarios = sequelize.define('Usuarios', {
        id: {
            type: Datatype.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Datatype.STRING,
            allowNull: false,
            set(val) {
                this.setDataValue('email', val.toUpperCase())
            },
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        senha: {
            type: Datatype.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    },
    {
        hooks: {
          beforeCreate(Usuarios) {
            const salt = Bcrypt.genSaltSync()
    
            Usuarios.set('senha', Bcrypt.hashSync(Usuarios.senha, salt))
          }
        }
    })

    Usuarios.isSenha = (encodedPassaword, senha) => Bcrypt.compareSync(senha, encodedPassaword);

    return Usuarios
}