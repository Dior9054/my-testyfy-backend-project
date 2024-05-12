
import jwt from "jsonwebtoken"

export default (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "")

    // console.log(token)

    if (token) {
        try {
            const decoder = jwt.verify(token, "secret123")

            req.userId = decoder._id
            next()
        } catch (err) {
            return res.status(403).json({
                messgae: "Нет доступа"
            })
        }
    } else {
        return res.status(403).json({
            messgae: "Нет доступа"
        })
    }

}

