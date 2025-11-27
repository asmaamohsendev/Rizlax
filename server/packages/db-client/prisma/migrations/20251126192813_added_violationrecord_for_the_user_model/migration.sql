-- AlterEnum
ALTER TYPE "JobStatus" ADD VALUE 'SUSPENDED';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "suspendedUntil" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "user_violations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "violation_type" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_violations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_violations" ADD CONSTRAINT "user_violations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
