-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('GALERY', 'SEQUENCE');

-- AlterTable
ALTER TABLE "Auction" ADD COLUMN     "imageType" "ImageType",
ADD COLUMN     "imageURL" TEXT;
