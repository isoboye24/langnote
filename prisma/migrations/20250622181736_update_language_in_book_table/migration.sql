/*
  Warnings:

  - You are about to drop the column `languageId` on the `Book` table. All the data in the column will be lost.
  - Added the required column `language` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_languageId_fkey";

-- DropIndex
DROP INDEX "Book_languageId_idx";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "languageId",
ADD COLUMN     "language" UUID NOT NULL;
