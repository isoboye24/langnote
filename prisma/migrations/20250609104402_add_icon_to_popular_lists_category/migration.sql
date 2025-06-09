/*
  Warnings:

  - Added the required column `icon` to the `PopularListCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PopularListCategory" ADD COLUMN     "icon" TEXT NOT NULL;
