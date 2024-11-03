const express = require('express')
const dayjs = require('dayjs')
const booksRouter = require('./router/books.js')
const aboutRouter = require('./router/about.js')
const apiRouter = require('./router/api.js')
const path = require("path")
const cors = require("cors")

const app = express()

// Cross-Origin Resource Sharing, allow access from other site
// restrict access 
const whiteList = ["https://www.mysite231asfd.com", "http://127.0.0.1:3000", "http://localhost:3000"];
const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin)
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Middleware
// next > 跳到下一個 Middelware
app.use((req, res, next) => {
    // req.hostname
    console.log(`新訪客: 來自${req.headers.origin} | 請求頁面: ${req.path}`)
    next()
})

// 解決 server 不能讀取靜態檔案, e.g. css
app.use(express.static('./public'))
// 接收form data
app.use(express.urlencoded({extended: true}))

// set view engine type
app.set('view engine', 'ejs')
// page(path) > where to find ejs file
app.set('views', 'page')


// return index basic params in object forms
const indexReturn = () => {
    let articles = [
        {title: '123', author: 'AAA'},
        {title: 'ASD', author: 'BBB'},
        {title: '1A2B', author: '3C4D'},
    ]
    let now = `時間: ${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`

    return {
        courseName: '入門課程',
        time: now,
        blogs: articles,
        title: '首頁'
    }
}


app.get('/', (req, res)=>{
    //res.send('<h1>Home</h1>')
    //res.sendFile('./page/index.ejs', {root:__dirname})
    // res.sendFile(path.join(__dirname, "page", "index.html")) // html only

    res.render('index', indexReturn())
})

// 處理 index 收到的 post method(simple form)
app.post('/', (req, res) => {
    console.log("Body: " + req.body)
    console.log("Username: " + req.body.username)
    console.log("Password:" + req.body.password)

    let params = indexReturn()
    params.username = req.body.username
    params.password = req.body.password
    res.render('index', params)
})

app.get('/aboutMe', (req, res)=>{
    //res.sendFile('./page/about.html', {root:__dirname})
    res.render('aboutMe', {title: '關於'})
})

app.get('/aboutus', (req, res)=>{
    res.status(301).redirect('/aboutMe')
})

// 把/books 導到books.js處理
app.use('/books', booksRouter)
app.use('/about', aboutRouter)
app.use('/api', apiRouter)
// 到最後甚麼都找不到
app.use((req, res)=>{
    //res.status(404).sendFile('./page/404.html', {root:__dirname})
    //res.status(404)
    res.status(404).render('404', {title: '找不到'})
})

// 接收 port 3000
app.listen(3000)