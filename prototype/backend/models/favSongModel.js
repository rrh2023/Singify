const mongoose = require("mongoose");

const favSongSchema = {
    artist: String,
    songTitle: String,
    user: String
}

const favSong = mongoose.model("favSong", favSongSchema)

module.exports = favSong;