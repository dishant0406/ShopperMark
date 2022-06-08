import express, { json } from 'express'
import products from './Data/products.js'
import { config } from 'dotenv'
import connectDB from './config/db.js'

//dotenv config
config()

//create app
const app = express()

//connect to db
connectDB()

//middleware
app.use(json())

//root route
app.get('/', (req, res) => {
  res.send('Welcome')
})


app.get('/api/products', (req, res) => {
  res.status(200).json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id)

  if (!product) return res.json({ productID: req.params.id, status: 'Product Not Found' })

  res.status(200).json(product)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`App is Listening on ${PORT} running on ${process.env.NODE_ENV} Mode`))