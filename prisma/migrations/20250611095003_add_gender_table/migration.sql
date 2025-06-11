/*
  Warnings:

  - Added the required column `genderId` to the `PopularListWord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genderId` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PopularListWord" ADD COLUMN     "genderId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "genderId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Gender" (
    "id" UUID NOT NULL,
    "languageId" UUID NOT NULL,
    "genderName" TEXT NOT NULL,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Gender_languageId_idx" ON "Gender"("languageId");

-- AddForeignKey
ALTER TABLE "PopularListWord" ADD CONSTRAINT "PopularListWord_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gender" ADD CONSTRAINT "Gender_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
