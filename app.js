import express, { json } from 'express'
import picocolors from 'picocolors'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()

app.use(json())
app.use(corsMiddleware())

app.disable('x-powered-by')

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 3002

app.listen(PORT, () => {
  console.log(picocolors.blue('listening on port: http://localhost:' + PORT))
})
