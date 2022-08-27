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

//* Delete a Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('Product not Found!!! :)')
  }
  await product.remove()
  res.json({ msg: 'Product Deleted Successfully' })
})

//* Add a Product
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    user: req.user._id,
    price: 0,
    image: 'https://i.ibb.co/pP5vw5q/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    description: 'Sample Description',
    countInStock: 0,
    numReviews: 0,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

//* Update a Product
const updateProduct = asyncHandler(async (req, res) => {
  const { id, name, price, image, brand, category, description, countInStock } = req.body

  const product = await Product.findById(id)

  if (!product) {
    res.status(404)
    throw new Error('Product not Found!!! :)')
  }

  product.name = name || product.name
  product.price = price || product.price
  product.image = image || product.image
  product.brand = brand || product.brand
  product.category = category || product.category
  product.description = description || product.description
  product.countInStock = countInStock || product.countInStock
  product.numReviews = product.numReviews || 0
  product.rating = product.rating || 0


  const updatedProduct = await product.save()
  res.json(updatedProduct)
})

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct }