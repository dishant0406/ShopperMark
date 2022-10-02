//imports
import express, { json } from 'express'
import path from 'path'
import { config } from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import morgan from 'morgan'

//dotenv config
config()

//create app
const app = express()

//morgan setup to log our requests
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

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

//upload Routes
app.use('/api/upload', uploadRoutes)

//send config
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//not found route
app.use(notFound)

//custom async error handler
app.use(errorHandler)

//port
const PORT = process.env.PORT || 5000

//starting server
app.listen(PORT, () => console.log(`App is Listening on ${PORT} running on ${process.env.NODE_ENV} Mode`))