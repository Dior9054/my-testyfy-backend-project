
import express from "express"
import multer from "multer"
import mongoose from "mongoose"
import { registerValidation, loginValidation, postCreateValidation } from "./validations.js"
// import { validationResult } from "express-validator"
// import UserModal from "./models/Users.js"
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"
import checkAuth from "./utils/checkAuth.js"
// import { register } from "module"
// import { register, login, getMe } from './controllers/UserController.js'
import * as UserController from "./controllers/UserController.js"
import * as PostController from "./controllers/PostControllers.js"
import handleValidationErrors from "./utils/handleValidationErrors.js"
import cors from "cors"

mongoose.connect("mongodb+srv://admin:wwww@cluster0.lxa064x.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0")

const app = express()

const storage = multer.diskStorage({
    destination: (_, file, cb) => {
        cb(null, "uploads")
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("uploads"))

app.post("/auth/log", loginValidation, handleValidationErrors, UserController.login)
app.get("/auth/me", checkAuth, UserController.getMe)
app.post("/auth/reg", registerValidation, handleValidationErrors, UserController.register)

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get("/posts", PostController.getAll)
app.get("/posts/:id", PostController.getOne)
app.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.delete("/posts/:id", checkAuth, PostController.remove)
app.patch("/posts/:id", checkAuth, postCreateValidation, handleValidationErrors, PostController.update)


app.listen(200, () => {
    console.log("ok");
})

