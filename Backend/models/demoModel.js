const mongoose = require("mongoose")
const demoSchema = mongoose.Schema({
    name: String,
    age: Number
})
const demoModel = mongoose.model("demo", demoSchema)
module.exports = demoModel