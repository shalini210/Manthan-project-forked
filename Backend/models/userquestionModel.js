const mongoose = require("mongoose")

const questionSchema = mongoose.Schema({
    user_id: String,
    questiontitle: String,
    question: String
})

const userquestionModel = mongoose.model("userquestion", questionSchema)
module.exports = userquestionModel;