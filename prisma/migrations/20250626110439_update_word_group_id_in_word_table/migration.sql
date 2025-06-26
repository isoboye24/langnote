/*
  Warnings:

  - You are about to drop the column `topicId` on the `Word` table. All the data in the column will be lost.
  - Added the required column `wordGroupId` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_topicId_fkey";

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "topicId",
ADD COLUMN     "wordGroupId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_wordGroupId_fkey" FOREIGN KEY ("wordGroupId") REFERENCES "WordGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
