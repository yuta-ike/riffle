/*
  Warnings:

  - Made the column `bookId` on table `Word` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_bookId_fkey";

-- AlterTable
ALTER TABLE "Word" ALTER COLUMN "bookId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
