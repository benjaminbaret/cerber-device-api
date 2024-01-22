/*
  Warnings:

  - You are about to drop the column `uri` on the `updates` table. All the data in the column will be lost.
  - Added the required column `url` to the `updates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "updates" DROP COLUMN "uri",
ADD COLUMN     "url" TEXT NOT NULL;
