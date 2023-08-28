import cors from 'cors'

const ACCEPTEP_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:3000',
  'http://localhost:3002'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTEP_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (ACCEPTEP_ORIGINS.includes(origin)) return callback(null, true)
    if (!origin) return callback(null, true)

    return callback(new Error('not allowed by CORS'))
  }
})
