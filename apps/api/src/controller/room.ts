import { RequestHandler } from "express";
import prisma from "@repo/db";

interface createRoomRequest {
  title: string;
  userId: string;
}

interface joinRoomRequest {
  title: string;
}

export const createRoom: RequestHandler<{}, any, createRoomRequest> = async (
  req,
  res
) => {
  try {

    const userId = req.userId;
    const { title } = req.body;

    const roomCheck = await prisma.room.findUnique({
        where:{
            title
        }
    })
    if(roomCheck){
        return res.status(400).send(`Room name already taken`)
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

export const joinRoom: RequestHandler<{}, any, joinRoomRequest> = async (
  req,
  res
) => {
    
    const userId = req.userId;
    const {title} = req.body;

    const roomExist = await prisma.room.findUnique({
        where:{
            title
        }
    })
    if(!roomExist){
        return res.status(400).send(`Room doesn't exist`)
    }

    //check whether the user has already joined that room 
    // in room joinee table
    //If not already joined, create new RoomJoinee entry with:
        // userId of joining user
        // roomId of selected room

    console.log(roomExist);
    res.status(200).json({
        roomExist
    })
    




    //join room 
};
