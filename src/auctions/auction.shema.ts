import { AuctionState } from "@prisma/client";
import { z } from "zod";

export const CreateAuctionSchema = z.object({
    title: z.string().min(3),
    state: z.nativeEnum(AuctionState).optional(),
    startPrice: z.number().positive().optional(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
    currentPrice: z.number().positive().optional(),
    userId: z.number(),

}).required();

export type CreateAuctionDto = z.infer<typeof CreateAuctionSchema> 