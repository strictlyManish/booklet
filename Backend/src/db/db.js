const mongoose = require("mongoose");

const connectDB = () =>{
    try {
        mongoose.connect(process.env.MONGODB_URI)
        console.log('Database conection sucessfull')
    } catch (error) {
            console.log('Error on DB')
    }
};


module.exports = connectDB