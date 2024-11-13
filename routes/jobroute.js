const express = require("express")
const isAuthenticated = require("../middlewares/isAuthenticated")
const JobContoller = require("../controller/jobcontroller")
const Route = express.Router()

Route.post("/post",  JobContoller.jobPost)
Route.get("/get", JobContoller.getAllJobs)
Route.get("/get/:id", JobContoller.getJobById)
Route.get("/getadminjob", JobContoller.getAdminJobs)



module.exports = Route;