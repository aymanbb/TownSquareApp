import {z} from "zod";

export const registerSchema = z.object({
    username: z.string().min(3).max(32).regex(/^[a-zA-Z0-9_]+$/),
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(8).max(128),
});

export type RegisterInput = z.infer<typeof registerSchema>;