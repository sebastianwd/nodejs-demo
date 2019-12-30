//  import 'dotenv/config'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import bodyparser from 'body-parser'
import cors from 'cors'
import routes from 'api'

const app = express()

app.use(cors())

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.use('/api/', routes())

export default app
