
const express=require('express');
require('dotenv').config();
require('./config/db')
const cors=require("cors")
const taskRouter=require('./routes/TaskRoute')
const userRouter=require('./routes/userRoute')
const assignTaskRouter=require('./routes/assignTaskRouter')
const path = require("path");

const app=express();

const port=process.env.PORT || 5004

app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get('/',(req,res)=>{
    res.send("Our server")
})

app.use('/task',taskRouter)
app.use('/user',userRouter)
app.use('/assign-task',assignTaskRouter)


app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);



app.listen(port,()=>{
   console.log(`Server started on http://localhost:${port}`)
})

