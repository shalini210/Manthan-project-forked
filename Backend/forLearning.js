const express = require("express")
const app = express();
const multer = require("multer")
// const upload = multer({ dest: 'uploads/' })


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
         const u = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,u+ file.originalname);
        // console.log(file)
    }
});
const upload = multer({ storage });
app.post('/profile', upload.single('avatar'), (req, res) => {
    console.log(req.file)
    let path = req.file.destination+req.file.filename
    // let data = {imgurl:path,education:req.body...}
    console.log(path)
    res.send('File uploaded successfully');
});

// {avatar:}
// app.post('/profile', upload.single('avatar'), function (req, res, next) {

  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
//   console.log("hi")
//   res.send("done")
// })

app.get("/",(req,res)=>
{
    res.sendFile(__dirname+"/forfile.html")
})
app.listen(5555,()=>console.log("running on 5555"))