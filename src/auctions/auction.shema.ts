import { z } from "zod";

export const CreateAuctionSchema = z.object({
    title: z.string().min(3),
    startPrice: z.number().positive().optional(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
    currentPrice: z.number().positive().optional(),

});

export type CreateAuctionDto = z.infer<typeof CreateAuctionSchema> & {
    title: string;
    startPrice?: number;
    startTime: Date;
    endTime: Date;
    currentPrice?: number;
}