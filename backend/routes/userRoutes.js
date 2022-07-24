import express from "express"
const router = express.Router()
import { authuser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.route('/login').post(authuser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router
