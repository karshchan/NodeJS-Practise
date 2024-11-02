const express = require('express')
const router = express.Router()

// /about
router.get('/', (req, res)=>{
    console.log('about root')
    res.render("aboutMe")
})

module.exports = router