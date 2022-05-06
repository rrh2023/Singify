const express = require('express')
const app = express()
const cors = require('cors')
const request = require('request')
const mongoose = require('mongoose')
const User = require("./models/userModel")
const favSong = require("./models/favSongModel")

// include keys & secrets
const {client_id, client_secret, redirect_uri, apiKey, mongoPassword} = require("./keys.js")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect to mongoDB (database)
const mongoUri = `mongodb+srv://rrh2023:${mongoPassword}@cluster0.gkv7t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(mongoUri)

let token = "" // access_token
let curSpotifyUser = {} // cur user
let usersArtists = {}

// Spotify API Calls
app.get('/login', function(req, res) {
   const params = {
    response_type: 'code',
    client_id,
    scope: 'user-follow-read',
    redirect_uri: "http://localhost:3001/callback"
  }
  const qs = new URLSearchParams(params)
  url = 'https://accounts.spotify.com/authorize?' + qs.toString()
  res.redirect(url)
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
        console.log("logged in from server, access token retrieved");

        var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + token },
            json: true
        };
    
        request.get(options, function(error, response, body) {
            curSpotifyUser = body
            console.log("current user's spotify profile info retrieved");
            User.findOne({ spotifyId: curSpotifyUser.id }).exec()
            .then(res => {
                if( res !== null){
                    console.log("User already registered in db")
                }else{
                    const newUser = new User({
                        name: curSpotifyUser.display_name,
                        spotifyId: curSpotifyUser.id
                    })
                    newUser.save(); 
                    console.log('new user in db')
                }
            })
        });

        var options2 = {
            url: 'https://api.spotify.com/v1/me/following?type=artist&limit=15',
            headers: { 'Authorization': 'Bearer ' + token },
            json: true
        };
    
        request.get(options2, function(error, response, body) {
            usersArtists = body;
            console.log('usersArtists',body)
            console.log("current user's spotify artists info retrieved");
        });


    })
   
    res.redirect('http://localhost:3000/')

  } 
)

app.get('/logout', function(req, res){
    token = ""
    curSpotifyUser = {}
    usersArtists = {}
    console.log("logged out from server")
})

app.get('/checkAuth', function(req, res){
    if(token){
        res.send({auth: true})
    }else{
        res.send({auth: false})
    }
})

app.get('/checkIfFavorite/:artist/:songTitle', async function(req, res){
    const check = await favSong.findOne({ artist: req.params.artist, songTitle: req.params.songTitle, user: curSpotifyUser.id}).exec()
    console.log("result:", check)
    if(check){
        console.log("user saved song")
        res.send({favorited: true})
    }else{
        console.log("user did not save song")
        res.send({favorited: false})
    }
    
})

app.post('/favorite/:artist/:songTitle',  function(req, res){
    const newFavSong = new favSong({
        artist: req.params.artist,
        songTitle: req.params.songTitle,
        user: curSpotifyUser.id
    })
    newFavSong.save(); 
    console.log("new favorited song in db")
})

app.get('/favsongs', async function(req, res){
    const songs = await favSong.find({user: curSpotifyUser.id}).exec()
    console.log(songs)
    res.send({songs})
})

app.get('/getUsersArtists', function(req, res){
    console.log('getting user artists')
    console.log("MY FOLLOWED ARTISTS", usersArtists)
    res.send(usersArtists)
})


app.get("/delete/:id", async function(req, res){
    const id = req.params.id
    await favSong.findByIdAndDelete(id)
    console.log('deleted a song')
})

// Lyrics.vho API calls
app.get("/lyricssearch/:searchterm", (req, res) => {
    console.log('working')
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

    request.get(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }else{
            res.send(error)
            // send error
        }
    })
})

app.get('/artist/:name', function(req, res){
    let artistId
    var options = {
        url: `https://api.songkick.com/api/3.0/search/artists.json?apikey=${apiKey}&query=${req.params.name}`,
        json: true
    };

    request.get(options, async function(error, response, body) {
        let artistInfo = await body.resultsPage.results.artist[0]
        artistId = artistInfo.id
        console.log('ARTIST ID:', artistId)

        var options2 = {
            url: `https://api.songkick.com/api/3.0/artists/${artistId}/calendar.json?apikey=${apiKey}`,
            json: true
        };
    
        request.get(options2, async function(error, response, body) {
            let events = await body.resultsPage//.results.event
            console.log(events.results.event)
            res.send(events)
        });

    });

    
    

})



const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`)
})