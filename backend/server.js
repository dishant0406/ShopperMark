const express = require('express')
const app = express()
const products = require('./Data/products')

app.use(express.json())

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is Listen on ${PORT}`))