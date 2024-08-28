import { z } from "zod";

export const AuthenticationCodeSchema = z.object({
  code: z.string().min(5),
});
