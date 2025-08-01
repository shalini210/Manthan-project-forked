let userquestionModel = require("../models/userquestionModel")
exports.getall = async () => {
    let data = {};
    await userquestionModel.find()
        .then((d) => {
            data.data = d
            data.msg = "data found"
        })
        .catch((err) => data.msg = err)
    return data
}