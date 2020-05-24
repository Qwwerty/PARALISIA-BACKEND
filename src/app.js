const Express =  require('express')
const RouterManager = require('../src/routers/RouterManager')
const cors = require('cors')
const BodyParser = require('body-parser')
const config = require('../src/config/config')
const datasourcer = require('../src/config/datasourcer')

const app = Express()

app.config = config
app.datasource = datasourcer(app)
app.use(cors())
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: false }))

RouterManager(app)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`)
})