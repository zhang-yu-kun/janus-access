/*
  Warnings:

  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Menu";

-- CreateTable
CREATE TABLE "menu" (
    "menuKey" TEXT NOT NULL,
    "menuName" TEXT NOT NULL,
    "parentKey" TEXT,
    "status" TEXT NOT NULL,
    "sort" INTEGER DEFAULT 1,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("menuKey")
);
