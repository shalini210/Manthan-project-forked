const mongoose = require("mongoose")

const questionSchema = mongoose.Schema({
    email: String,
    question: String
})

const userquestionModel = mongoose.model("userquestion", questionSchema)
module.exports = userquestionModel;