// src/index.test.ts
import { env } from 'cloudflare:test'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mockReset } from "vitest-mock-extended";

import app from './worker'

// Mock prisma
// import the mocked prisma object
import prisma from './libs/__mocks__/prisma'

describe('Molds', () => {
  beforeEach(() => {
    // disable auth for local testing
    vi.mock('./worker/middleware/checkAuth', () => ({
      checkAuth: vi.fn(async (c, next) => {
        await next();
      })
    }));
    
    // disable CORS for local testing
    env.CORS_ORIGIN = ["*"];

    // when worker calls createPrismaClient, return the mocked prisma object
    vi.mock('./worker/prismaClient', () => ({
      createPrismaClient: vi.fn(() => {
        return prisma;
      })
    }));

    // reset prisma mocks
    mockReset(prisma);
  });

  it('Should get all molds', async () => {

    const fakeMolds = [{
      number: "test mold",
      description: "test mold description",
      cycle_time: 10,
      status: "Active",
    }]

    // mock database of molds
    prisma.molds.findMany.mockResolvedValue(fakeMolds)

    // request molds
    const res = await app.request('/api/molds', {}, env)

    // expect molds
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual(fakeMolds)
  })

  it('Should create a new mold', async () => {

    const fakeMold = {
      number: "test mold",
      description: "test mold description",
      cycle_time: 10,
      status: "Active",
    }

    // mock database of molds
    prisma.molds.create.mockResolvedValue(fakeMold)

    // request molds
    const res = await app.request('/api/molds', {
      method: 'POST',
      body: JSON.stringify(fakeMold),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }, env)

    // expect molds
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual(fakeMold)
  })

  it('Should update an existing mold', async () => {

    const fakeMold = {
      number: "test mold",
      description: "test mold description",
      cycle_time: 10,
      status: "Active",
    }

    // mock database of molds
    prisma.molds.update.mockResolvedValue(fakeMold)

    // request molds
    const res = await app.request('/api/molds', {
      method: 'PUT',
      body: JSON.stringify({
        number: fakeMold.number,
        mold: fakeMold
      }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }, env)

    // expect molds
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual(fakeMold)
  })

  it('Should delete an existing mold', async () => {

    const fakeMold = {
      number: "test mold",
      description: "test mold description",
      cycle_time: 10,
      status: "Active",
    }

    const moldDeleted = { message: "Mold has been deleted" }

    // request molds
    const res = await app.request('/api/molds', {
      method: 'DELETE',
      body: JSON.stringify(fakeMold),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }, env)

    // expect molds
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual(moldDeleted)
  })
})
