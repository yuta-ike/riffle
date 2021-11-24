/*
  Warnings:

  - The values [good,bad] on the enum `StampType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StampType_new" AS ENUM ('thumbsup', 'heart', 'star', 'award');
ALTER TABLE "Stamp" ALTER COLUMN "stampType" TYPE "StampType_new" USING ("stampType"::text::"StampType_new");
ALTER TYPE "StampType" RENAME TO "StampType_old";
ALTER TYPE "StampType_new" RENAME TO "StampType";
DROP TYPE "StampType_old";
COMMIT;
