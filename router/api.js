const express = require('express')
const request = require('request')
const methodOverride = require('method-override')
const router = express.Router()

router.use(methodOverride('_method'));

// /about
router.get('/', async(req, res)=>{
    console.log('api root')
    // const respones = await fetch("https://reqres.in/api/users/1")
    // const data = await respones.json()
    // res.render("api", {title: "API test", user: data.data})
    request.get("https://reqres.in/api/users/1", (error, response, body) => {
        // console.log('原始格式，JSON 格式的字串 — — — — — ');
        // console.log(body);
        // console.log('轉成 JS 物件 — — — — — — — — — — ');
        // console.log(JSON.parse(body).data);
        res.render("api", {title: "API test", user: JSON.parse(body).data})
    })
})


router.post('/post', async(req, res)=>{
    console.log('api post')
    request.post('https://reqres.in/api/users/1', { name: "morpheus", job: "zion resident"}, (error, response, body) => {
        if (error) {
            res.send("Post fail")
        } else {
            console.log(body);
            res.send(JSON.parse(body))
        }
    })
})

router.delete('/delete', async(req, res)=>{
    console.log('api delete')
    request.delete('https://reqres.in/api/users/1', (error, response, body) => {
        if (error) {
            res.send("Delete fail")
        } else {
            res.send("Delete success")
        }
    })
})

router.patch('/patch', async(req, res)=>{
    console.log('api delete')
    request.patch('https://reqres.in/api/users/1', { name: "morpheus", job: "zion resident"}, (error, response, body) => {
        if (error) {
            res.send("Patch fail")
        } else {
            console.log(body);
            res.send(JSON.parse(body))
        }
    })
})





module.exports = router