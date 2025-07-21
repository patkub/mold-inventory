// src/index.test.ts
import { env } from 'cloudflare:test'
import { describe, it, expect } from 'vitest'
import app from './dummyWorker'

describe('Example', () => {
  it('Should return 200 response', async () => {
    const res = await app.request('/hello', {}, env)

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      hello: 'world'
    })
  })
})