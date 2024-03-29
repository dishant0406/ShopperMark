import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      res.status(401)
      throw new Error('Invalid Token Provided')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not Authorized')
  }

})

const admin = asyncHandler(async (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not Authorized as Admin')
  }
})

export { protect, admin }