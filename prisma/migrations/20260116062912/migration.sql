/*
  Warnings:

  - You are about to drop the `menu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "menu";

-- CreateTable
CREATE TABLE "menus" (
    "menuKey" TEXT NOT NULL,
    "menuName" TEXT NOT NULL,
    "parentKey" TEXT,
    "status" TEXT NOT NULL,
    "sort" INTEGER DEFAULT 1,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("menuKey")
);
