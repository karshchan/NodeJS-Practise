const http = require("http")
const fs = require('fs')
const dayjs = require('dayjs')
const url = require('url')

console.log(dayjs().year())

// http://localhost:3000/search?name=Ken&password=12345678
// declare web server
const server = http.createServer((req, res) => {
    // console.log(req.url)
    // console.log(req.method)

    // result > username=3&password=3
    // let body = ''
    // req.on('data', chunk => {
    //     body += chunk
    // })
    // req.on('end', ()=>{
    //     console.log(body)
    // })

    // 解讀url, http://localhost:3000/search?name=Ken&password=12345678
    let result = url.parse(req.url)
    // /search
    let pathname = result.pathname
    // name=Ken&password=12345678
    let query = result.query

    // 獲得 query 內容
    let url_1 = new URL(req.url, 'http://127.0.0.1')
    // Ken
    console.log(url_1.searchParams.get('name'))


    // url找對應page 
    let path = './page/'
    switch(req.url) {
        case '/':
            path += 'index.ejs'
            res.statusCode = 200
            break
        case '/about':
            path += 'aboutMe.ejs'
            res.statusCode = 200
            break
        // redirect 其他網頁
        case '/aboutus':
            res.statusCode = 301
            res.setHeader('Location', '/about')
            break
        default:
            path += '404.ejs'
            res.statusCode = 404
            break
    }


    // set response type
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    // 中文要 set charset utf-8
    // res.write('<meta charset="UTF-8">')
    fs.readFile(path, (error, data)=>{
        if (error) {
            console.log(error)
        } else {
            res.write(data)
        }
        res.end()
    })
   
})

// Listener to port
server.listen(3000, "localhost", () => {
    console.log("Port 3000 listening...")
})
