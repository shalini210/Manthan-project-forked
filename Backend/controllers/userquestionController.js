const userquestionModel = require("../models/userquestionModel");
exports.Showuserquestions = async () => {
    let data;
    await userquestionModel.find()
        .then((d) => {
            data = d
        })
        .catch((err) => {
            data = err
        })
    return data
}

exports.Inseruserquestion = async (o) => {
    let data = {};
    let newQuestion = userquestionModel({
        user_id: o.user_id,
        question: o.question,
        questiontitle: o.questiontitle
    })
    await newQuestion.save()
        .then((d) => {
            data.msg = "Data uploaded";
            data.data = d;
        })
        .catch((err) => {
            data = err
        })
    return data
}

exports.getUserQuestions = async (obj) => {
    let data = {};
    await userquestionModel.find({ user_id: obj.user_id })
        .then((d) => {
            data.msg = "record send"
            data.data = d
        })
        .catch((err) => {
            data = err
        })
    return data
}


exports.DeleteuserQuestion = async (id) => {
    let data = {};
    await userquestionModel.findByIdAndDelete(id)
        .then((d) => {
            data.msg = "record deleted"
            data.data = d
        })
        .catch((err) => {
            data = err
        })
    return data
}