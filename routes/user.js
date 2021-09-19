const router = require("express").Router()

router.get('/test', (req, res) => {
    res.status(200).json("It's working!")
})


module.exports = router