/*
  Warnings:

  - You are about to drop the column `status` on the `devices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "devices" DROP COLUMN "status",
ADD COLUMN     "deviceStatus" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "updateStatus" TEXT NOT NULL DEFAULT 'none';
