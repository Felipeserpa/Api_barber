/*
  Warnings:

  - You are about to drop the column `name` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `services` table. All the data in the column will be lost.
  - Added the required column `customer` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "status",
ADD COLUMN     "customer" TEXT NOT NULL;
