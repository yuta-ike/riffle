/*
  Warnings:

  - A unique constraint covering the columns `[userId,commentId,stampType]` on the table `Stamp` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stamp_userId_commentId_stampType_key" ON "Stamp"("userId", "commentId", "stampType");
