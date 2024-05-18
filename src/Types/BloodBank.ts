import { z } from 'zod'
export const BloodBankI=z.object({
    name:z.string(),
    email:z.string().email(),
    contactNumber: z.number()
    .refine(val => val.toString().length === 10, {
        message: "contact number should be exactly 10 digits"
    }),
    latitude:z.number(),
    longitude:z.number()
}) 