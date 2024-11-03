const crypto = require("crypto");
const https = require("https");

// change libuv thread pool numbers
// for windows cmd: SET UV_THREADPOOL_SIZE=2 && node thread-pool
// need to set thread pool first before execute .js type node file
// max size and efficiency depends on CPU cores
// e.g. 16 tasks divided to 8 cores, take 2x time in average 

// process.env.UV_THREADPOOL_SIZE = 5;

const start = Date.now();
const MAX_CALLS = 64;

for (let i = 0; i < MAX_CALLS; i++) {
  // crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  //   console.log(`Hash: ${i + 1}`, Date.now() - start);
  // });

  // seems not using thread pool and not affected by CPU cores number
  // https.request is network operation, give the work to the OS kernel if possible
  // poll the kernel and see if the request has completed
  // libuv use thread pool if tasks are file I/O or CPU intensive
  https.request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(`Request: ${i + 1}`, Date.now() - start);
      });
    })
    .end();
}