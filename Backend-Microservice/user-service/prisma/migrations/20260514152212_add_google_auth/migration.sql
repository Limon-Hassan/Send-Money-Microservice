/*
  Warnings:

  - You are about to drop the column `fingerprint` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `ip` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `lastSeenAt` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `devices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[googleId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "devices" DROP COLUMN "fingerprint",
DROP COLUMN "ip",
DROP COLUMN "lastSeenAt",
DROP COLUMN "userAgent",
ADD COLUMN     "browser" TEXT,
ADD COLUMN     "deviceName" TEXT,
ADD COLUMN     "ipAddress" TEXT;

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "deviceId" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "googleId" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
