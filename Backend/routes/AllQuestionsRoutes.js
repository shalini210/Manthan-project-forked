const express = require("express")
const router = express.Router()
const QuestionController = require("../controllers/AllQuestionsController")
router.get("/",async(req,res)=>
{
        let x = await QuestionController.getall()
res.send(x)

    
})
module.exports = router