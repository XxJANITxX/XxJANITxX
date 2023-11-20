const connectToMongo = require('./db');
const express = require("express");

// Data base connected
connectToMongo();

//  Express app
const app = express();
const port = 5000;
app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Listening app
app.listen(port, () => {
    console.log("Listening at port 3000");
})