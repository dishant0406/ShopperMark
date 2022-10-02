import React, {useState, useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../../store/actions/orderActions';

//Material UI
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import PlaceOrderBreadCrumb from './BreadCrumb';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { ORDER_CREATE_RESET } from '../../store/constants/orderConstants';
import TitleHelmet from '../../components/TitleHelmet/TitleHelmet';




const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const cart = useSelector(state => state.cart)
  
  const {cartItems} = cart

  cart.itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  cart.shippingPrice = cart.itemsPrice > 100 ? 5 : 15
  cart.taxPrice = Number((cart.itemsPrice * 0.085).toFixed(2))
  cart.totalPrice = (cart.itemsPrice + cart.shippingPrice + cart.taxPrice).toFixed(2)

  const checkoutHandler = ()=>{
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod, 
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice
    }))
  }

  const orderCreate = useSelector(cart=>cart.orderCreate)
  const {order, error, success} = orderCreate

  React.useEffect(()=>{
    dispatch({type: ORDER_CREATE_RESET})
    if(success){
      history.push(`/order/${order._id}`)
    }
  },[success])

  return (
    <div>
       <TitleHelmet title={`Place your Order`} desc='Place Order'/>
      <PlaceOrderBreadCrumb/>
      <div style={{marginTop:'2rem'}}>
      <Grid container spacing={2} justifyContent="space-around">
      <div style={{marginLeft:'1rem'}}>
      <div style={{marginTop:'2rem'}}>
      <div>
      <Typography variant="h5" gutterBottom sx={{fontFamily: 'Poppins', fontWeight: '600', letterSpacing:1.3}} component="div">
          Address
      </Typography>
      <Typography variant="body2" gutterBottom sx={{fontSize:'16px',fontFamily: 'Poppins', letterSpacing:1.1}} component="div">
          {cart.shippingAddress.address},<br/> {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
      </Typography>
      </div>
      <Divider  />
      <div style={{marginTop:'1rem'}}>
      <Typography variant="h5" gutterBottom sx={{fontFamily: 'Poppins', fontWeight: '600', letterSpacing:1.3}} component="div">
          Payment Method
      </Typography>
      <Typography variant="body2" gutterBottom sx={{fontSize:'16px',fontFamily: 'Poppins', letterSpacing:1.1}} component="div">
          {cart.paymentMethod}
      </Typography>
      </div>
      <Divider  />
      </div>
      <div style={{marginTop:'2rem'}}>
      {cartItems.length>0 && (
          <Grid item xs={12} sm={8}>
          <Typography variant="h5" gutterBottom sx={{fontFamily: 'Poppins', fontWeight: '600', letterSpacing:1.3}} component="div">
          YOUR SHOPPING CART
          </Typography>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }} >
            {cartItems.map(item=>{
              return <>
              <ListItem key={item.product} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={item.image} />
              </ListItemAvatar>
             
              <ListItemText
              primaryTypographyProps={{fontFamily:'Poppins', fontWeight:'500', fontSize:'18px'}} 
                primary={item.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline', fontFamily: 'Poppins', fontSize:'16px', fontWeight:'600'}}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.qty} x ${item.price} = ${(item.price*item.qty).toFixed(2)}
                    </Typography>
                    
                  </React.Fragment>
                }
              />
              
              
            </ListItem>
            <Divider sx={{width:'18rem'}} variant='inset'/>
              </>
            })}
          </List>
  
  
          </Grid>
        )}
      </div>
      </div>
 
      <Grid item xs={12} sm={4}>
          <div style={{marginBottom:'2rem'}}>
          <div style={{display: 'flex',justifyContent:'space-around', border: '1px solid #b3b3b3', padding: '0.7rem 0'}}>
          <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight:'500'}}>
            Order Summary
          </Typography>
          </div>
          <div style={{display: 'flex',justifyContent:'space-between', border: '1px solid #b3b3b3', padding: '0.7rem 0'}}>
          <Typography variant="h6" sx={{fontFamily: 'Poppins',marginLeft:'2rem', fontWeight:'500'}}>
            Items:
          </Typography>
          <Typography variant="h6" sx={{fontFamily: 'Poppins',marginRight:'2rem', fontWeight:'500'}}>
            ${cart.itemsPrice}
          </Typography>
          </div>
          <div style={{display: 'flex',justifyContent:'space-between', border: '1px solid #b3b3b3', padding: '0.7rem 0'}}>
          <Typography variant="h6" sx={{fontFamily: 'Poppins',marginLeft:'2rem', fontWeight:'500'}}>
            Shipping:
          </Typography>
          <Typography variant="h6" sx={{fontFamily: 'Poppins',marginRight:'2rem', fontWeight:'500'}}>
            ${cart.shippingPrice}.00
          </Typography>
          </div>
          <div style={{display: 'flex',justifyContent:'space-between', border: '1px solid #b3b3b3', padding: '0.7rem 0'}}>
          <Typography variant="h6" sx={{fontFamily: 'Poppins',marginLeft:'2rem', fontWeight:'500'}}>
            Tax:
          </Typography>
          <Typography variant="h6" sx={{fontFamily: 'Poppins',marginRight:'2rem', fontWeight:'500'}}>
           ${ cart.taxPrice}
          </Typography>
          </div>
          <div style={{display: 'flex',justifyContent:'space-between', border: '1px solid #b3b3b3', padding: '0.7rem 0'}}>
          <Typography variant="h6" sx={{fontFamily: 'Poppins',marginLeft:'2rem', fontWeight:'500'}}>
            Total:
          </Typography>
          <Typography variant="h6" sx={{fontFamily: 'Poppins',marginRight:'2rem', fontWeight:'500'}}>
            ${cart.totalPrice}
          </Typography>
          </div>
          <div style={{display: 'flex',justifyContent:'space-around', border: '1px solid #b3b3b3', padding: '1rem 0'}}>
              <Button onClick={checkoutHandler} startIcon={<ShoppingBagIcon/>} disabled={cartItems.length <1} variant="contained" disableElevation sx={{width:'90%', backgroundColor:'#000', borderRadius:'2px', height:'3.5rem', fontFamily:'Poppins', fontWeight:'700', fontSize:'16px'}}>Place Order</Button>
          </div>
          </div>
          {error && <Alert severity="error" variant="filled">
              <AlertTitle>Bruh!!</AlertTitle>
              {error}
            </Alert>}
        </Grid>
      </Grid>
      </div>
    </div>
  )
}

export default PlaceOrderScreen