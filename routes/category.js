const router = require('express').Router()
const Category = require("../models/Category")

// Create
router.post('/store', async (req, res) => {
    try {
        const { name } = req.body;

        const newCat = new Category({ name });

        const alreadyExist = await Category.findOne({ name })
        alreadyExist && res.status(400).json("Category name already exist!")

        const category = await newCat.save()
        res.status(200).json(category)
    } catch (err) {
        res.status(500).json()
    }
})

// GetOne
router.get('/get/:id', async (req, res) => {
    try {

        const { id } = req.params
        const category = await Category.findOne({ id })
        category && res.status(200).json(category)

    } catch (err) {
        res.status(500).json()
    }
})

// All
router.get('/all', async (req, res) => {
    try {

        const category = await Category.find()
        category && res.status(200).json(category)

    } catch (err) {
        res.status(500).json()
    }
})

// Update



// Delete
router.delete('/delete/:id', async (req, res) => {
    try {

        const { id } = req.params
        const category = await Category.findByIdAndDelete(id)
        category && res.status(200).json(category)

    } catch (err) {
        res.status(500).json()
    }
})


module.exports = router