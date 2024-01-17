-- DropForeignKey
ALTER TABLE "deployments" DROP CONSTRAINT "deployments_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "deployments" DROP CONSTRAINT "deployments_groupId_fkey";

-- AlterTable
ALTER TABLE "deployments" ALTER COLUMN "groupId" DROP NOT NULL,
ALTER COLUMN "deviceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "deployments" ADD CONSTRAINT "deployments_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deployments" ADD CONSTRAINT "deployments_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
