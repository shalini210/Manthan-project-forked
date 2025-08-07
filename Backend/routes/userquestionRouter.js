const express = require("express")
const userquestionController = require("../controllers/userquestionController")
const router = express.Router()



router.get("/", async (req, res) => {
    let data = await userquestionController.Showuserquestions()
    res.send(data)
})

router.post("/", async (req, res) => {
    let obj = { user_id: req.body.user_id, question: req.body.question, questiontitle: req.body.questiontitle, category: req.body.category }
    let d = await userquestionController.Inseruserquestion(obj)
    res.send(d)

})

router.put("/:id", async (req, res) => {
    let obj = {
        question: req.body.question,
        category: req.body.category,
    };
    let id = req.params.id;

    let d = await userquestionController.UpdateUserQuestion(id, obj);
    res.send(d);
});

router.get("/distinct-categories", async (req, res) => {
    let d = await userquestionController.getDistinctCategories();
    res.send(d);
});

router.get("/by-category/:category", async (req, res) => {
    let category = req.params.category;
    let d = await userquestionController.getQuestionsByCategory(category);
    res.send(d);
});

router.get("/userquestion/by-category/:category", async (req, res) => {
    let category = req.params.category
    let d = await userquestionController.getQuestionsByCategory(category)
    res.send(d);
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