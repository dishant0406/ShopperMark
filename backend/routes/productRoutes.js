import express from "express"
import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"
const router = express.Router()


router.get("/", asyncHandler(async (req, res) => {
  const product = await Product.find({})
  res.status(200).json(product)
}))

router.get("/:id", asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('Product not Found!!! :)')
  }
  res.status(200).json(product)
}))



export default router
