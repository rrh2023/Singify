const express = require('express')
const app = express()
const cors = require('cors')
const request = require('request')

const mongoose = require('mongoose')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect to mongoDB
// const mongoUri = "some url"
// mongoose.connect(mongoUri)

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.get("/lyricssearch/:searchterm", (req, res) => {
    let searchTerm = req.params.searchterm

    request(`https://api.lyrics.ovh/suggest/${searchTerm}`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
            // send search results
        }else{
            res.send(error)
            // send error
        }
        })
})

app.get("/getlyrics/:artist/:songTitle", (req, res) => {
    let {artist, songTitle} = req.params

    request(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
            // send lyrics
        }else{
            res.send(error)
            // send error
        }
    })
})

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`)
})