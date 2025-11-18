/*
  Warnings:

  - You are about to drop the column `chatId` on the `ChatAttachment` table. All the data in the column will be lost.
  - You are about to drop the column `lastActivity` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `user1Id` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `user2Id` on the `Conversation` table. All the data in the column will be lost.
  - Added the required column `conversationId` to the `ChatAttachment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('TEXT', 'IMAGE', 'VIDEO', 'FILE');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('SENT', 'DELIVERED', 'READ', 'FAILED');

-- DropForeignKey
ALTER TABLE "ChatAttachment" DROP CONSTRAINT "ChatAttachment_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_user1Id_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_user2Id_fkey";

-- DropIndex
DROP INDEX "ChatAttachment_chatId_uploadedAt_idx";

-- DropIndex
DROP INDEX "Conversation_lastActivity_idx";

-- DropIndex
DROP INDEX "Conversation_user1Id_lastActivity_idx";

-- DropIndex
DROP INDEX "Conversation_user1Id_user2Id_key";

-- DropIndex
DROP INDEX "Conversation_user2Id_lastActivity_idx";

-- AlterTable
ALTER TABLE "ChatAttachment" DROP COLUMN "chatId",
ADD COLUMN     "conversationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "lastActivity",
DROP COLUMN "user1Id",
DROP COLUMN "user2Id",
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "status" "MessageStatus" NOT NULL DEFAULT 'SENT',
ADD COLUMN     "type" "MessageType" NOT NULL DEFAULT 'TEXT';

-- CreateTable
CREATE TABLE "ConversationParticipant" (
    "conversationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ConversationParticipant_pkey" PRIMARY KEY ("conversationId","userId")
);

-- CreateIndex
CREATE INDEX "ConversationParticipant_userId_idx" ON "ConversationParticipant"("userId");

-- CreateIndex
CREATE INDEX "ChatAttachment_conversationId_uploadedAt_idx" ON "ChatAttachment"("conversationId", "uploadedAt");

-- CreateIndex
CREATE INDEX "Message_conversationId_receiverId_readAt_idx" ON "Message"("conversationId", "receiverId", "readAt");

-- AddForeignKey
ALTER TABLE "ConversationParticipant" ADD CONSTRAINT "ConversationParticipant_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationParticipant" ADD CONSTRAINT "ConversationParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatAttachment" ADD CONSTRAINT "ChatAttachment_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
