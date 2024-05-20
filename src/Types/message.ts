import {z} from 'zod'
export const messageI=z.object({
    message:z.string(),
    sender:z.string(),
    receiver:z.string()
})