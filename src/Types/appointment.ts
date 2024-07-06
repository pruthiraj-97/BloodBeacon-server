import { z } from 'zod'
export interface appointmentI {
    name:string
    age:number
    bloodGroup:string
    contactNumber:number
}

export const appointment=z.object({
    name:z.string(),
    age:z.number(),
    bloodGroup:z.string(),
    contactNumber:z.number()
                    .min(10,"contact number should be exactly 10 digits")
                    .max(10,"contact number should be exactly 10 digits")
})