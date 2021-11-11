CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('japanese', 'math', 'science', 'social_studies', 'english', 'toeic', 'toefle');

-- CreateEnum
CREATE TYPE "CommentType" AS ENUM ('default', 'question');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('owner', 'editor', 'viewer');

-- CreateEnum
CREATE TYPE "BookType" AS ENUM ('own', 'shared');

-- CreateEnum
CREATE TYPE "AccessLevel" AS ENUM ('full', 'meta', 'none');

-- CreateEnum
CREATE TYPE "StampType" AS ENUM ('good', 'bad');

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,
    "updateDate" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accessLevel" TEXT NOT NULL DEFAULT E'meta',
    "deleteDate" TIME(6),
    "AccessLevel" "AccessLevel" NOT NULL,
    "Category" "Category" NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collaborator" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "joinDate" TIMESTAMP(3),
    "requestDate" TIMESTAMP(3),
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bookId" TEXT,
    "userId" TEXT NOT NULL,
    "updateDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deleteDate" TIMESTAMPTZ(6),
    "Role" "Role" NOT NULL,

    CONSTRAINT "Collaborator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollaboratorApplication" (
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "createDate" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteDate" TIMESTAMPTZ(6),

    CONSTRAINT "CollaboratorApplication_pkey" PRIMARY KEY ("userId","bookId")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bookId" TEXT,
    "wordId" INTEGER,
    "userId" TEXT NOT NULL,
    "deleteDate" TIMESTAMPTZ(6),
    "CommentType" "CommentType" NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConnectCode" (
    "id" SERIAL NOT NULL,
    "connectCode" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "applyUserId" TEXT NOT NULL,
    "expireDate" TIMESTAMPTZ(6) NOT NULL,
    "createDate" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completeDate" TIMESTAMPTZ(6),
    "appliedUserId" TEXT,

    CONSTRAINT "ConnectCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friend" (
    "applyUserId" TEXT NOT NULL,
    "appliedUserId" TEXT NOT NULL,
    "createDate" TIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteDate" TIMESTAMPTZ(6),

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("applyUserId","appliedUserId")
);

-- CreateTable
CREATE TABLE "InviteCode" (
    "id" SERIAL NOT NULL,
    "inviteCode" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "inviterUserId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "expireDate" TIMESTAMP(3) NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL,
    "completeDate" TIMESTAMPTZ(6),
    "inviteeUserId" TEXT,

    CONSTRAINT "InviteCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OwnedBook" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL,
    "accessLevel" TEXT NOT NULL,
    "profileId" TEXT,
    "bookId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "updateDate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteDate" TIMESTAMPTZ(6),
    "Role" "Role" NOT NULL,
    "BookType" "BookType" NOT NULL,

    CONSTRAINT "OwnedBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stamp" (
    "id" SERIAL NOT NULL,
    "stampType" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "commentId" INTEGER,
    "userId" TEXT NOT NULL,
    "deleteDate" TIMESTAMPTZ(6),
    "StampType" "StampType" NOT NULL,

    CONSTRAINT "Stamp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMPTZ(6),
    "deleteDate" TIMESTAMPTZ(6),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,
    "bookId" TEXT,
    "userId" TEXT NOT NULL,
    "deleteDate" TIMESTAMPTZ(6),

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordDetail" (
    "wordId" INTEGER NOT NULL,
    "done" BOOLEAN NOT NULL,
    "flags" INTEGER[],
    "userId" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "createDate" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMPTZ(6),

    CONSTRAINT "WordDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordScore" (
    "id" SERIAL NOT NULL,
    "wordId" INTEGER NOT NULL,
    "result" BOOLEAN NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "deleteDate" TIMESTAMPTZ(6),

    CONSTRAINT "WordScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Word_order_key" ON "Word"("order");

-- CreateIndex
CREATE UNIQUE INDEX "WordDetail_wordId_userId_key" ON "WordDetail"("wordId", "userId");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaborator" ADD CONSTRAINT "Collaborator_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaborator" ADD CONSTRAINT "Collaborator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollaboratorApplication" ADD CONSTRAINT "CollaboratorApplication_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollaboratorApplication" ADD CONSTRAINT "CollaboratorApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConnectCode" ADD CONSTRAINT "ConnectCode_appliedUserId_fkey" FOREIGN KEY ("appliedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConnectCode" ADD CONSTRAINT "ConnectCode_applyUserId_fkey" FOREIGN KEY ("applyUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_appliedUserId_fkey" FOREIGN KEY ("appliedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_applyUserId_fkey" FOREIGN KEY ("applyUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InviteCode" ADD CONSTRAINT "InviteCode_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InviteCode" ADD CONSTRAINT "InviteCode_inviteeUserId_fkey" FOREIGN KEY ("inviteeUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InviteCode" ADD CONSTRAINT "InviteCode_inviterUserId_fkey" FOREIGN KEY ("inviterUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnedBook" ADD CONSTRAINT "OwnedBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnedBook" ADD CONSTRAINT "OwnedBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stamp" ADD CONSTRAINT "Stamp_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stamp" ADD CONSTRAINT "Stamp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordDetail" ADD CONSTRAINT "WordDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordDetail" ADD CONSTRAINT "WordDetail_id_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordScore" ADD CONSTRAINT "WordScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordScore" ADD CONSTRAINT "WordScore_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
