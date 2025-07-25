const express = require("express")
const studentController = require("../controllers/studentController")
const studentModel = require("../models/studentModel")
const router = express.Router()

router.get("/", async (req, res) => {
    let data = await studentController.showStudent()
    res.send(data)
})

router.post("/", async (req, res) => {
    let obj = { name: req.body.name, address: req.body.address, email: req.body.email, password: req.body.password, contact: req.body.contact }
    let d = await studentController.InsertStudent(obj)
    res.send(d)
})

router.get("/verify/:id", async (req, res) => {
    let id = req.params.id
    res.send(`
        <form action="/student/verify/${id}" method="POST">
            <h2>Enter your OTP</h2>
            <input type="number" name="otp" placeholder="Enter OTP" required />
            <button type="submit">Verify</button>
        </form>
    `);
})

router.post("/verify/:id", async (req, res) => {
    let id = req.params.id;
    let enteredOTP = req.body.otp
    let student = await studentModel.findById(id)
    
    console.log("Entered OTP:", enteredOTP);
    console.log("Saved OTP:", student?.otp);

    if (!student) {
        res.send("Student not found")
    }
    if (student.otp == enteredOTP) {
        student.verification = true;
        await student.save();
        res.send("✅ Email verified successfully!");
    } else {
        res.send("❌ Incorrect OTP. Please try again.");
    }
})

router.delete("/:id", async (req, res) => {
    let id = req.params.id
    let data = await studentController.DeleteStudentById(id)
    res.send(data)
})

module.exports = router