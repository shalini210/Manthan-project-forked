const mongoose = require("mongoose")

const questionSchema = mongoose.Schema({
    user_id: String,
    username: String,
    questiontitle: String,
    question: String,
    postdate: { default: Date.now, type: Date }
})

const userquestionModel = mongoose.model("userquestion", questionSchema)
module.exports = userquestionModel;