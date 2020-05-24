import UsuarioController from '../Controllers/UsuariosController'

export default (app) => {

    const usuarioController = new UsuarioController(app.datasource.models.Usuarios)

    app.route('/usuarios')
        .get((req, res) => {
            usuarioController.getAll()
                .then(response => {
                    res.json(response)
                })
                .catch(error => console.log(error))
        })
        .post((req, res) => {
            usuarioController.create(req.body)
                .then(response => { res.json(response) })
                .catch(error => response(error))
        })

    app.post('/autenticate', (req, res) => {
        usuarioController.autenticate(req.body.email, req.body.senha)
        .then(response => {
            return res.json(response)
        })
        .catch(error => { return error })
    })
}