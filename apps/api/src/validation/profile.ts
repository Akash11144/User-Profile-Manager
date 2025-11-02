import { z } from 'zod';
export const UpdateProfileInput = z.object({
  name: z.string().trim().min(1).max(60),
});
export type UpdateProfileInput = z.infer<typeof UpdateProfileInput>;
