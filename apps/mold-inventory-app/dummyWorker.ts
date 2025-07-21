// src/index.ts
import { Hono } from 'hono'

type Bindings = {
  MY_VAR: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/hello', (c) => {
  //, var: c.env.MY_VAR
  return c.json({ hello: 'world' })
})

export default app

