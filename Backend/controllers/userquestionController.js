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
        email: (o.email).toLowerCase(),
        question: o.question
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