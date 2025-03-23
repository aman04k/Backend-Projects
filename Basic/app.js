const express = require("express");
const app = express();


//middleware code 
app.use(function(req, res, next) {
    console.log("hello from middleware")
    next();

})


app.get("/",(req, res) => { 
    res.send("Welcome to home page")
})

app.get("/about", (req, res) => {
    res.send("Welcome to about page")
})

// app.get("/contact", function(req, res, next){
//     return next(new Error("Something went wrong"))
//     // res.send("Welcome to contact page")
// })

//Error Handling 
// app.use(function(err, req, res, next){
//     console.error(err.stack)
//     res.status(500).send("Something went wrong , please try again")
// })

app.listen(3000, () => {
    console.log("server is running")
})

