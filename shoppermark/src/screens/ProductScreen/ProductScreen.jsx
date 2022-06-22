import React from 'react'
import {NavLink, useParams, useHistory } from 'react-router-dom'
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
import { useDispatch, useSelector} from 'react-redux'
import {singleProduct} from '../../store/actions/productActions'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const ProductScreen = () => {
  const [qty, setQty] = React.useState(1);
  const dispatch = useDispatch()
  const history = useHistory();

  const productDetails  = useSelector(state=> state.productDetails)

  const {loading, product, error} = productDetails
  
  const {id} = useParams()

  React.useEffect(() => {
    dispatch(singleProduct(id))
  }, [dispatch, id])

  const handleChange = (event) => {
    setQty(event.target.value);
  };

  const addToCartHandler = ()=>{
    history.push(`/cart/${id}?qty=${qty}`);
  }

  if(loading){
    return (
      
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit"/>
        </Backdrop>
      
    );
  }

  if(error){
    return <Alert severity="error" variant="filled">
    <AlertTitle>Error</AlertTitle>
    {error}
  </Alert>
  }

  
    return (
      <>
      <NavLink to='/'>
      <Button sx={{color: '#000', marginBottom:'0.5rem'}} startIcon={<ArrowBackIcon />}>Go Back</Button>
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
            <Rating value={product.rating || 0} precision={0.5} size="large"  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} readOnly />
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
              {product.countInStock>0 && (
                <div style={{display: 'flex',justifyContent:'space-around', border: '1px solid #b3b3b3', padding: '0.7rem 0', alignItems: 'center'}}>
                <Typography variant="h7" sx={{fontFamily: 'Poppins'}}>Quantity:</Typography>
                <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
                <InputLabel id="demo-select-small">Qty</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={qty}
                  onChange={handleChange}
                  label="Age"
                >
                  {
                    [...Array(product.countInStock).keys()].map((x)=>{
                      return <MenuItem key={x+1} value={x+1}>{x+1}</MenuItem>
                    })
                  }
                </Select>
                </FormControl>
              </div>
              )}
              <div style={{display: 'flex',justifyContent:'space-around', border: '1px solid #b3b3b3', padding: '0.7rem 0'}}>
              <Button onClick={addToCartHandler} startIcon={<AddShoppingCartIcon/>} disabled={product.countInStock <1} variant="contained" disableElevation sx={{width:'90%', backgroundColor:'#000'}}>Add to Cart</Button>
              </div>
            </div>
          </Grid>
          
        </Grid>
      </Container>
      </>
    )
  
}

export default ProductScreen