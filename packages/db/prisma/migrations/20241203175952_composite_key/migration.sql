-- DropIndex
DROP INDEX "Room_id_key";

-- DropIndex
DROP INDEX "RoomJoinee_userId_roomId_key";

-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "RoomJoinee" ADD CONSTRAINT "RoomJoinee_pkey" PRIMARY KEY ("userId", "roomId");
