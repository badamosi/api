const router = require('express').Router()
const Post = require('../models/Post')

router.post('/create', async (req, res) => {
    const { username, title, description, category } = req.body

    try {
        const titleExist = await Post.findOne({ title });
        titleExist && res.status(400).json('Title already exist!')

        const newPost = new Post({ username, title, description, category })

        const savedPost = await newPost.save()

        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router