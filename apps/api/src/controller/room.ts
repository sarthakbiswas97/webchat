import { RequestHandler, Request, Response } from "express";
import prisma from "@repo/db";

interface RoomRequest {
  title: string;
}

export const createRoom: RequestHandler<{}, any, RoomRequest> = async (
  req,
  res
) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    const roomCheck = await prisma.room.findUnique({
      where: {
        title,
      },
    });
    if (roomCheck) {
      res.status(400).send(`Room name already taken`);
      return;
    }

    const createroom = await prisma.room.create({
      data: {
        title,
        userId,
      },
    });

    res.status(200).send(`Room created successfully: ${createroom.title}`);
  } catch (error) {
    console.error(error);
  }
};

export const joinRoom: RequestHandler<{}, any, RoomRequest> = async (
  req,
  res
) => {
  const userId = req.userId;
  const { title } = req.body;

  try {
    const roomExist = await prisma.room.findUnique({
      where: {
        title,
      },
    });
    if (!roomExist) {
      res.status(400).send(`Room doesn't exist`);
      return;
    }

    const roomJoin = await prisma.roomJoinee.create({
      data: {
        userId,
        roomId: roomExist?.id,
      },
    });

    res.status(200).json({
      msg: `Joined ${title}`,
    });
  } catch (error) {
    console.error;
    res.status(400).send(error);
  }
};

export const leaveRoom: RequestHandler<{}, any, RoomRequest> = async (
  req,
  res
) => {
  try {

    const userId = req.userId;
    const {title} = req.body;

    const roomExist = await prisma.room.findUnique({
      where: {
        title
      }
    })
    if(!roomExist){
      res.status(400).send(`room doesn't exist`);
      return;
    }

    const leave = await prisma.roomJoinee.delete({
      where:{
        userId_roomId:{
          userId,
          roomId: roomExist.id,
        }
      }
    })

    //TODO: get username to send in response
    res.status(200).send(`Left ${title}`)
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getRooms = async (req: Request, res: Response) => {
  const allRooms = await prisma.room.findMany({
    select: {
      title: true,
    },
  });
  res.status(200).json(allRooms);
};

export const getUserDetails = async (req: Request, res: Response) => {
  const userRooms = await prisma.user.findMany({
    select: {
      username: true,
      room: true,
      RoomJoined: true,
    }
  });
  res.status(200).json(userRooms);
};
