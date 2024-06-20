import { Auction } from '@prisma/client';
import { z } from 'zod';

export const CreateBidSchema = z.object({
    auctionId: z.number().int().positive(),
    userId: z.number().int().positive(),
    amount: z.number().positive(),
});
export type CreateBidDto = {
    auctionId: number;
    userId: number;
    amount: number;
}

// export type CreateBidDto = z.infer<typeof CreateBidSchema> & {
//     auctionId: number;
//     userId: number;
//     amount: number;
// }

export const GetBidsSchema = z.object({
    auctionId: z.number().int().positive().optional(),
    userId: z.number().int().positive().optional(),
    count: z.number().int().positive().optional(),
});

export type GetBidsDto = z.infer<typeof GetBidsSchema>;

