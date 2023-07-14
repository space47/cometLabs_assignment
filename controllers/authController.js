const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')

const register = async (req,res) => {
    // or do it in schema
    const user = await User.create({...req.body})
    // token generation is done in schema and taken here with the help of function
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user: {email: user.email},token})
 }

const login = async (req,res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    // compare password
    if(!user){
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(isPasswordCorrect==false){
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user:{email: user.email},token})
}

module.exports = { 
    register,
    login
}

