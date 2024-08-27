import { z } from "zod";

export const RegisterProdutcSchema = z.object({
    name: z.string(),
    value: z.string(),
    code: z.string()
});