import * as z from "zod";

// Mold objects for Zod validator
const zMold = z.object({
  number: z.string(),
  description: z.string(),
  cycle_time: z.number(),
  status: z.string(),
});

const zUpdateMold = z.object({
  number: z.string(),
  mold: z.object({
    number: z.string(),
    description: z.string(),
    cycle_time: z.number(),
    status: z.string()
  })
});

const zDeleteMold = z.object({
  number: z.string()
})

export {
  zMold,
  zUpdateMold,
  zDeleteMold
}
