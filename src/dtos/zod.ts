import { z } from 'zod'
export const signUp=z.object({
    username:z.string(),
    email:z.string(),
    password:z.string()
    .min(6,"password must be at least 6 characters long"),
    contactNumber:z.number()
    .min(10,"contact number should be 10 digits")
    .max(10,"contact number should be 10 digits"),
})

export const login=z.object({
    email:z.string(),
    password:z.string()
    .min(6,"password must be at least 6 characters long")
})
