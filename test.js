// import file system
const fs = require('fs')

// // 輸出檔案
// fs.writeFile("./demo.txt", "hello world",()=>{})

// // 讀取檔案
// fs.readFile("./demo.txt", (err, data)=>{
//     if (err)
//         console.log(err)
//     else
//         console.log(data.toString())
// })

// // 創建 dir
// fs.mkdir("./image", (err)=>{})

// 刪除檔案, 先檢查是否存在
if (fs.existsSync("./demo.txt")) {
    fs.unlink("./demo.txt", (err)=>{
        if (err)
            console.log(err)
        else
            console.log("Finish delete.")
    })
    console.log("No such file.")
}
else {
    console.log("No such file.")
}