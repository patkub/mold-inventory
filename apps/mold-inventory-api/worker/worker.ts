// worker.ts
import { D1Database } from '@cloudflare/workers-types'

// Hono
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
// CORS
import { setupCORS } from './middleware/cors'
// JWT Auth
import { setupJWT } from './middleware/jwt'
import { createScopesMiddleware } from './middleware/scopes'
import { moldsRoute } from './routes/moldsRoute'

type Bindings = {
  CORS_ORIGIN: string[]
  MOLD_DB: D1Database
}

// Hono
const app = new Hono<{ Bindings: Bindings }>()

// Setup CORS
app.use('*', setupCORS)

// Return errors as JSON
app.onError((err: Error, c) => {
  if (err instanceof HTTPException) {
    err.message = err.message || 'An error occurred';
    return c.json({ error: err.message }, err.status)
  }
})

// Middleware must be registered before any /api endpoints
// Require JWT authentication for all /api endpoints
app.use('/api/*', setupJWT)

// Validate JWT scope claim for CRUD routes
app.get('/api/molds/*', createScopesMiddleware(['read:molds']))
app.post('/api/molds/*', createScopesMiddleware(['create:molds']))
app.put('/api/molds/*', createScopesMiddleware(['update:molds']))
app.delete('/api/molds/*', createScopesMiddleware(['delete:molds']))

// Now register /api endpoints

// Handle /api/molds endpoint
app.route('/api', moldsRoute)

export default app
