let userquestionModel = require("../models/userquestionModel")
// exports.getall = async () => {
//     let data = {};
//     await userquestionModel.find()
//         .then((d) => {
//             data.data = d
//             data.msg = "data found"
//         })
//         .catch((err) => data.msg = err)
//     return data
// }

exports.getall = async () => {
    let data = {};
    try {
        const result = await userquestionModel.aggregate([
            {
                $addFields: {
                    userObjectId: { $toObjectId: "$user_id" }
                }
            },
            {
                $lookup: {
                    from: "users",                // collection name in MongoDB (lowercase plural of model name)
                    localField: "userObjectId",
                    foreignField: "_id",
                    as: "user_data"
                }
            },
            {
                $unwind: "$user_data"
            },
            {
                $project: {
                    _id: 1,
                    questiontitle: 1,
                    question: 1,
                    postdate: 1,
                    category:1,
                    user_name: "$user_data.name",
                    email: "$user_data.email",
                    profilepic: "$user_data.profilepic"
                }
            }
        ]);

        // res.status(200).json(result);
        data.data = result
        data.msg = "record found"
    } catch (error) {
        console.error("Aggregation error:", error);
        data.msg = "Internal Server Error";
    }
    return data
};