// libs/__mocks__/prisma.ts
// 1
import { PrismaClient } from '../../.generated/prisma/index.js'
import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'

// 2
beforeEach(() => {
  mockReset(prisma)
})

// 3
const prisma = mockDeep<PrismaClient>()
export default prisma
