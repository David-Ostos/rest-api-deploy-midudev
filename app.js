const express = require('express')
const picocolors = require('picocolors')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const cors = require('cors')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()

app.use(express.json())
app.use(cors({
  origin: (origin, cb) => {
    const ACCEPTEP_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:3002'
    ]

    if (ACCEPTEP_ORIGINS.includes(origin)) return cb(null, true)

    if (!origin) cb(null, true)

    return cb(null, true)
  }
}))

app.disable('x-powered-by')

// method GET

app.get('/movies', (req, res) => {
  /*  const origin = req.header('origin')
  if (ACCEPTEP_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  } */
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => { // path-to-regexp
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  else return res.status(404).json({ message: 'Movie not exist' })
})

/**
 * prueba de GET con regex
 */
app.get(/.*dev/, (req, res) => { // prueba de un regexp
  res.json({ message: 'soy regexp' })
})

// method POST
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  // Esto no seria REST, porque estamos guardando
  // el estado de la app en memoria
  movies.push(newMovie)

  res.status(201).json(newMovie)
})

// PATCH

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie
  return res.json(updateMovie)
})

// DELETE

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted successfully' })
})

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
  console.log(picocolors.blue('listening on port: http://localhost:' + PORT))
})
