// import file system
const fs = require('node:fs')
const zlib = require("node:zlib")

// zlib achieve compress function with gzip algo
const gzip = zlib.createGzip()

// write file
fs.writeFile("./fs-template/demo.txt", "hello world",()=>{})

// ==============================================================
// // read file
// fs.readFile("./fs-template/demo.txt", "utf-8", (err, data)=>{
//     if (err)
//         console.log(err)
//     else
//         console.log(data.toString())
// })

// ==============================================================
// // create new dir
// fs.mkdir("./fs-template/image", (err)=>{})

// ==============================================================
// delete file, check exist before delete
// if (fs.existsSync("./fs-template/demo.txt")) {
//     fs.unlink("./fs-template/demo.txt", (err)=>{
//         if (err)
//             console.log(err)
//         else
//             console.log("Finish delete.")
//     })
//     console.log("No such file.")
// }
// else {
//     console.log("No such file.")
// }

// ==============================================================
// divide file to chunk(64KB), and send chunk one by one
// don't need to wait for reading entire file before next move
// use less buffer for large file 
// highWaterMark > set 64KB to n byte to see result with small file
const readStream = fs.createReadStream("./fs-template/demo.txt", {encoding: "utf-8", highWaterMark: 2})
const writeStream = fs.createWriteStream("./fs-template/demo2.txt")

// readStream.on("data", (chunk) => {
//     console.log(chunk)
//     writeStream.write(chunk)
// })

// readStream.pipe(writeStream)

readStream.pipe(gzip).pipe(fs.WriteStream("./fs-template/demo2.txt.gz"))