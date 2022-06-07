import React from 'react'
import {NavLink, useParams} from 'react-router-dom'
import products from '../../dummyassets/products'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
const ProductScreen = () => {
  const {id} = useParams()
  const product = products.find(p=> p._id === id)
  return (
    <>
    <NavLink to='/'>
    <IconButton aria-label="back">
        <ArrowBackIcon />
      </IconButton>
    </NavLink>
    <Container>
      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <div style={{display:'flex', height:'100%', width:'100%', alignItems: 'center', justifyContent: 'center'}}>
          <img src={product.image} style={{height:'100%', width:'100%'}} />
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
        <Typography variant="h4" sx={{fontFamily: 'Poppins', lineHeight:1.1, fontWeight: '500',marginBottom:'0.7rem'}} gutterBottom>{product.name}</Typography>
        <Divider />
        
        <Typography gutterBottom variant="h7" sx={{fontFamily: 'Varela Round', marginBottom:'0.7rem',marginTop:'0.7rem', fontWeight:'700'}} component="div">
          <Rating name="read-only" value={product.rating} precision={0.5} size="large"  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} readOnly />
          <Box sx={{ ml: 2 }}>{`${product.numReviews} reviews`}</Box>
          </Typography>
          <Divider />
        <Typography gutterBottom variant="h5" sx={{fontFamily: 'Poppins', fontWeight:'700', marginBottom:'0.7rem',marginTop:'0.7rem'}} component="div">
            ${product.price}
          </Typography>
          <Divider />
        <Typography variant="subtitle1" sx={{fontFamily: 'Poppins',marginTop:'0.7rem'}} gutterBottom >{product.description}</Typography>
        

        </Grid>
        <Grid item xs={12} sm={3}>
          <div>
            <div style={{display: 'flex',justifyContent:'space-around', border: '1px solid #b3b3b3', padding: '0.7rem 0'}}>
              <Typography variant="h7" sx={{fontFamily: 'Poppins'}}>Price:</Typography>
              <Typography variant="h7" sx={{fontFamily: 'Poppins'}}>${product.price}</Typography>
            </div>
            <div style={{display: 'flex',justifyContent:'space-around', border: '1px solid #b3b3b3', padding: '0.7rem 0'}}>
              <Typography variant="h7" sx={{fontFamily: 'Poppins'}}>Stock:</Typography>
              <Typography variant="h7" sx={{fontFamily: 'Poppins'}}>{product.countInStock >0 ? 'In Stock' : 'Out of stock'}</Typography>
            </div>
            <div style={{display: 'flex',justifyContent:'space-around', border: '1px solid #b3b3b3', padding: '0.7rem 0'}}>
            <Button startIcon={<AddShoppingCartIcon/>} variant="contained" disableElevation sx={{width:'90%', backgroundColor:'#000'}}>Add to Cart</Button>
            </div>
          </div>
        </Grid>
        
      </Grid>
    </Container>
    </>
  )
}

export default ProductScreen