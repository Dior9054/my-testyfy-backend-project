
import { body } from "express-validator"

export const loginValidation = [
    body("email", "fuck").isEmail(),
    body("password", "fuck").isLength({ min: 2 }),
]


export const registerValidation = [
    body("email", "fuck").isEmail(),
    body("password", "fuck").isLength({ min: 2 }),
    body("name", "fuck").isLength({ min: 2 }),
    body("avatar", "fuck").optional().isURL(),
]

export const postCreateValidation = [
    body("title", "fuck").isLength({ min: 3 }).isString(),
    body("text", "fuck").isLength({ min: 10 }).isString(),
    body("tags", "fuck").optional().isString(),
    body("imageUrl", "fuck").optional().optional().isString(),
]

