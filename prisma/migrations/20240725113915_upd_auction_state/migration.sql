-- CreateEnum
CREATE TYPE "AuctionState" AS ENUM ('CREATED', 'PENDING', 'ACTIVE', 'FINISHED', 'ARCHIVE');

-- AlterTable
ALTER TABLE "Auction" ADD COLUMN     "state" "AuctionState";
