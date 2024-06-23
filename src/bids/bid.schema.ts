import { Auction } from '@prisma/client';
import { z } from 'zod';

export const BidSchema = z.object({
    auctionId: z.number().int().positive(),
    userId: z.number().int().positive(),
    amount: z.number().positive(),
});

export const CreateBidSchema = BidSchema.required();


export type CreateBidDto =  z.infer<typeof BidSchema>; 

export const GetBidsSchema = z.object({
    auctionId: z.number().int().positive().optional(),
    userId: z.number().int().positive().optional(),
    count: z.number().int().positive().optional(),
});

export type GetBidsDto = z.infer<typeof GetBidsSchema>;

