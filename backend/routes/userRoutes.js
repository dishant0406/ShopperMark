import express from "express"
const router = express.Router()
import { authuser, getUserProfile, registerUser, updateUserProfile, getUsers } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/login').post(authuser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router
