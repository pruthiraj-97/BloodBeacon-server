import { z } from 'zod'
export const notificationI=z.object({
    message:z.string(),
    bloodGroup:z.enum(["A+","A-","B+","B-","AB+","AB-","O+","O-"]),
    contactNumber: z.number()
    .refine(val => val.toString().length === 10, {
        message: "contact number should be exactly 10 digits"
    })
})