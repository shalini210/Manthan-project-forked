const config = require("./config/dbconfig")
const demoRouter = require("./routes/demoRouter")
const userRouter = require("./routes/userRouter")
const studentRouter = require("./routes/studentRouter")
const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/uploads",express.static('uploads'));
app.get("/",(req,res)=>
{
    res.send("use /demo for demo and /user for user and /student for student")
})
app.use("/demo",demoRouter)
app.use("/user",userRouter)
app.use("/student",studentRouter)
app.listen("8081",()=>console.log("server running on loalhost:8081"))