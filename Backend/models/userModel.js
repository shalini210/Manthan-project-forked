const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    address: String,
    email: String,
    password: String,
    contact: String,
    verification: { type: Boolean, default: false },
    otp: Number,
    profilepic: String,
    education: String,
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String,
    website: String
}, { strict: false })

const UserModel = mongoose.model("user", userSchema)
module.exports = UserModel
