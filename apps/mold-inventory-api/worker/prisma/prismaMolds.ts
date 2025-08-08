import { Context } from 'hono'

import { createPrismaMoldClient } from './prismaClient'
import { Mold } from '../types'

async function getMolds(c: Context) {
  // Prisma adapter
  const prisma = createPrismaMoldClient(c.env.MOLD_DB)

  // get molds from database
  const molds = await prisma.molds.findMany()

  return molds
}

async function addMold(c: Context): Promise<Mold> {
  // Prisma adapter
  const prisma = createPrismaMoldClient(c.env.MOLD_DB)

  // request data
  const data = await c.req.json()

  // create new mold in database
  const mold = await prisma.molds.create({
    data: data,
  })

  return mold
}

async function updateMold(c: Context): Promise<Mold> {
  // Prisma adapter
  const prisma = createPrismaMoldClient(c.env.MOLD_DB)

  // request data
  const data = await c.req.json()

  // update mold in database
  const updatedMold = await prisma.molds.update({
    where: {
      number: data.number,
    },
    data: data.mold,
  })

  return updatedMold
}

async function deleteMold(c: Context): Promise<void> {
  // Prisma adapter
  const prisma = createPrismaMoldClient(c.env.MOLD_DB)

  // request data
  const data = await c.req.json()

  // delete mold from database
  await prisma.molds.delete({
    where: {
      number: data.number,
    },
  })
}

export { getMolds, addMold, updateMold, deleteMold }
