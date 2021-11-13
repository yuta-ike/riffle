/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Stamp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Stamp" DROP COLUMN "deletedAt";

-- AlterTable
CREATE SEQUENCE "word_order_seq";
ALTER TABLE "Word" ALTER COLUMN "order" SET DEFAULT nextval('word_order_seq');
ALTER SEQUENCE "word_order_seq" OWNED BY "Word"."order";
