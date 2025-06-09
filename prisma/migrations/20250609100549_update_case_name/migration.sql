/*
  Warnings:

  - You are about to drop the column `case` on the `WordCase` table. All the data in the column will be lost.
  - Added the required column `caseName` to the `WordCase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WordCase" DROP COLUMN "case",
ADD COLUMN     "caseName" TEXT NOT NULL;
