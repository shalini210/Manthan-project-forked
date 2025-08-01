const config = require("./config/dbconfig")
const demoRouter = require("./routes/demoRouter")
const userRouter = require("./routes/userRouter")
const studentRouter = require("./routes/studentRouter")
const questionRoute = require("./routes/userquestionRouter")
const AllquestionsRoute = require("./routes/AllQuestionsRoutes")
const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({extended:true,limit: "50mb"}))
app.use("/uploads",express.static('uploads'));
app.get("/",(req,res)=>
{
    res.send("use /demo for demo and /user for user and /student for student and /userquestion for user questions")
})
app.use("/Allquestions",AllquestionsRoute)
app.use("/demo",demoRouter)
app.use("/user",userRouter)
app.use("/student",studentRouter)
app.use("/userquestion",questionRoute)
app.listen("8081",()=>console.log("server running on loalhost:8081"))