const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

// Register
router.post('/register', async (req, res) => {

    try {
        const { username, email, profilePic } = req.body;
        const usernameExist = await User.findOne({ username });
        usernameExist && res.status(500).json("Username already exist")

        const emailExist = await User.findOne({ email })
        emailExist && res.status(500).json("Email already exist")

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({ username, email, profilePic, password: hashedPassword });

        const user = await newUser.save()

        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }

})

// Login

router.post('/login', async (req, res) => {
    try {
        const { username, email } = req.body;

        const user = username ? await User.findOne({ username }) : await User.findOne({ email });
        !user && res.status(400).json("Wrong credentials!")

        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json("Wrong credentials!")

        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router