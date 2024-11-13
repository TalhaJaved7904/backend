const express = require("express")
const ApplicationController = require("../controller/aplicationcontroller")
const Route = express.Router()

Route.get("/apply/:id",ApplicationController.applyJob)
Route.get("/get", ApplicationController.getAppliedJobs)
Route.get("/:id/applicants", ApplicationController.getApplicants)
Route.post("/status/:id/update", ApplicationController.updateStatus)

module.exports = Route