-- CreateTable
CREATE TABLE "faq" (
    "id" UUID NOT NULL,
    "page" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "publish" BOOLEAN NOT NULL,
    "rate" INTEGER NOT NULL,

    CONSTRAINT "faq_pkey" PRIMARY KEY ("id")
);
