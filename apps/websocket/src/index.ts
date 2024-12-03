import WebSocket, {WebSocketServer} from "ws";
import prisma from "@repo/db";

const PORT = 8080

const wss = new WebSocketServer({port: PORT})


wss.on("connection",(ws)=>{
    console.log(`Client connected`);
    
    ws.on("message",()=>{

    })

    ws.on("close",()=>{

    })
})

console.log(`websocket connected to server ${PORT}`);
