const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//desc register
//route api/users/register
const registerUser = asyncHandler(async (req, res)=>{
    const {username, email , password} = req.body
    if(!username || !email || !password) {
        res.status(404)
        throw new Error("all feild mandatory")
    }
    const userAvailabale = await User.findOne({email})
    if(userAvailabale){
        res.status(400)
        throw new Error("user already exists")
    }else{
    //hash password 
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)

    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    })
    console.log("user created")

    if(user){
        res.status(201).json({_id: user._id, email : user.email})
    }else{
        res.status(400)
        throw new Error("user data in valud")
    }
    }
    res.json({message: 'register a user'})
})

//desc register
//route api/users/login
const loginUser = asyncHandler( async (req, res)=>{
    const {email , password} = req.body;
    if(!email || !password) {
        res.status(400)
        throw new Error("all feilds mandatopy")
    }
    const user = await User.findOne({email})

    if(user && bcrypt.compare(password, user.password)){
      const accessToken = jwt.sign({
        user:
        {
        username: user.username,
        email: user.email,
        id: user.id,
      }
    },process.env.ACCESS_TOKEN,
    {expiresIn : '20m'})
    res.status(200).json({accessToken : accessToken})
    }
    else{
        res.status(400)
        throw new Error("invalid credenyias")
    }
    
})

//desc register
//route api/users/current
//acess private (so that only authenticated user can access by providing access token)
const currentUser = asyncHandler( async(req, res)=>{
    console.log("inside current")
    res.json(req.user)
})

module.exports = { registerUser , loginUser , currentUser}
