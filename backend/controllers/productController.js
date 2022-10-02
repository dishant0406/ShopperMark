import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js'

//* get all products
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 6
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}
  const count = await Product.count({ ...keyword })
  const product = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))

  res.status(200).json({ products: product, page, pages: Math.ceil(count / pageSize) })
})

//* Create new Review
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)

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

//* Create new Review
const reviewProduct = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error('Product not Found!!! :)')
  }

  const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

  if (alreadyReviewed) {
    res.status(400)
    throw new Error('Product Already Reviewed')
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id
  }

  product.reviews.unshift(review)
  product.numReviews = product.reviews.length
  product.rating = product.reviews.reduce((a, c) => a + c.rating, 0) / product.reviews.length

  await product.save()
  res.status(201).json({ message: 'Review Added' })
})



export { getProducts, getTopProducts, getProductById, deleteProduct, createProduct, updateProduct, reviewProduct }