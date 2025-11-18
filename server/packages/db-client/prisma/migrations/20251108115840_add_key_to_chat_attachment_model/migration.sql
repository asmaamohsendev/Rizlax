/*
  Warnings:

  - You are about to drop the column `fileName` on the `ChatAttachment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key]` on the table `ChatAttachment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `ChatAttachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatAttachment" DROP COLUMN "fileName",
ADD COLUMN     "key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ChatAttachment_key_key" ON "ChatAttachment"("key");
