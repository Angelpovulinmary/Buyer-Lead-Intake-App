/*
  Warnings:

  - You are about to alter the column `fullName` on the `Buyer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(80)`.
  - You are about to alter the column `phone` on the `Buyer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - The `bhk` column on the `Buyer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Buyer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email]` on the table `Buyer` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `city` on the `Buyer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `propertyType` on the `Buyer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `purpose` on the `Buyer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `timeline` on the `Buyer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `source` on the `Buyer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."City" AS ENUM ('Chandigarh', 'Mohali', 'Zirakpur', 'Panchkula', 'Other');

-- CreateEnum
CREATE TYPE "public"."PropertyType" AS ENUM ('Apartment', 'Villa', 'Plot', 'Office', 'Retail');

-- CreateEnum
CREATE TYPE "public"."BHK" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'STUDIO');

-- CreateEnum
CREATE TYPE "public"."Purpose" AS ENUM ('Buy', 'Rent');

-- CreateEnum
CREATE TYPE "public"."Timeline" AS ENUM ('ZERO_TO_THREE_M', 'THREE_TO_SIX_M', 'MORE_THAN_SIX_M', 'EXPLORING');

-- CreateEnum
CREATE TYPE "public"."Source" AS ENUM ('Website', 'Referral', 'Walkin', 'Call', 'Other');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('New', 'Qualified', 'Contacted', 'Visited', 'Negotiation', 'Converted', 'Dropped');

-- AlterTable
ALTER TABLE "public"."Buyer" ALTER COLUMN "fullName" SET DATA TYPE VARCHAR(80),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(15),
DROP COLUMN "city",
ADD COLUMN     "city" "public"."City" NOT NULL,
DROP COLUMN "propertyType",
ADD COLUMN     "propertyType" "public"."PropertyType" NOT NULL,
DROP COLUMN "bhk",
ADD COLUMN     "bhk" "public"."BHK",
DROP COLUMN "purpose",
ADD COLUMN     "purpose" "public"."Purpose" NOT NULL,
DROP COLUMN "timeline",
ADD COLUMN     "timeline" "public"."Timeline" NOT NULL,
DROP COLUMN "source",
ADD COLUMN     "source" "public"."Source" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."Status" NOT NULL DEFAULT 'New';

-- CreateIndex
CREATE UNIQUE INDEX "Buyer_email_key" ON "public"."Buyer"("email");

-- CreateIndex
CREATE INDEX "Buyer_ownerId_idx" ON "public"."Buyer"("ownerId");

-- CreateIndex
CREATE INDEX "BuyerHistory_buyerId_idx" ON "public"."BuyerHistory"("buyerId");

-- AddForeignKey
ALTER TABLE "public"."BuyerHistory" ADD CONSTRAINT "BuyerHistory_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "public"."Buyer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
