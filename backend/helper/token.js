const jwt = require('jsonwebtoken')
const { JWT_SECRET} = require('../config/environment')

const generateToken = (id) => {
    const token = jwt.sign({ id }, "OeNQU6HhGdmxC3o", { expiresIn: '3h' })
    console.log("hello")
    console.log(token);
    return token
}

module.exports = { generateToken }