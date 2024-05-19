import { z } from 'zod'
export const userSignUp=z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(6,"password must be at least 6 characters long"),
    contactNumber: z.number()
    .refine(val => val.toString().length === 10, {
        message: "contact number should be exactly 10 digits"
    }),
    bloodGroup:z.enum(["A+","A-","B+","B-","AB+","AB-","O+","O-"],{
        errorMap: () => ({ message: 'Invalid blood group' })
    })
})
export const userLogin=z.object({
    email:z.string().email(),
    password:z.string()
})