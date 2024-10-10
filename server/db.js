const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("connected to db");
    } catch (err) {
        console.log('unable to connect db');
    }
}

module.exports = { connectToDB }