const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    name: String,
    address: String,
    email: String,
    password: String,
    contact: String,
    verification: { type: Boolean, default: false },
    otp: Number,
    profilepic:String,
    education:String
}, { strict: false })
const UserModel = mongoose.model("user", userSchema)
// const UserSchema = new mongoose.Schema({};
module.exports = UserModel