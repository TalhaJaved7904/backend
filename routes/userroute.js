const express = require("express")
const UserController = require("../controller/usercontroller")
const isAuthenticated = require("../middlewares/isAuthenticated")
const singleUpload = require("../middlewares/multer")
const Route = express.Router()

Route.post("/login",  UserController.login)
Route.post("/register", singleUpload, UserController.register)
Route.get("/logout", UserController.logout)
Route.post("/profile/update", isAuthenticated.protected, singleUpload, UserController.updateProfile)



module.exports = Route;