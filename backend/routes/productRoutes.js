import express from "express"
const router = express.Router()
import { createProduct, deleteProduct, getProductById, getTopProducts, getProducts, reviewProduct, updateProduct } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)

router.route('/top').get(getTopProducts)

router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

router.route('/:id/reviews').post(protect, reviewProduct)



export default router
