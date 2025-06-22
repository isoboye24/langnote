/*
  Warnings:

  - You are about to drop the column `color` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `Topic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `color1` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color2` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_topicId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "color",
ADD COLUMN     "color1" TEXT NOT NULL,
ADD COLUMN     "color2" TEXT NOT NULL;

-- DropTable
DROP TABLE "Topic";

-- CreateTable
CREATE TABLE "WordGroup" (
    "id" UUID NOT NULL,
    "groupName" TEXT NOT NULL,
    "bookId" UUID NOT NULL,

    CONSTRAINT "WordGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WordGroup" ADD CONSTRAINT "WordGroup_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "WordGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
