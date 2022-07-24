import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js'

//* get all products
const getProducts = asyncHandler(async (req, res) => {
  const product = await Product.find({})
  res.status(200).json(product)
})

//* Get Single Product by ID
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('Product not Found!!! :)')
  }
  res.status(200).json(product)
})

export { getProducts, getProductById }