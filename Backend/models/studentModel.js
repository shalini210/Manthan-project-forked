const mongoose = require("mongoose")
const studentSchema = mongoose.Schema({
    name:String,
    address:String,
    contact:Number,
    email:String,
    password:Number,
    verification: { type: Boolean, default: false } ,
    otp:Number
})
const studentModel = mongoose.model("student",studentSchema)
module.exports= studentModel