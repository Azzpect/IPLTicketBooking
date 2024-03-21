const express = require("express")
const path = require("path")
const fs = require("fs")
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config()

const port = process.env.PORT
const app = express()

app.use(bodyParser.json())
const corsOptions = {
    origin: 'http://example.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }
app.use(cors(corsOptions))

app.use("/public", express.static(path.join(__dirname, "../website/public")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../website/index.html"))
})
app.post("/", (req, res) => {
    fs.readFile(path.join(__dirname, "/schedule.json"), (err, data) => {
        if(err)
            res.status(500).send("Some internal error occured")
        res.status(200).send(JSON.parse(data))
    })
})
app.post("/sendMessage", (req, res) => {
    var link = "https://wa.me/" + process.env.PHONE_NO
    res.send({link})
})

app.listen(port, () => {
    console.log(`Server is live`)
})


function findExpiredMatches() {
    let expiredMatches = []
    const monthObj = {3: "Mar.", 4:"Apr."}
    const date = new Date()
    const day = date.getDate()-1
    const month = date.getMonth()+1
    fs.readFile(path.join(__dirname, "/schedule.json"), (err, data) => {
        if(!err){
            data = JSON.parse(data)
            for(const match of data.matches) {
                if(match.date == `${day} ${monthObj[month]}`) {
                    expiredMatches.push(data.matches.indexOf(match))
                }
            }
            for(let i = 0; i < expiredMatches.length; i++)
                data.matches.splice(expiredMatches[i-i],1)
            fs.writeFileSync(path.join(__dirname, "/schedule.json"), JSON.stringify(data, null, 4))
            console.log("Matches updated")
        }
    })
}

setInterval(findExpiredMatches, 24*60*60*1000);
