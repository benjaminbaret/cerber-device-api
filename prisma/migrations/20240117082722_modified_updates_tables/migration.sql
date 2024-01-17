/*
  Warnings:

  - Added the required column `uri` to the `updates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "deployments" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "updates" ADD COLUMN     "uri" TEXT NOT NULL;
