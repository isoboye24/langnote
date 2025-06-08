-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "Group" (
    "id" UUID NOT NULL,
    "groupName" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartOfSpeech" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "languageId" UUID NOT NULL,

    CONSTRAINT "PartOfSpeech_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" UUID NOT NULL,
    "languageName" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PopularListCategory" (
    "id" UUID NOT NULL,
    "popularCategory" TEXT NOT NULL,

    CONSTRAINT "PopularListCategory_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "WordCase" (
    "id" UUID NOT NULL,
    "case" TEXT NOT NULL,
    "languageId" UUID NOT NULL,

    CONSTRAINT "WordCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "userName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT 'NO_NAME',
    "lastName" TEXT NOT NULL DEFAULT 'NO_NAME',
    "email" TEXT NOT NULL DEFAULT 'NO_Email',
    "emailVerified" TIMESTAMP(6),
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "languageId" UUID NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "expires" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionToken")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" UUID NOT NULL,
    "word" TEXT NOT NULL,
    "known" BOOLEAN NOT NULL,
    "favorite" BOOLEAN NOT NULL,
    "groupId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "wordCaseId" UUID NOT NULL,
    "partOfSpeechId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "synonym" TEXT,
    "antonym" TEXT,
    "meaning" TEXT,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" UUID NOT NULL,
    "reviewText" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
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
CREATE INDEX "WordCase_languageId_idx" ON "WordCase"("languageId");

-- CreateIndex
CREATE UNIQUE INDEX "user_userName_idx" ON "User"("userName");

-- CreateIndex
CREATE INDEX "User_languageId_idx" ON "User"("languageId");

-- CreateIndex
CREATE INDEX "Word_userId_idx" ON "Word"("userId");

-- CreateIndex
CREATE INDEX "Word_groupId_idx" ON "Word"("groupId");

-- CreateIndex
CREATE INDEX "Word_partOfSpeechId_idx" ON "Word"("partOfSpeechId");

-- CreateIndex
CREATE INDEX "Word_wordCaseId_idx" ON "Word"("wordCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Word_userId_word_key" ON "Word"("userId", "word");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartOfSpeech" ADD CONSTRAINT "PartOfSpeech_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PopularListWord" ADD CONSTRAINT "PopularListWord_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PopularListWord" ADD CONSTRAINT "PopularListWord_partOfSpeechId_fkey" FOREIGN KEY ("partOfSpeechId") REFERENCES "PartOfSpeech"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PopularListWord" ADD CONSTRAINT "PopularListWord_popularCategoryId_fkey" FOREIGN KEY ("popularCategoryId") REFERENCES "PopularListCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PopularListWord" ADD CONSTRAINT "PopularListWord_wordCaseId_fkey" FOREIGN KEY ("wordCaseId") REFERENCES "WordCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordCase" ADD CONSTRAINT "WordCase_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_partOfSpeechId_fkey" FOREIGN KEY ("partOfSpeechId") REFERENCES "PartOfSpeech"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_wordCaseId_fkey" FOREIGN KEY ("wordCaseId") REFERENCES "WordCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
