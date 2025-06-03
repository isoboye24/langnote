-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "WordStatus" AS ENUM ('private', 'public');

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" UUID NOT NULL,
    "groupName" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartOfSpeech" (
    "id" UUID NOT NULL,
    "PartOfSpeech" TEXT NOT NULL,

    CONSTRAINT "PartOfSpeech_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" UUID NOT NULL,
    "languageName" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordCase" (
    "id" UUID NOT NULL,
    "case" TEXT NOT NULL,

    CONSTRAINT "WordCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "userName" TEXT NOT NULL DEFAULT 'NO_NAME',
    "firstName" TEXT NOT NULL DEFAULT 'NO_NAME',
    "lastName" TEXT NOT NULL DEFAULT 'NO_NAME',
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(6),
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "image" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "languageId" UUID NOT NULL,
    "categoryId" UUID NOT NULL,
    "partOfSpeechId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "synonym" TEXT,
    "antonym" TEXT,
    "meaning" TEXT,
    "status" "WordStatus" NOT NULL DEFAULT 'private',

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "Word_userId_idx" ON "Word"("userId");

-- CreateIndex
CREATE INDEX "Word_groupId_idx" ON "Word"("groupId");

-- CreateIndex
CREATE INDEX "Word_categoryId_idx" ON "Word"("categoryId");

-- CreateIndex
CREATE INDEX "Word_languageId_idx" ON "Word"("languageId");

-- CreateIndex
CREATE INDEX "Word_partOfSpeechId_idx" ON "Word"("partOfSpeechId");

-- CreateIndex
CREATE INDEX "Word_wordCaseId_idx" ON "Word"("wordCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Word_userId_word_key" ON "Word"("userId", "word");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_wordCaseId_fkey" FOREIGN KEY ("wordCaseId") REFERENCES "WordCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_partOfSpeechId_fkey" FOREIGN KEY ("partOfSpeechId") REFERENCES "PartOfSpeech"("id") ON DELETE CASCADE ON UPDATE CASCADE;
