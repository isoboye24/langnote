/*
  Warnings:

  - Made the column `languageId` on table `PopularListWord` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PopularListWord" DROP CONSTRAINT "PopularListWord_languageId_fkey";

-- AlterTable
ALTER TABLE "PopularListWord" ALTER COLUMN "languageId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PopularListWord" ADD CONSTRAINT "PopularListWord_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
