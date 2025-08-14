const express = require("express")
const useranswerController = require("../controllers/useranswerController")
const router = express.Router()


router.get("/", async (req, res) => {
    let data = await useranswerController.Showuseranswers()
    res.send(data)
})

router.get("/:question_id", async (req, res) => {
    let question_id = req.params.question_id;
    let data = await useranswerController.ShowuseranswersByQuestion(question_id);
    res.send(data);
});

router.post("/", async (req, res) => {
    let obj = { user_id: req.body.user_id, question_id: req.body.question_id, answer: req.body.answer }
    let d = await useranswerController.InseruserAnswer(obj)
    res.send(d)

})

router.delete("/:id", async (req, res) => {
    let id = req.params.id
    let data = await useranswerController.DeleteuserAnswer(id)
    res.send(data)
})

module.exports = router