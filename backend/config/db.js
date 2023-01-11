// const mongoose = require('mongoose')
// const dotenv = require("dotenv").config()
// // mongoose.set("strictQuery", true)

// const connectDB = async ()=>{
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI)

//         console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
//     } catch (error) {
//         console.log(error);
//         process.exit(1)
//     }
// }

// module.exports = connectDB


// const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGO_URI);

// const connection = mongoose.connection;

// connection.on("connected", () => {
//   console.log("Mongo DB Connection Successfull");
// });

// connection.on("error", () => {
//   console.log("Mongo DB Connection failed");
// });

// module.exports = mongoose;




const mongoose = require("mongoose");
require('dotenv').config();
dbConnect();
async function dbConnect() {
  try {
    await mongoose.connect(
        `mongodb+srv://Arslan:admin123@cluster0.jiog1sg.mongodb.net/pinterest?retryWrites=true&w=majority`,
      { useNewUrlParser: true }
    );
    console.log("MongoDb connected successfully");
  } catch (error) {
    console.log("MongoDb connection failed");
  }
}

module.exports = mongoose;