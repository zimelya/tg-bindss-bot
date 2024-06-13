import {z} from 'zod';



export const BidsScheme = z.object({
    
    value: z.number(),
});

export type CreateEventDto = z.infer<typeof BidsScheme>  & {
    title: number;
};