import Express from 'express'
import RouterManager from '../src/routers/RouterManager'
import cors from 'cors'
import BodyParser from 'body-parser'
import config from '../src/config/config'
import datasourcer from '../src/config/datasourcer'

const app = Express()

app.config = config
app.datasource = datasourcer(app)
app.use(cors())
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: false }))

RouterManager(app)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`)
})