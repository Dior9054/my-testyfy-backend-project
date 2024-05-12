
import PostModal from "../models/Post.js"

export const getAll = async (req, res) => {
    try {
        const posts = await PostModal.find().populate("user").exec()

        res.json(posts)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить статйи"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id

        PostModal.findOneAndUpdate(
            { _id: postId, },
            { $inc: { viewsCount: 1 }, },
            { returnDocument: "after", }
        )
            .then(doc => res.json(doc))
            .catch(err => res.status(500).json({ message: "Статья не найдена" }))
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить статйи one"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id

        PostModal.findOneAndDelete({
            _id: postId
        })
            .then(doc => res.json({ success: true }))
            .catch(err => res.status(500).json({ message: "Не удалось удалить статю" }))
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить статйи one"
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModal({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        })

        const post = await doc.save()

        res.json(post)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось создать статью"
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id

        await PostModal.updateOne(
            {
                _id: postId
            },
            {
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags,
                user: req.userId,
                imageUrl: req.body.imageUrl,
            }
        )

        res.json({ success: true })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось обнасить статью"
        })
    }
}