const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const cors = require("cors")
require('dotenv').config({})
const App = express()
const userroute = require("./routes/userroute")
const companyroute = require("./routes/companyroute")
const jobroute = require("./routes/jobroute")
const applicationroute = require("./routes/applicationroute")


App.use(express.json());
App.use(express.urlencoded({ extended: true }))
App.use(cookieParser())
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
}
App.use(cors(corsOptions))


App.get("/", (req, res) => {
    res.send("WELCOME TO BACKEND SERVER")
})


App.use("/user", userroute)
App.use("/company", companyroute)
App.use("/job", jobroute)
App.use("/application", applicationroute)


mongoose.connect(process.env.MONGO_URI).then(() => {
    App.listen(process.env.PORT, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`Your server listening at http://localhost:${process.env.PORT}`)
        }
    })
}).catch((err) => {
    console.log("error in connecting database", err)
})

