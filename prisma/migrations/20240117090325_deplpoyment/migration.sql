-- DropForeignKey
ALTER TABLE "deployments" DROP CONSTRAINT "deployments_groupId_fkey";

-- AddForeignKey
ALTER TABLE "deployments" ADD CONSTRAINT "deployments_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
