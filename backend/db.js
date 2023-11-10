const mongoose = require('mongoose');

const main = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/Project_iNotebook_Database");
    console.log("We are connected to MongoDB successfully");
}
main().catch(err => {
    console.log(err);
})

module.exports = main;
