import UsuarioController from '../Controllers/UsuariosController'

export default (app) => {

    const usuarioController = new UsuarioController(app.datasource.models.Usuarios, app.datasource.Sequelize)

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


    app.put('/usuarios/:email',(req, res) => {
        usuarioController.update(req.body, req.params.email).then((result) => {
            res.json({ status: result })
        })
        .catch(error => console.log(error))
    })

    app.post('/autenticate', (req, res) => {
        usuarioController.autenticate(req.body.email, req.body.senha)
        .then(response => {
            return res.json(response)
        })
        .catch(error => { return error })
    })

    app.get('/carregarRanking', (req, res) => {
        usuarioController.carregarRanking()
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            console.log(error)
        })
    })

    app.get('/atualizaPontos', (req, res) => {
        usuarioController.atualizarPontos(req.query.email).then((result) => {
            if(result === true)
                res.json({status: true})
            else
                res.json({status: false}) 
        })
        .catch(error => {
            console.log(error)
        })
    })
}