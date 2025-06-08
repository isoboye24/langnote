/*
  Warnings:

  - Added the required column `languageId` to the `PopularListCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PopularListCategory" ADD COLUMN     "languageId" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "PopularListCategory_languageId_idx" ON "PopularListCategory"("languageId");

-- AddForeignKey
ALTER TABLE "PopularListCategory" ADD CONSTRAINT "PopularListCategory_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
