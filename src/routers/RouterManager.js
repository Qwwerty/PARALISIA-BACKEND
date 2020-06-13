import RouterUsuario from '../routers/UsuarioRoute'
import UtilRouter from '../routers/UtilRouter'

export default (app) => {
    RouterUsuario(app)
    UtilRouter(app)
}