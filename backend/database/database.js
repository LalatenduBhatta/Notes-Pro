const mongoose = require("mongoose")

const dbconnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL)
        if (connection) console.log("Database connected successfully");

    } catch (error) {
        console.log(error);

    }
}

module.exports = dbconnection