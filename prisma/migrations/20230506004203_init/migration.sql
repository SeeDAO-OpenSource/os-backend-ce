-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "checkinCode" TEXT NOT NULL,
    "created" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "hosts" TEXT NOT NULL,
    "guests" TEXT NOT NULL,
    "recorders" TEXT NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "organization" TEXT NOT NULL,
    "participants" TEXT NOT NULL,
    "applicants" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "description" TEXT,
    "proposal" TEXT,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isFolder" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "filetype" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "parentId" INTEGER,
    "password" TEXT,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Point" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "wallet" TEXT,
    "notes" TEXT,
    "event" TEXT,
    "status" TEXT NOT NULL,
    "value_claim" INTEGER NOT NULL,
    "value_fulfilled" INTEGER NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "budgetId" TEXT NOT NULL,
    "links" TEXT NOT NULL,
    "transactions" TEXT NOT NULL,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "email" TEXT,
    "nickname" TEXT,
    "temporaryEmail" TEXT,
    "verifyCode" TEXT,
    "sysuserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,

    CONSTRAINT "SystemUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthGoogle" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,

    CONSTRAINT "AuthGoogle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthTwitter" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "handle" TEXT,

    CONSTRAINT "AuthTwitter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthDiscord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,

    CONSTRAINT "AuthDiscord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthGithub" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT,
    "name" TEXT,

    CONSTRAINT "AuthGithub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthTelegram" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "handle" TEXT,
    "name" TEXT,

    CONSTRAINT "AuthTelegram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthWechat" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "AuthWechat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthZoom" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,

    CONSTRAINT "AuthZoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "rules" TEXT NOT NULL,
    "authorities" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created" INTEGER NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoleToLink" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TagToLink" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RoleToSystemUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_key" ON "User"("wallet");

-- CreateIndex
CREATE UNIQUE INDEX "User_sysuserId_key" ON "User"("sysuserId");

-- CreateIndex
CREATE UNIQUE INDEX "SystemUser_username_key" ON "SystemUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AuthGoogle_userId_key" ON "AuthGoogle"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthTwitter_userId_key" ON "AuthTwitter"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthDiscord_userId_key" ON "AuthDiscord"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthGithub_userId_key" ON "AuthGithub"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthTelegram_userId_key" ON "AuthTelegram"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthWechat_userId_key" ON "AuthWechat"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthZoom_userId_key" ON "AuthZoom"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_email_key" ON "Role"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToLink_AB_unique" ON "_RoleToLink"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToLink_B_index" ON "_RoleToLink"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TagToLink_AB_unique" ON "_TagToLink"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToLink_B_index" ON "_TagToLink"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToSystemUser_AB_unique" ON "_RoleToSystemUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToSystemUser_B_index" ON "_RoleToSystemUser"("B");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_beneficiaryId_fkey" FOREIGN KEY ("beneficiaryId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_sysuserId_fkey" FOREIGN KEY ("sysuserId") REFERENCES "SystemUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthGoogle" ADD CONSTRAINT "AuthGoogle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthTwitter" ADD CONSTRAINT "AuthTwitter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthDiscord" ADD CONSTRAINT "AuthDiscord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthGithub" ADD CONSTRAINT "AuthGithub_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthTelegram" ADD CONSTRAINT "AuthTelegram_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthWechat" ADD CONSTRAINT "AuthWechat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthZoom" ADD CONSTRAINT "AuthZoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToLink" ADD CONSTRAINT "_RoleToLink_A_fkey" FOREIGN KEY ("A") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToLink" ADD CONSTRAINT "_RoleToLink_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToLink" ADD CONSTRAINT "_TagToLink_A_fkey" FOREIGN KEY ("A") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToLink" ADD CONSTRAINT "_TagToLink_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToSystemUser" ADD CONSTRAINT "_RoleToSystemUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToSystemUser" ADD CONSTRAINT "_RoleToSystemUser_B_fkey" FOREIGN KEY ("B") REFERENCES "SystemUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
