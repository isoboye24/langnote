/*
  Warnings:

  - Added the required column `bookId` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "bookId" UUID NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
