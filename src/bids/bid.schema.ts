import { z } from 'zod';

export const CreateBidSchema = z.object({
    auctionId: z.number().int().positive(),
    userId: z.number().int().positive(),
    amount: z.number().positive(),
});

export type CreateBidDto = z.infer<typeof CreateBidSchema> & {
    auctionId: number;
    userId: number;
    amount: number;
}