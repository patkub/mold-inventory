import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import { zValidator } from '@hono/zod-validator'
// Mold objects for Zod validator
import { zMold, zUpdateMold, zDeleteMold } from './zMolds.js';

import { createPrismaClient } from '../prismaClient.js'

// Define /molds route
const moldsRoute = new Hono().basePath('/molds')


// Get all molds
moldsRoute.get("/", async (c: any) => {
  try {
    // Prisma adapter
    const prisma = createPrismaClient(c.env.MOLD_DB);

    // get molds from database
    const molds = await prisma.molds.findMany();

    // return molds as json
    return c.json(molds)

  } catch (error) {
    throw new HTTPException(500, { message: "Failed to fetch molds" })
  }
})


// Create new mold
moldsRoute.post("/", zValidator(
  'json',
  zMold
), async (c: any) => {
  try {
    // Prisma adapter
    const prisma = createPrismaClient(c.env.MOLD_DB);

    // request data
    const data = await c.req.json();

    // create new mold in database
    const mold = await prisma.molds.create({
      data: data
    })

    // return the new mold as json
    return c.json(mold)

  } catch (error) {
    throw new HTTPException(500, { message: "Failed to create new mold" })
  }
})


// Update mold
moldsRoute.put("/", zValidator(
  'json',
  zUpdateMold
), async (c: any) => {
  try {
    // Prisma adapter
    const prisma = createPrismaClient(c.env.MOLD_DB);

    // request data
    const data = await c.req.json();

    // update mold in database
    const updatedMold = await prisma.molds.update({
      where: {
        number: data.number,
      },
      data: data.mold,
    })

    // return the updated mold as json
    return c.json(updatedMold)

  } catch (error) {
    throw new HTTPException(500, { message: "Failed to update mold" })
  }
})


// Delete mold
moldsRoute.delete("/", zValidator(
  'json',
  zDeleteMold
), async (c: any) => {
  try {
    // Prisma adapter
    const prisma = createPrismaClient(c.env.MOLD_DB);

    // request data
    const data = await c.req.json();

    // delete mold from database
    const deleteMold = await prisma.molds.delete({
      where: {
        number: data.number,
      },
    })

    // return the new mold as json
    return c.json({ message: "Mold has been deleted" })

  } catch (error) {
    throw new HTTPException(500, { message: "Failed to create new mold" })
  }
})


export {
  moldsRoute
}
