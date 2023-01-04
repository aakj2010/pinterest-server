const express = require("express");
const colors = require('colors')
const cors = require("cors")
const dotenv = require("dotenv").config();
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000


connectDB()

const app = express()

app.use(express.json())

// app.use(cors({ origin: "https://akj-pinterest-c.netlify.app" }))

app.use(cors({ origin: "*" }))



app.use(express.json())

app.use(express.urlencoded({ extended: false }))


app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)



app.listen(port, () => console.log(`Server Running On port ${port}`))