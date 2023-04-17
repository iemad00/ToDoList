const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const date = require(__dirname + "/date.js")

const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(express.static('public'))

const itemList = [];
const workItemList = [];

app.get("/",function(req,res){
    let day = date.getDate();
    res.render('list',{
        day: day,
        itemList: itemList
    })
})

app.get("/work", function(req,res) {
    res.render('list',{
        day: "Work Day",
        itemList: workItemList
    })
})

app.post("/",function(req,res){
    let item = req.body.item
    if(req.body.list === "Work"){
        workItemList.push(item);
        res.redirect("/work")
    }else{
        itemList.push(item);
        res.redirect("/")
    }    
})

app.listen(3000 || process.env.PORT, function(){
    console.log("The Application is running on port 3000");
})

