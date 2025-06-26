-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_userId_fkey";

-- DropIndex
DROP INDEX "Word_bookId_idx";

-- DropIndex
DROP INDEX "Word_userId_idx";

-- DropIndex
DROP INDEX "Word_userId_word_key";

-- AlterTable
ALTER TABLE "Word" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "bookId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Word_genderId_idx" ON "Word"("genderId");

-- CreateIndex
CREATE INDEX "Word_wordGroupId_idx" ON "Word"("wordGroupId");

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
