const mongoose = require('mongoose');

const main = async () => {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("We are connected");
}
main().catch(err => {
    console.log(err);
})

module.exports = main;
