
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
// import { validationResult } from "express-validator"
import UserModal from "../models/Users.js"

export const register = async (req, res) => {
    try {
        // const error = validationResult(req)

        // if (!error.isEmpty()) {
        //     return res.status(400).json(error.array())
        // }

        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModal({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            avatar: req.body.avatar
        })

        const user = await doc.save()

        const token = jwt.sign(
            {
                _id: user._id,
            },
            "secret123",
            {
                expiresIn: "30d",
            }
        )

        const { passwordHash, ...userDate } = user._doc

        res.json({
            ...userDate,
            token: token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "не удалос fuck"
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModal.findOne({ email: req.body.email })

        if (!user) {
            return req.status(404).json({
                message: "пользователь не найден"
            })
        }

        const isValid = await bcrypt.compare(req.body.password, user._doc.password)

        if (!isValid) {
            return req.status(404).json({
                message: "Не верный логин или пороль"
            })
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            "secret123",
            {
                expiresIn: "30d",
            }
        )

        const { password, ...userDate } = user._doc

        res.json({
            ...userDate,
            token: token
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "не удалос fuck up"
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModal.findById(req.userId)

        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден"
            })
        }

        const { password, ...userDate } = user._doc

        res.json(userDate)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Нет доступа"
        })
    }
}