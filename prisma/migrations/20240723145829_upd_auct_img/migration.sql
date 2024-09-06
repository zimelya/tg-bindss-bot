/*
  Warnings:

  - The `imageURL` column on the `Auction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Auction" ADD COLUMN     "primaryImage" TEXT,
DROP COLUMN "imageURL",
ADD COLUMN     "imageURL" TEXT[];
