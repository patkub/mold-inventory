// src/index.test.ts
import { env } from 'cloudflare:test'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mockReset, mockDeep, DeepMockProxy } from "vitest-mock-extended";

import app from './worker'

// Mock prisma
// import the mocked prisma object
import prisma from './libs/__mocks__/prisma'

describe('Molds', () => {
  beforeEach(() => {
    // reset prisma mocks
    mockReset(prisma);

    // disable CORS for local testing
    env.IS_LOCAL_MODE = true;

    // when worker calls createPrismaClient, return the mocked prisma object
    vi.mock('./worker/prismaClient', () => ({
      createPrismaClient: vi.fn(() => {
        return prisma;
      })
    }));

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
    expect(await res.json()).toEqual({"molds": fakeMolds})
  })
})