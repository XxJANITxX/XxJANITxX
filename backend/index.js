const connectToMongo = require('./db');
const express = require("express");

// Data base connected
connectToMongo();

//  Express app
const app = express();
const port = 3000;

// First listen
app.get("/", (req, res)=>{
    res.send("Hello World");
})

// Listening app
app.listen(port, ()=>{
    console.log("Listening at port 3000");
})