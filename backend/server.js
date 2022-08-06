//imports
import express, { json } from 'express'
import { config } from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

//dotenv config
config()

//create app
const app = express()

//connect to db
connectDB()

//middleware
app.use(json())

//product route
app.use('/api/products', productRoutes)

//user Routes
app.use('/api/users', userRoutes)

//order Routes
app.use('/api/orders', orderRoutes)

//send config
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

//not found route
app.use(notFound)

//custom async error handler
app.use(errorHandler)

//port
const PORT = process.env.PORT || 5000

//starting server
app.listen(PORT, () => console.log(`App is Listening on ${PORT} running on ${process.env.NODE_ENV} Mode`))