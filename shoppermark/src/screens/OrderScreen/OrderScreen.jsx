import React, {useState, useEffect} from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deliverOrder, getOrderDetails, payOrder } from '../../store/actions/orderActions';
import {PayPalButton} from 'react-paypal-button-v2'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../../store/constants/orderConstants';
import axios from 'axios';

//Material UI
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
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
import TitleHelmet from '../../components/TitleHelmet/TitleHelmet';




const OrderScreen = () => {
  const [sdkReady, setSdkReady] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const {id} = useParams()

  const successPaymentHandler = (paymentResult)=>{
    console.log(paymentResult)
    dispatch(payOrder(id, paymentResult))
  }

  const orderDetails = useSelector(cart=>cart.orderDetails)
  const {order, loading, error} = orderDetails

  const orderPay = useSelector(cart=>cart.orderPay)
  const {loading: loadingPay, success:successPay} = orderPay

  const orderDeliver = useSelector(cart=>cart.orderDeliver)
  const {loading: loadingDeliver, success:successDeliver} = orderDeliver

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  React.useEffect(()=>{
    if(!userInfo){
      history.push('/login')
    }
  },[])

  React.useEffect(()=>{
    const addPaypalScript = async ()=>{
      const {data:clientID} = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `"https://www.paypal.com/sdk/js?client-id=${clientID}`
      script.async = true
      script.onload = ()=> setSdkReady(true)
      document.body.appendChild(script)
    }

    

   if(!order || successPay || order._id!==id || successDeliver){
    dispatch({type:ORDER_PAY_RESET})
    dispatch({type:ORDER_DELIVER_RESET})
    dispatch(getOrderDetails(id))
   }
   else if(!order.isPaid){
    if(!window.paypal){
      addPaypalScript()
    }else{
      setSdkReady(true)
    }
   }

  },[successPay, order, id, successDeliver])

  const deliverHandler = async ()=>{
      dispatch(deliverOrder(id))

  }



  if(loading){
    return (
      
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit"/>
        </Backdrop>
      
    );
  }

  if(error){
    return (
      <Alert severity="error" variant="filled">
              <AlertTitle>Bruh!!</AlertTitle>
              {error}
      </Alert>
    )
  }

  return (
    <div>
       <TitleHelmet title={`ShopperMark | Order Review `} desc='Order'/>
      <div style={{marginTop:'2rem', display:'flex',flexDirection:'column', alignItems:'center', gap:'2rem'}}>
      <Typography variant="h4" gutterBottom sx={{fontFamily: 'Poppins', fontWeight: '600', letterSpacing:1.3}} component="div">
          Order {order._id}
      </Typography>
      <Grid container spacing={2} justifyContent="space-around">
      <div style={{marginLeft:'1rem'}}>
      <div style={{marginTop:'2rem'}}>
      <div>
      <Typography variant="h5" gutterBottom sx={{fontFamily: 'Poppins', fontWeight: '600', letterSpacing:1.3}} component="div">
          Shipping
      </Typography>
      <Typography variant="body2" gutterBottom sx={{fontSize:'16px',fontFamily: 'Poppins', letterSpacing:1.1}} component="div">
          <strong>Name:</strong> {order.user.name}<br/>
          <strong>Email:</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a><br/>
          <strong>Address: </strong>{order.shippingAddress.address},<br/> {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
      </Typography>
      {order.isDelivered ? <>
        <Alert severity="success" >
          delivered on {new Date(order.deliveredAt).toDateString()}
      </Alert>
      </>:<>
      <Alert severity="error">
       Not Delivered
      </Alert>
      </> }
      </div>
      <Divider  />
      <div style={{marginTop:'1rem'}}>
      <Typography variant="h5" gutterBottom sx={{fontFamily: 'Poppins', fontWeight: '600', letterSpacing:1.3}} component="div">
          Payment Method
      </Typography>
      <Typography variant="body2" gutterBottom sx={{fontSize:'16px',fontFamily: 'Poppins', letterSpacing:1.1}} component="div">
          {order.paymentMethod}
      </Typography>
      {order.isPaid ? <>
        <Alert severity="success" >
           Paid on {new Date(order.paidAt).toDateString()}
      </Alert>
      </>:<>
      <Alert severity="error">
       Not Paid
      </Alert>
      </> }
      </div>
      <Divider  />
      </div>
      <div style={{marginTop:'2rem'}}>
      {order.orderItems.length>0 && (
          <Grid item xs={12} sm={8}>
          <Typography variant="h5" gutterBottom sx={{fontFamily: 'Poppins', fontWeight: '600', letterSpacing:1.3}} component="div">
          YOUR SHOPPING CART
          </Typography>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }} >
            {order.orderItems.map(item=>{
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
            ${order.itemsPrice}
          </Typography>
          </div>
          <div style={{display: 'flex',justifyContent:'space-between', border: '1px solid #b3b3b3', padding: '0.7rem 0'}}>
          <Typography variant="h6" sx={{fontFamily: 'Poppins',marginLeft:'2rem', fontWeight:'500'}}>
            Shipping:
          </Typography>
          <Typography variant="h6" sx={{fontFamily: 'Poppins',marginRight:'2rem', fontWeight:'500'}}>
            ${order.shippingPrice}.00
          </Typography>
          </div>
          <div style={{display: 'flex',justifyContent:'space-between', border: '1px solid #b3b3b3', padding: '0.7rem 0'}}>
          <Typography variant="h6" sx={{fontFamily: 'Poppins',marginLeft:'2rem', fontWeight:'500'}}>
            Tax:
          </Typography>
          <Typography variant="h6" sx={{fontFamily: 'Poppins',marginRight:'2rem', fontWeight:'500'}}>
           ${ order.taxPrice}
          </Typography>
          </div>
          <div style={{display: 'flex',justifyContent:'space-between', border: '1px solid #b3b3b3', padding: '0.7rem 0'}}>
          <Typography variant="h6" sx={{fontFamily: 'Poppins',marginLeft:'2rem', fontWeight:'500'}}>
            Total:
          </Typography>
          <Typography variant="h6" sx={{fontFamily: 'Poppins',marginRight:'2rem', fontWeight:'500'}}>
            ${order.totalPrice}
          </Typography>
          </div>
          {!order.isPaid && <div style={{display: 'flex',justifyContent:'space-around', border: '1px solid #b3b3b3', padding: '1rem 0 0 0'}}>
              <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
          </div>}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && <div style={{display: 'flex',justifyContent:'space-around', border: '1px solid #b3b3b3', padding: '1rem 0 0 0'}}>
            {/* <button onClick={deliverHandler} style={{backgroundColor:'#000', color:'#fff', width:'95%',height:'3rem', fontFamily:'Poppins', fontSize:'16px', display:'flex', alignItems:'center', gap:'1rem', justifyContent:'center', cursor:'pointer' }}>Mark as Delivered</button> */}
            <Button onClick={deliverHandler} startIcon={<PointOfSaleIcon/>} variant="contained" disableElevation sx={{width:'90%', backgroundColor:'#000', borderRadius:'2px', height:'3.5rem', fontFamily:'Poppins', fontWeight:'700', fontSize:'16px', marginBottom:'1rem'}}>Mark as Delivered</Button>
            </div>}
          </div>
          
        </Grid>
      </Grid>
      </div>
    </div>
  )
}

export default OrderScreen 