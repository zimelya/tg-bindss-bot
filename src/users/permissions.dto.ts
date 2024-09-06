import { z } from 'zod';

const PermissionDtoSchema = z.object({
    id: z.number().int().nonnegative(),
    name: z.string().min(1),
});


export type PermissionDto = z.infer<typeof PermissionDtoSchema>

