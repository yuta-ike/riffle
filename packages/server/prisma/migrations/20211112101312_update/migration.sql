/*
  Warnings:

  - You are about to drop the column `AccessLevel` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `Category` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `deleteDate` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `Role` on the `Collaborator` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `Collaborator` table. All the data in the column will be lost.
  - You are about to drop the column `deleteDate` on the `Collaborator` table. All the data in the column will be lost.
  - You are about to drop the column `joinDate` on the `Collaborator` table. All the data in the column will be lost.
  - You are about to drop the column `requestDate` on the `Collaborator` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `Collaborator` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `CollaboratorApplication` table. All the data in the column will be lost.
  - You are about to drop the column `deleteDate` on the `CollaboratorApplication` table. All the data in the column will be lost.
  - You are about to drop the column `CommentType` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `deleteDate` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `completeDate` on the `ConnectCode` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `ConnectCode` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `deleteDate` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `completeDate` on the `InviteCode` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `InviteCode` table. All the data in the column will be lost.
  - You are about to drop the column `BookType` on the `OwnedBook` table. All the data in the column will be lost.
  - You are about to drop the column `Role` on the `OwnedBook` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `OwnedBook` table. All the data in the column will be lost.
  - You are about to drop the column `deleteDate` on the `OwnedBook` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `OwnedBook` table. All the data in the column will be lost.
  - You are about to drop the column `StampType` on the `Stamp` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `Stamp` table. All the data in the column will be lost.
  - You are about to drop the column `deleteDate` on the `Stamp` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `deleteDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `deleteDate` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `WordDetail` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `WordDetail` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `WordScore` table. All the data in the column will be lost.
  - You are about to drop the column `deleteDate` on the `WordScore` table. All the data in the column will be lost.
  - Changed the type of `category` on the `Book` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `accessLevel` on the `Book` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `Collaborator` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `commentType` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `InviteCode` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `OwnedBook` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `OwnedBook` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `accessLevel` on the `OwnedBook` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `type` to the `Stamp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "AccessLevel",
DROP COLUMN "Category",
DROP COLUMN "createDate",
DROP COLUMN "deleteDate",
DROP COLUMN "updateDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIME(6),
ADD COLUMN     "updatedAt" TIMESTAMP(3),
DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL,
DROP COLUMN "accessLevel",
ADD COLUMN     "accessLevel" "AccessLevel" NOT NULL;

-- AlterTable
ALTER TABLE "Collaborator" DROP COLUMN "Role",
DROP COLUMN "createDate",
DROP COLUMN "deleteDate",
DROP COLUMN "joinDate",
DROP COLUMN "requestDate",
DROP COLUMN "updateDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "joinedAt" TIMESTAMP(3),
ADD COLUMN     "requestedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3),
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;

-- AlterTable
ALTER TABLE "CollaboratorApplication" DROP COLUMN "createDate",
DROP COLUMN "deleteDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "CommentType",
DROP COLUMN "createDate",
DROP COLUMN "deleteDate",
ADD COLUMN     "commentType" "CommentType" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ConnectCode" DROP COLUMN "completeDate",
DROP COLUMN "createDate",
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "expireDate" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Friend" DROP COLUMN "createDate",
DROP COLUMN "deleteDate",
ADD COLUMN     "createdAt" TIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "InviteCode" DROP COLUMN "completeDate",
DROP COLUMN "createDate",
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "OwnedBook" DROP COLUMN "BookType",
DROP COLUMN "Role",
DROP COLUMN "createDate",
DROP COLUMN "deleteDate",
DROP COLUMN "updateDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3),
DROP COLUMN "type",
ADD COLUMN     "type" "BookType" NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL,
DROP COLUMN "accessLevel",
ADD COLUMN     "accessLevel" "AccessLevel" NOT NULL;

-- AlterTable
ALTER TABLE "Stamp" DROP COLUMN "StampType",
DROP COLUMN "createDate",
DROP COLUMN "deleteDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "type" "StampType" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createDate",
DROP COLUMN "deleteDate",
DROP COLUMN "updateDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "createDate",
DROP COLUMN "deleteDate",
DROP COLUMN "updateDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "WordDetail" DROP COLUMN "createDate",
DROP COLUMN "updateDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "WordScore" DROP COLUMN "createDate",
DROP COLUMN "deleteDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3);
