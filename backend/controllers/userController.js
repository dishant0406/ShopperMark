import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'


//! Auth user and get Token
const authuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  }
  else {
    res.status(401)
    throw new Error('Invalid email or password!!')
  }
})

//! Get User Profile Route
const getUserProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  }
  else {
    res.status(404)
    throw new Error('User not found')
  }

})


//! Update User Profile Route
const updateUserProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })

  }
  else {
    res.status(404)
    throw new Error('User not found')
  }

})

//! Register user and get Token
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({ name, email, password })

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  }
  else {
    res.status(400)
    throw new Error('Somthing went wrong!')
  }
})

//! Get User Profile Route
const getUsers = asyncHandler(async (req, res) => {

  const users = await User.find({})

  if (users) {
    res.json(users)
  }
  else {
    res.status(404)
    throw new Error('Users not found')
  }

})


//! Delete User Profile Route
const deleteUser = asyncHandler(async (req, res) => {


  await User.deleteOne({ _id: req.params.id });
  res.json({ message: 'User deleted successfully' })


})

//! Get User Profile Route
const getUserById = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  }
  else {
    res.status(404)
    throw new Error('User not found')
  }

})

//! Update User Profile Route
const updateUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })

  }
  else {
    res.status(404)
    throw new Error('User not found')
  }

})

export { authuser, getUserById, updateUser, getUserProfile, deleteUser, registerUser, updateUserProfile, getUsers }