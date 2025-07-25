const express = require("express")
const demoController = require("../controllers/demoController")
const router = express.Router()

router.get("/", async (req, res) => {
    let data = await demoController.getDemo()
    res.send(data)
})

router.put("/",async(req,res)=>
{
    let id = req.body.id;
    let newdata = {name:req.body.name,age:req.body.age}
    let data = await demoController.UpdateDemoById(id,newdata)
    res.send(data)
})

router.delete("/:id",async(req,res)=>
{
    let id = req.params.id;
    let data = await demoController.DeleteDemoById(id)
    res.send(data)
})

router.get("/:name", async (req, res) => {
    let n = req.params.name
    let data = await demoController.getDemobyName(n)
    res.send(data)
})

router.post("/", async (req, res) => {
    let obj = { name: req.body.name, age: req.body.age }
    let d = await demoController.Insertdemo(obj)
    res.send(d)
})

module.exports = router