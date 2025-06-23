/*
  Warnings:

  - Added the required column `color` to the `WordGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WordGroup" ADD COLUMN     "color" TEXT NOT NULL;
