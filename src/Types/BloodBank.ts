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
    bloodGroup:z.enum(["A+","A-","B+","B-","AB+","AB-","O+","O-"]),
    distance:z.number().default(20)
})