const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 3002 
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    // res.send("home")
    res.redirect("/signup")
})

app.get("/add", (req,res)=>{
    res.send("add")
})
app.post("/login", (req,res)=>{
    console.log(req.body);
    if (req.body) {
        res.json({success:"Successful"})
    }
    else {
        res.json({error: "error"})
    }
})
app.post("/signup", (req,res)=>{
    if (req.body) {
        res.json({success:"Successful"})
    }
    else {
        res.json({error: "error"})
    }
})
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
module.exports = app