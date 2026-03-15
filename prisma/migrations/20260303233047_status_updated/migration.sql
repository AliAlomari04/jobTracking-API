/*
  Warnings:

  - You are about to drop the column `ststus` on the `Interview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "ststus",
ADD COLUMN     "status" "InterviewStatus" NOT NULL DEFAULT 'SCHEDULED';
