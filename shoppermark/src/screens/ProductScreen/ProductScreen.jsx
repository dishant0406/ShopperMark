import React from 'react'
import {Link, useParams} from 'react-router-dom'
import products from '../../dummyassets/products'

const ProductScreen = () => {
  const {id} = useParams()
  const product = products.find(p=> p._id === id)
  return (
    <div>
      
    </div>
  )
}

export default ProductScreen