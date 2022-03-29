const express = require('express')
const app = express()
const cors = require('cors')

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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Express server is running on port 3001")
})