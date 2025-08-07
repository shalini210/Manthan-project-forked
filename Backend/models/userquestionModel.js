const mongoose = require("mongoose")

const questionSchema = mongoose.Schema({
    user_id: String,
    questiontitle: String,
    question: String,
    category: String,
    postdate: { default: Date.now, type: Date }
})

const userquestionModel = mongoose.model("userquestion", questionSchema)
module.exports = userquestionModel;