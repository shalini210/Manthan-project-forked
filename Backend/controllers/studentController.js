const studentModel = require("../models/studentModel")
const sendVerificationEmail = require("./emailverification")
exports.showStudent = async () => {
    let data;
    await studentModel.find()
        .then((d) => {
            data = d
        })
        .catch((err) => {
            data = err
        })
    return data
}

exports.InsertStudent = async (o) => {
    let data = {};
    const otp = Math.floor(1000 + Math.random() * 9000);
    let newstudent = studentModel({
        name: o.name,
        address: o.address,
        email: o.email,
        password:o.password,
        contact:o.contact,
        otp: otp,
        verification: false
    })
    const saved =  await newstudent.save()
    await sendVerificationEmail(saved.email,saved.id,saved.otp)
        .then(() => {
            data.msg = "record saved and mail send for verification"
        })
        .catch((err) => {
            data = err
        })
    return data
}

exports.DeleteStudentById = async (id) => {
    let data = {};
    await studentModel.findByIdAndDelete(id)
        .then((d) => {
            data.msg = "record deleted"
            data.data = d
        })
        .catch((err) => {
            data = err
        })
    return data
}