const express = require("express")
const userController = require("../controllers/userController")
const UserModel = require("../models/userModel")
const router = express.Router()
const path = require("path")
const multer = require("multer")
// const upload = multer({ dest: 'uploads/' })


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const u = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, u + file.originalname);
        // console.log(file)
    }
});
const upload = multer({ storage });




router.get("/", async (req, res) => {
    let data = await userController.Showusers()
    res.send(data)
})

router.get("/:id", async (req, res) => {
    let obj = req.params.id
    let user = await userController.getUser(obj);
    res.send(user);
});

router.post("/", async (req, res) => {
    let obj = { name: req.body.name, address: req.body.address, email: req.body.email, password: req.body.password, contact: req.body.contact }
    let d = await userController.Inseruser(obj)
    res.send(d)

})

router.get("/:email", async (req, res) => {
    let email = req.params.email
    let data = await userController.Showuserbyemail(email)
    res.send(data)
})

router.get("/verify/:id", async (req, res) => {
    let id = req.params.id
    res.send(`
        <form action="/user/verify/${id}" method="POST">
            <h2>Enter your OTP</h2>
            <input type="number" name="otp" placeholder="Enter OTP" required />
            <button type="submit">Verify</button>
        </form>
    `);
})

router.post("/loginUser", async (req, res) => {
    let data = await userController.Loginuser({ email: req.body.email, password: req.body.password })
    res.send(data)
})

router.post("/setimage", upload.single('userimg'), async (req, res) => {
    let path = "/uploads/" + req.file.filename

    let userdata = {
        profilepic: path,
    }

    let data = await userController.setProfileimage({ email: req.body.email }, { $set: userdata })
    res.send(data)
})

router.post("/setprofile", async (req, res) => {
    let userdata = {
        education: req.body.education,
        name: req.body.name,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        youtube: req.body.youtube,
        website: req.body.website
    }

    let data = await userController.setProfile({ email: req.body.email }, { $set: userdata })
    res.send(data)

})



router.put("/changepwd", async (req, res) => {
    let data = await userController.Changepassword({ email: req.body.email, oldpassword: req.body.currentpassword, newpassword: req.body.newpassword })
    res.send(data)
})

router.post("/verify/:id", async (req, res) => {
    let id = req.params.id;
    let enteredOTP = req.body.otp
    let user = await UserModel.findById(id)

    console.log("Entered OTP:", enteredOTP);
    console.log("Saved OTP:", user?.otp);

    if (!user) {
        res.send("user not found")
    }
    if (user.otp == enteredOTP) {
        user.verification = true;
        await user.save();
        res.send("✅ Email verified successfully!");
    } else {
        res.send("❌ Incorrect OTP. Please try again.");
    }
})

router.put("/updateuser/:id", async (req, res) => {
    let id = req.params.id
    let newdata = { name: req.body.name, address: req.body.address, email: req.body.email, password: req.body.password, contact: req.body.contact }
    let d = await userController.Updateuser(id, newdata)
    res.send(d)
})

router.put("/changepassword", async (req, res) => {
    let email = req.body.email
    let currentpassword = req.body.currentpassword
    let newdata = { password: req.body.password }
    let d = await userController.UpdateuserPasswordByEmail({ email: email, password: currentpassword }, newdata)
    res.send(d)
})

router.put("/forgetpassword", async (req, res) => {
    const data = await userController.Forgetpassword({ email: req.body.useremail });
    res.send(data);
});

router.put("/resetpwd", async (req, res) => {
    const { id, otp, password } = req.body;

    const user = await UserModel.findById(id);
    if (!user || user.otp != otp) {
        res.send({ msg: "Invalid OTP or user not found." });
    }
    else {
        user.password = password;
        await user.save();
        res.send({ msg: "Password changed successfully." });
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id
    let data = await userController.DeleteUserById(id)
    res.send(data)
})

module.exports = router