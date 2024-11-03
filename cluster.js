const http = require("node:http")
const cluster = require("node:cluster") 
const os = require("node:os")


// if access /slow-page first, then access / immediately;
// /slow-page will block / as there are only one worker
// and make / take as much time as / slow-page needed to load

// each worker work individually with its own event loop and memory
// should only create as many worker as CPU cores

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);

    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork(); // 重新創建一個新工作進程
    });

} else {
    console.log(`Woreker ${process.pid} started`);
    const server = http.createServer((req, res) => {
        if (req.url === "/") {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("Home page");
        } else if (req.url === "/slow-page") {
        //   for (let i = 0; i < 6000000000; i++) {} // Simulate CPU work
        //   res.writeHead(200, { "Content-Type": "text/plain" });
        //   res.end("Slow Page");
            setTimeout(() => {
                res.writeHead(200, {"Content-Type": "text/plain"});
                res.end("Slow Page");
            }, 3000)
        }
      });
    
      server.listen(3000, () => console.log("Server is running on port 3000"));
    
}
