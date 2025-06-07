/*
  Warnings:

  - Added the required column `popularCategoryId` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "popularCategoryId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "PopularListCategory" (
    "id" UUID NOT NULL,
    "popularCategory" TEXT NOT NULL,

    CONSTRAINT "PopularListCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Word_popularCategoryId_idx" ON "Word"("popularCategoryId");

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_popularCategoryId_fkey" FOREIGN KEY ("popularCategoryId") REFERENCES "PopularListCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
