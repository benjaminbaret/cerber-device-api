/*
  Warnings:

  - You are about to drop the column `udpateProgress` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the `bookmarks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_userId_fkey";

-- AlterTable
ALTER TABLE "devices" DROP COLUMN "udpateProgress",
ADD COLUMN     "updateProgress" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "userId" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "groupeId" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "numberOfDevice" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "bookmarks";

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
