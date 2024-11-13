const express = require("express")
const isAuthenticated = require("../middlewares/isAuthenticated")
const CompanyContoller = require("../controller/companycontroller")
const Route = express.Router()

Route.get("/get",  CompanyContoller.getCompany)
Route.post("/register", isAuthenticated.protected, CompanyContoller.register)
Route.get("/get/:id",  CompanyContoller.getCompanyById)
Route.put("/update/:id", CompanyContoller.updateCompany)



module.exports = Route;