/*
  Warnings:

  - You are about to drop the column `sysuserId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `temporaryEmail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AuthDiscord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuthGithub` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuthGoogle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuthTelegram` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuthTwitter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuthWechat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuthZoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SystemUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventAttendees` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventContacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventGuests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventHosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventInterested` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventRolesInvited` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventUsersInvited` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LeadReferrers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RoleToLink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RoleToSystemUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TagToLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuthDiscord" DROP CONSTRAINT "AuthDiscord_userId_fkey";

-- DropForeignKey
ALTER TABLE "AuthGithub" DROP CONSTRAINT "AuthGithub_userId_fkey";

-- DropForeignKey
ALTER TABLE "AuthGoogle" DROP CONSTRAINT "AuthGoogle_userId_fkey";

-- DropForeignKey
ALTER TABLE "AuthTelegram" DROP CONSTRAINT "AuthTelegram_userId_fkey";

-- DropForeignKey
ALTER TABLE "AuthTwitter" DROP CONSTRAINT "AuthTwitter_userId_fkey";

-- DropForeignKey
ALTER TABLE "AuthWechat" DROP CONSTRAINT "AuthWechat_userId_fkey";

-- DropForeignKey
ALTER TABLE "AuthZoom" DROP CONSTRAINT "AuthZoom_userId_fkey";

-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_beneficiaryId_fkey";

-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_proposerId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_fromId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_toId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_sysuserId_fkey";

-- DropForeignKey
ALTER TABLE "_EventAttendees" DROP CONSTRAINT "_EventAttendees_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventAttendees" DROP CONSTRAINT "_EventAttendees_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventContacts" DROP CONSTRAINT "_EventContacts_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventContacts" DROP CONSTRAINT "_EventContacts_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventGuests" DROP CONSTRAINT "_EventGuests_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventGuests" DROP CONSTRAINT "_EventGuests_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventHosts" DROP CONSTRAINT "_EventHosts_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventHosts" DROP CONSTRAINT "_EventHosts_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventInterested" DROP CONSTRAINT "_EventInterested_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventInterested" DROP CONSTRAINT "_EventInterested_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventRolesInvited" DROP CONSTRAINT "_EventRolesInvited_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventRolesInvited" DROP CONSTRAINT "_EventRolesInvited_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventUsersInvited" DROP CONSTRAINT "_EventUsersInvited_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventUsersInvited" DROP CONSTRAINT "_EventUsersInvited_B_fkey";

-- DropForeignKey
ALTER TABLE "_LeadReferrers" DROP CONSTRAINT "_LeadReferrers_A_fkey";

-- DropForeignKey
ALTER TABLE "_LeadReferrers" DROP CONSTRAINT "_LeadReferrers_B_fkey";

-- DropForeignKey
ALTER TABLE "_RoleToLink" DROP CONSTRAINT "_RoleToLink_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoleToLink" DROP CONSTRAINT "_RoleToLink_B_fkey";

-- DropForeignKey
ALTER TABLE "_RoleToSystemUser" DROP CONSTRAINT "_RoleToSystemUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoleToSystemUser" DROP CONSTRAINT "_RoleToSystemUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_TagToLink" DROP CONSTRAINT "_TagToLink_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagToLink" DROP CONSTRAINT "_TagToLink_B_fkey";

-- DropIndex
DROP INDEX "User_sysuserId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sysuserId",
DROP COLUMN "temporaryEmail",
DROP COLUMN "verifyCode",
ADD COLUMN     "bio" TEXT;

-- DropTable
DROP TABLE "AuthDiscord";

-- DropTable
DROP TABLE "AuthGithub";

-- DropTable
DROP TABLE "AuthGoogle";

-- DropTable
DROP TABLE "AuthTelegram";

-- DropTable
DROP TABLE "AuthTwitter";

-- DropTable
DROP TABLE "AuthWechat";

-- DropTable
DROP TABLE "AuthZoom";

-- DropTable
DROP TABLE "SystemUser";

-- DropTable
DROP TABLE "_EventAttendees";

-- DropTable
DROP TABLE "_EventContacts";

-- DropTable
DROP TABLE "_EventGuests";

-- DropTable
DROP TABLE "_EventHosts";

-- DropTable
DROP TABLE "_EventInterested";

-- DropTable
DROP TABLE "_EventRolesInvited";

-- DropTable
DROP TABLE "_EventUsersInvited";

-- DropTable
DROP TABLE "_LeadReferrers";

-- DropTable
DROP TABLE "_RoleToLink";

-- DropTable
DROP TABLE "_RoleToSystemUser";

-- DropTable
DROP TABLE "_TagToLink";
