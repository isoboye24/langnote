/*
  Warnings:

  - You are about to drop the column `bookId` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Word` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_userId_fkey";

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "bookId",
DROP COLUMN "userId";
