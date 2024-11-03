// cluster run multiple instances of NodeJS to distribute workloads
// while worker_thread running multiple application threads within a single NodeJS instance
// if don't need isolate process, no separate instances of V8;
// event loop and memory are needed, worker_threads should be used


// worker thread good for massive calculation/compressing specified file, sharing same part of memory
// cluster worker independently, good for I/O, isolated memory for each cluster

const http = require("node:http")
const { Worker } = require("node:worker_threads") 
const os = require("node:os")



const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Home page");
    } else if (req.url === "/slow-page") {
        const worker = new Worker("./worker-thread.js")
        worker.on("message", (j) => {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(`Slow Page ${j}`);
        })
    }
});

server.listen(3000, () => console.log("Server is running on port 3000"));
    

