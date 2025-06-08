/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `languageId` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `popularCategoryId` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Word` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `languageId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_languageId_fkey";

-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_popularCategoryId_fkey";

-- DropIndex
DROP INDEX "user_email_idx";

-- DropIndex
DROP INDEX "Word_languageId_idx";

-- DropIndex
DROP INDEX "Word_popularCategoryId_idx";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
ADD COLUMN     "languageId" UUID NOT NULL,
ALTER COLUMN "userName" DROP DEFAULT,
ALTER COLUMN "email" SET DEFAULT 'NO_Email';

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "languageId",
DROP COLUMN "popularCategoryId",
DROP COLUMN "status";

-- DropEnum
DROP TYPE "WordStatus";

-- CreateTable
CREATE TABLE "PopularListWord" (
    "id" UUID NOT NULL,
    "word" TEXT NOT NULL,
    "known" BOOLEAN NOT NULL,
    "favorite" BOOLEAN NOT NULL,
    "wordCaseId" UUID NOT NULL,
    "partOfSpeechId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "synonym" TEXT,
    "antonym" TEXT,
    "meaning" TEXT,
    "popularCategoryId" UUID NOT NULL,
    "languageId" UUID,

    CONSTRAINT "PopularListWord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PopularListWord_partOfSpeechId_idx" ON "PopularListWord"("partOfSpeechId");

-- CreateIndex
CREATE INDEX "PopularListWord_wordCaseId_idx" ON "PopularListWord"("wordCaseId");

-- CreateIndex
CREATE INDEX "PopularListWord_popularCategoryId_idx" ON "PopularListWord"("popularCategoryId");

-- CreateIndex
CREATE INDEX "PopularListWord_languageId_idx" ON "PopularListWord"("languageId");

-- CreateIndex
CREATE UNIQUE INDEX "user_userName_idx" ON "User"("userName");

-- CreateIndex
CREATE INDEX "User_languageId_idx" ON "User"("languageId");

-- AddForeignKey
ALTER TABLE "PopularListWord" ADD CONSTRAINT "PopularListWord_partOfSpeechId_fkey" FOREIGN KEY ("partOfSpeechId") REFERENCES "PartOfSpeech"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PopularListWord" ADD CONSTRAINT "PopularListWord_popularCategoryId_fkey" FOREIGN KEY ("popularCategoryId") REFERENCES "PopularListCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PopularListWord" ADD CONSTRAINT "PopularListWord_wordCaseId_fkey" FOREIGN KEY ("wordCaseId") REFERENCES "WordCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PopularListWord" ADD CONSTRAINT "PopularListWord_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;
