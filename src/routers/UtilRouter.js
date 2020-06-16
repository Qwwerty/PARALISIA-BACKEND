import UtilController from '../Controllers/UtilController'

export default (app) => {

    const utilController = new UtilController(app.datasource.models.Usuarios)

    app.post('/pedirSenha', (req, res) => {
        let status = utilController.pedirSenha(req.body.email).then(result => {

            if(result == true)
                res.json({status: true})
            else
                res.json({status: false})
        })
        .catch(error => console.log(error))
    })

}