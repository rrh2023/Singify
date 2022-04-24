const express = require('express')
const app = express()
const cors = require('cors')
const request = require('request')
const mongoose = require('mongoose')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect to mongoDB (database)
// const mongoUri = "some url"
// mongoose.connect(mongoUri)

// SPOTIFY credentials & keys
const client_id = ''
const client_secret = ''; 
const redirect_uri = "http://localhost:3001/callback"
let token = "" // access_token

// SONGKICK credentials & keys
const apiKey = ""


// Spotify API Calls
app.get('/login', function(req, res) {
   const params = {
    response_type: 'code',
    client_id,
    // scope: 'user-read-private user-read-email',
    redirect_uri: "http://localhost:3001/callback"
  }
  const qs = new URLSearchParams(params)
  url = 'https://accounts.spotify.com/authorize?' + qs.toString()
  res.redirect(url)
})

app.get('/keys', function(req, res){
    console.log
})

app.get('/callback', function(req, res) {
   let code = req.query.code || null
   let authOptions = {
     url: 'https://accounts.spotify.com/api/token',
     form: {
       code: code,
       redirect_uri,
       grant_type: 'authorization_code'
     },
     headers: {
       'Authorization': 'Basic ' + (Buffer.from(
         client_id + ':' + client_secret
       ).toString('base64'))
     },
     json: true
   }

    request.post(authOptions, function(error, response, body) {
        token = body.access_token
        console.log("logged in from server");
        res.redirect('http://localhost:3000/spotify')
    })
  }
)

app.get('/logout', function(req, res){
    token = ""
    console.log("logged out from server")
    res.send({auth: false})
})

app.get('/checkAuth', function(req, res){
    if(token){
        res.send({auth: true})
    }else{
        res.send({auth: false})
    }
})


// Lyrics.vho API calls
app.get("/lyricssearch/:searchterm", (req, res) => {
    let searchTerm = req.params.searchterm // drake

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