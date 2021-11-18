const mongoose = require("mongoose");

const mongo = mongoose.connect(process.env.MONGODB_URL, (error) => {
    if (!error) {
        console.log("DataBase connected");
    } else {
        console.log(error);
    }
});


module.exports = mongo;