import { number, z } from 'zod'
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

export const searchBloodBankI=z.object({
    longitude:z.number(),
    latitude:z.number(),
    bloodGroup:z.string(),
    distance:z.number().default(20)
})