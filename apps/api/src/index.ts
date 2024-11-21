import express from "express";
import prisma from "@repo/db"

const app = express();
app.use(express.json());


app.get("/users",async (req,res)=>{

    const users = await prisma.user.findMany


})





app.get("/health",(req,res)=>{
    res.send(`server is healthy`)
})

app.listen(3001,()=>{
    console.log(`server listening to 3001`);
})