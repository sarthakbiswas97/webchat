import express from "express";
import authRoutes from "./routes/authRoutes.js"
import roomRoutes from "./routes/roomRoutes.js"

const app = express();
app.use(express.json());



app.use("/api/v1",authRoutes);
app.use("/api/v1",roomRoutes)



app.get("/health",(req,res)=>{
    res.send(`server is healthy`)
})

app.listen(3001,()=>{
    console.log(`server listening to 3001`);
})