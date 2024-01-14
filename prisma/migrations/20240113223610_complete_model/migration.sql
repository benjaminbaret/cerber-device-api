-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_groupeId_fkey";

-- AlterTable
ALTER TABLE "devices" ALTER COLUMN "groupeId" DROP NOT NULL,
ALTER COLUMN "groupeId" DROP DEFAULT,
ALTER COLUMN "userId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_groupeId_fkey" FOREIGN KEY ("groupeId") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
