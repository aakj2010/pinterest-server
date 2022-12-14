
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { generateToken } = require('../helper/token')


// @desc Register new user
// @route POST /api/users
// @accesss Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('please add All fields')
    }

    // Check if User Exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('user Already Exists')
    }

    // hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})


// @desc Authenticate new user
// @route POST /api/users/login
// @accesss Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })

    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)

        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
    

})


// @desc Get user data
// @route GET /api/users/me
// @accesss Privat
const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    // res.status(200).json(req.user)
    res.status(200).json({
        id: _id,
        name,
        email
    })
})

// Generate JWT Token
// const generateToken = (id) => {
//     const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3h' })
//     console.log(id)
//     console.log(token);
//     return token
// }


module.exports = {
    registerUser,
    loginUser,
    getMe,
}