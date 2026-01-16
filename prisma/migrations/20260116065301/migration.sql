-- CreateTable
CREATE TABLE "menu_roles" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "menuKeyId" TEXT NOT NULL,

    CONSTRAINT "menu_roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "menu_roles_roleId_menuKeyId_key" ON "menu_roles"("roleId", "menuKeyId");

-- AddForeignKey
ALTER TABLE "menu_roles" ADD CONSTRAINT "menu_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_roles" ADD CONSTRAINT "menu_roles_menuKeyId_fkey" FOREIGN KEY ("menuKeyId") REFERENCES "menus"("menuKey") ON DELETE RESTRICT ON UPDATE CASCADE;
