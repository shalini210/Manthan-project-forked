const express = require("express")
const userquestionController = require("../controllers/userquestionController")
const router = express.Router()



router.get("/", async (req, res) => {
    let data = await userquestionController.Showuserquestions()
    res.send(data)
})

router.post("/", async (req, res) => {
    let obj = { email: req.body.email, question: req.body.question }
    let d = await userquestionController.Inseruserquestion(obj)
    res.send(d)

})

router.delete("/:id", async (req, res) => {
    let id = req.params.id
    let data = await userquestionController.DeleteuserQuestion(id)
    res.send(data)
})


module.exports = router