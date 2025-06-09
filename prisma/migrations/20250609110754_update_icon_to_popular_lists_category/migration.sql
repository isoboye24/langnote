/*
  Warnings:

  - You are about to drop the column `icon` on the `PopularListCategory` table. All the data in the column will be lost.
  - Added the required column `darkImageIcon` to the `PopularListCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lightImageIcon` to the `PopularListCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PopularListCategory" DROP COLUMN "icon",
ADD COLUMN     "darkImageIcon" TEXT NOT NULL,
ADD COLUMN     "lightImageIcon" TEXT NOT NULL;
