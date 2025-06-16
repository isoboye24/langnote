/*
  Warnings:

  - You are about to drop the column `languageId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_languageId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "languageId";
