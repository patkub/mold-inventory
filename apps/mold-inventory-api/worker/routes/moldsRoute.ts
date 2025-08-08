import { Hono, Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { zValidator } from '@hono/zod-validator'
// Mold objects for Zod validator
import { zMold, zUpdateMold, zDeleteMold } from './zMolds.js'

import {
  getMolds,
  addMold,
  updateMold,
  deleteMold,
} from '../prisma/prismaMolds.js'

// Define /molds route
const moldsRoute = new Hono().basePath('/molds')

// Get all molds
moldsRoute.get('/', async (c: Context) => {
  try {
    // get all molds
    const molds = await getMolds(c)

    // return molds as json
    return c.json(molds)
  } catch {
    throw new HTTPException(500, { message: 'Failed to fetch molds' })
  }
})

// Create new mold
moldsRoute.post('/', zValidator('json', zMold), async (c: Context) => {
  try {
    // add the new mold from the request
    const mold = await addMold(c)

    // return the new mold as json
    return c.json(mold)
  } catch {
    throw new HTTPException(500, { message: 'Failed to create new mold' })
  }
})

// Update mold
moldsRoute.put('/', zValidator('json', zUpdateMold), async (c: Context) => {
  try {
    // update requested mold in the database
    const updatedMold = await updateMold(c)

    // return the updated mold as json
    return c.json(updatedMold)
  } catch {
    throw new HTTPException(500, { message: 'Failed to update mold' })
  }
})

// Delete mold
moldsRoute.delete('/', zValidator('json', zDeleteMold), async (c: Context) => {
  try {
    // delete requested mold from the database
    await deleteMold(c)

    // return mold deleted message
    return c.json({ message: 'Mold has been deleted' })
  } catch {
    throw new HTTPException(500, { message: 'Failed to delete mold' })
  }
})

export { moldsRoute }
