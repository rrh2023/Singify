const mongoose = require("mongoose");

const userSchema = {
    name: String,
    spotifyId: String
}

const User = mongoose.model("User", userSchema)

module.exports = User;