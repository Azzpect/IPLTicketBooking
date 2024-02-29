const express = require("express")
const path = require("path")
const fs = require("fs")
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config()

const port = process.env.Port
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
    var link = "https://wa.me/" + process.env.Phone_No
    res.send({link})
})

app.listen(port, () => {
    console.log(`Server is live`)
})