const express = require("express")
const app = express()
const path = require("path")
const  fs = require("fs")

 //Parsing middleware
 app.use(express.json())
 app.use(express.urlencoded({extended: true}))
 app.use(express.static(path.join(__dirname, "public")))
 app.set('view engine', 'ejs')


  app.get("/", (req, res) => {
    fs.readdir(`./files`, function (err, files) {
    res.render("index", {files: files})

    })
 })

 app.get("/files/filename", (req, res) => {
    fs.readFile()
    fs.readdir(`./files`, function (err, files) {
    res.render("index", {files: files})

    })
 })
 app.post("/create", function(req, res){
  console.log(req.body)
  fs.writeFile(`./files/${req.body.title.split(" ").join(" ")}.txt`, req.body.detail, function(err){
   res.redirect("/")

  })
})



//  app.get("/profile/:username", (req, res) => {
//     res.send(`Welcome ${req.params.username}`)
//  })

 app.listen(3000, () => {
    console.log("Server is running on port 3000")
 })
 