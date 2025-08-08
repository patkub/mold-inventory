// libs/__mocks__/prisma.ts

import { PrismaClient } from '../../.generated/prisma/index.js'
import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'

// Mock prisma client
const prisma = mockDeep<PrismaClient>()

// Reset before each test
beforeEach(() => {
  mockReset(prisma)
})

// Export the mocked prisma client
export default prisma
