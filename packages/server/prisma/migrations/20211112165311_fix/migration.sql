/*
  Warnings:

  - You are about to drop the column `type` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Stamp` table. All the data in the column will be lost.
  - Changed the type of `stampType` on the `Stamp` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Word_order_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Stamp" DROP COLUMN "type",
DROP COLUMN "stampType",
ADD COLUMN     "stampType" "StampType" NOT NULL;
