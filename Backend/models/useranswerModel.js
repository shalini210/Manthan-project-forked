const mongoose = require("mongoose")

const answerSchema = mongoose.Schema({
    user_id: String,
    question_id: String,
    answer: String,
    postdate: { default: Date.now, type: Date }
})

const useranswerModel = mongoose.model("useranswer", answerSchema)
module.exports = useranswerModel;