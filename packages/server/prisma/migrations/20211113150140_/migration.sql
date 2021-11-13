/*
  Warnings:

  - You are about to drop the column `completedAt` on the `ConnectCode` table. All the data in the column will be lost.
  - The primary key for the `InviteCode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `completedAt` on the `InviteCode` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `InviteCode` table. All the data in the column will be lost.
  - You are about to drop the `CollaboratorApplication` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `InviteCode` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CollaboratorApplication" DROP CONSTRAINT "CollaboratorApplication_bookId_fkey";

-- DropForeignKey
ALTER TABLE "CollaboratorApplication" DROP CONSTRAINT "CollaboratorApplication_userId_fkey";

-- AlterTable
ALTER TABLE "ConnectCode" DROP COLUMN "completedAt",
ADD COLUMN     "deauthorizedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "InviteCode" DROP CONSTRAINT "InviteCode_pkey",
DROP COLUMN "completedAt",
DROP COLUMN "id",
ADD COLUMN     "accepted" BOOLEAN,
ADD COLUMN     "deauthorizedAt" TIMESTAMP(3),
ADD COLUMN     "role" "Role" NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "InviteCode_pkey" PRIMARY KEY ("inviteCode");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isManualUpdated" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "CollaboratorApplication";

-- CreateTable
CREATE TABLE "CollaboratorRequest" (
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CollaboratorRequest_pkey" PRIMARY KEY ("userId","bookId")
);

-- AddForeignKey
ALTER TABLE "CollaboratorRequest" ADD CONSTRAINT "CollaboratorRequest_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollaboratorRequest" ADD CONSTRAINT "CollaboratorRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
