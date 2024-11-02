// 設定 router
const express = require('express')
const router = express.Router()

const booksInfo = [
    {
        id: 1,
        title: "Node JS Entry",
        author: "Ken",
        page: 50
    },
    {
        id: 2,
        title: "Node JS Mid",
        author: "Mary",
        page: 99
    },
    {
        id: 3,
        title: "Node JS Pro",
        author: "Alex",
        page: 111
    }
]

// /books 的 root
router.get('/', (req, res) => {
    res.render("books", {title: "Books root", books: booksInfo})
})


// /books/* (any)
// http://localhost:3000/books/ABC?name=123
router.get('/wrongID/:id', (req, res) => {
    res.send(`id ${req.params.id} not found`)
})

// /books/:id, get book info with id
router.get('/:id', (req, res, next) => {
    console.log("ID:" + req.params.id)
    result = booksInfo.find(book => book.id == req.params.id)
    if (result) {
        console.log("found")
        res.json({book: result})
    } else {
        console.log("not found")
        res.redirect(`wrongID/${req.params.id}`)
    }
})

// 輸出 router
module.exports = router
