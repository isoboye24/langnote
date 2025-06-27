/*
  Warnings:

  - You are about to drop the column `language` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `Word` table. All the data in the column will be lost.
  - Added the required column `languageId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "language",
ADD COLUMN     "languageId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "language";

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
