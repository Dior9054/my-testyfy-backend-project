
import mongoose from "mongoose"

const UserSchama = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: String,
}, {
    timestamps: true,
})

export default mongoose.model("User", UserSchama)

