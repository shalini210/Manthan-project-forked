const express = require("express")
const userquestionController = require("../controllers/userquestionController")
const router = express.Router()



router.get("/", async (req, res) => {
    let data = await userquestionController.Showuserquestions()
    res.send(data)
})

router.post("/", async (req, res) => {
    let obj = { user_id: req.body.user_id, question: req.body.question, questiontitle: req.body.questiontitle }
    let d = await userquestionController.Inseruserquestion(obj)
    res.send(d)

})

router.get("/:id", async (req, res) => {
    let obj = { user_id: req.params.id };
    let questions = await userquestionController.getUserQuestions(obj);
    res.send(questions);
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id
    let data = await userquestionController.DeleteuserQuestion(id)
    res.send(data)
})


module.exports = router