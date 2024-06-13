import { EventStatus } from 'src/common-types';
import {z} from 'zod';



export const CreateEventSchema = z.object({
    title: z.string(),
    status: z.nativeEnum(EventStatus).optional(),
    date: z.string().datetime().optional(),
    data: z.object({}).optional()
});

export type CreateEventDto = z.infer<typeof CreateEventSchema>  & {
    title: string;
    status?: EventStatus;
    date?: Date;
    data?: {};
};

export type CreateEventErrors = z.inferFormattedError<typeof CreateEventSchema>