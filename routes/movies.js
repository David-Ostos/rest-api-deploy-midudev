import { Router } from 'express'
import { MovieController } from '../controller/movies.js'

/*
  * import { readJSON } from '../utils.js'
  * importancion del archivo json con ESModules
  *
  * import movies from './movies.json' with { type: 'json'} // esta solucion todavia no esta disponible
  *
  * con fs
  * import fs from 'node:fs'
  * const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf8'))
  *
  * como leer un json en ESModules recomendado por ahora
  * const movies = readJSON('./movies.json')
*/

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)
moviesRouter.get('/:id', MovieController.getById)
moviesRouter.post('/', MovieController.create)
moviesRouter.patch('/:id', MovieController.update)
moviesRouter.delete('/:id', MovieController.delete)
