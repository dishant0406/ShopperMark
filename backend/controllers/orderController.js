import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js'

//* get all products
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order Items')
    return
  }
  else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)

  }
})

//* get single order by id 
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')
  if (!order) {
    res.status(404)
    throw new Error('Order not found')
    return
  }
  res.status(200).json(order)
})

//* update the order to paid
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (!order) {
    res.status(404)
    throw new Error('Order not found')
    return
  }
  order.isPaid = true
  order.paidAt = Date.now()
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address
  }

  const updatedOrder = await order.save()
  res.status(200).json(updatedOrder)
})

//* list logined user oders
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })

  res.status(200).json(orders)
})

//* list all users oders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'id name')

  res.status(200).json(orders)
})



//* update the order to paid
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (!order) {
    res.status(404)
    throw new Error('Order not found')
    return
  }
  order.isDelivered = true
  order.deliveredAt = Date.now()


  const updatedOrder = await order.save()
  res.status(200).json(updatedOrder)
})


export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getAllOrders, updateOrderToDelivered }