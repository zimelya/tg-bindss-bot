import { Auction } from '@prisma/client';
import { number, z } from 'zod';

export const BidSchema = z.object({
    auctionId: z.number().int().positive().min(1),
    userId: z.number().int().positive().min(1),
    amount: z.number().positive(),
    count: z.number().positive().optional(),
});

export const CreateBidSchema = BidSchema.required();


export type CreateBidDto =  z.infer<typeof BidSchema> & {
    auctionId: number;
    userId: number;
    amount: number;
}; 

export type GetBidsDto = z.infer<typeof BidSchema> & {
    auctionId?: number;
    userId?: number;
    count?: number;

}

export const GetBidsSchema = z.object({
    auctionId: z.number().int().positive().optional(),
    userId: z.number().int().positive().optional(),
    count: z.number().int().positive().optional(),
});

// export type GetBidsDto = z.infer<typeof GetBidsSchema>;

