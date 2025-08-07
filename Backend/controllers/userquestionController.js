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
        questiontitle: o.questiontitle,
        category: o.category
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

exports.UpdateUserQuestion = async (id, obj) => {
    let data = {};
    await userquestionModel.findByIdAndUpdate(id, obj, { new: true })
        .then((d) => {
            data.msg = "record updated"
            data.data = d
        })
        .catch((err) => {
            data = err
        });
    return data;
};

exports.getDistinctCategories = async () => {
    let result = { msg: "", data: [] };
    try {
        const categories = await userquestionModel.distinct("category");
        result.msg = "category shown";
        result.data = categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        result.msg = "error";
    }
    return result;
};

exports.getQuestionsByCategory = async (category) => {
    let data = {};
    await userquestionModel.find({ category })
        .then((d) => {
            data.msg = "questions found"
            data.data = d
        })
        .catch((err) => {
            console.error("Error fetching questions by category:", err);
        })
    return data;
};

