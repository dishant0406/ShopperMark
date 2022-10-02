import React, {useState, useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile  } from '../../store/actions/userActions'
import { listMyOrders } from '../../store/actions/orderActions'

//Material UI
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { ORDER_LIST_MY_RESET } from '../../store/constants/orderConstants'
import TitleHelmet from '../../components/TitleHelmet/TitleHelmet';

const UserProfile = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cfpassword, setCfpassword] = useState('')
  const [name, setName] = useState('')
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const isMounted = React.useRef(false);
  
  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const {loading, error, user} = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo} = userLogin
  
  const userUpdateProfile = useSelector(state => state.userUpdateProfiles)
  const { success} = userUpdateProfile

  const orderListMy = useSelector(state => state.orderListMy)
  const {loading:loadingOrders, error:errorOrders, orders} = orderListMy

  const history = useHistory();




  useEffect(() => {
    if(!userInfo){
      history.push('/login')
    }
    else{
      dispatch({type:ORDER_LIST_MY_RESET})
      dispatch(listMyOrders())
      if(!user.name || user._id !== userInfo._id){
        
        dispatch(getUserDetails('profile'))
      }else{
        console.log(user)
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [userInfo, history, user]);
  

  const submitHandler = (e)=>{ 
    e.preventDefault();
    if(password===cfpassword){
      //!DISPATCH UPDATED USER
      dispatch(updateUserProfile({name, email, password}))
      
    }

    if(password!==cfpassword){
      setOpen(true)
    }
  }

  React.useEffect(() => {
    if(isMounted.current){
      if(success){
        setOpen2(true)
        setCfpassword('')
        setPassword('')
      }
    }
    else{
      isMounted.current = true
    }
  }, [success]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setOpen2(false);
  };

  if(loading){
    return (
      
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit"/>
        </Backdrop>
      
    );
  }

  return (
    <div className="login">
       <TitleHelmet title={`ShopperMark | My Profile `} desc='Edit'/>
      {error &&   <Alert severity="error" variant="filled">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                  </Alert>}
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center', }} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Password does not match
        </Alert>
      </Snackbar>
      <Snackbar open={open2} anchorOrigin={{ vertical: 'top', horizontal: 'center', }} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Profile Updated Successfully
        </Alert>
      </Snackbar>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <span className="material-icons"><AccountCircleIcon sx={{fontSize:'75px'}}/></span>
          <div className="heading">User Profile</div>
      </div>
      <Grid container spacing={2} justifyContent="space-around">
     
      <Grid item xs={12} sm={5}>
      <div className="loginform">

        <form className="login-form" onSubmit={submitHandler}>
          
          <input type="text" placeholder="Full Name" required value={name} onChange={e=> setName(e.target.value.replaceAll(' ',''))} />
          <input type="text" placeholder="Email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={email} onChange={e=> setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e=> setPassword(e.target.value)} required />
          <input type="text" placeholder="Confirm Password" value={cfpassword} onChange={e=> setCfpassword(e.target.value)} required />
          <button>Update</button>
        </form>  
      </div>
      </Grid>
      <Grid item xs={12} sm={7}>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:'700px'}}>
          <div className="" style={{fontSize:'2rem', marginBottom:'0.5rem',fontWeight:500}}>MY ORDERS</div>
      </div>
      <List sx={{ width: '100%',maxWidth: 800,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 400,}}  >
        {orders && orders.map((order)=>{
          console.log(order)
          return (
              <ListItem secondaryAction={
                <IconButton onClick={()=> history.push(`/order/${order._id}`)} edge="end" aria-label="comments">
                  <InfoIcon sx={{color:'#fff'}} />
                </IconButton>
              } divider={true} sx={{backgroundColor:'#2C3238', marginBottom:'1rem', borderRadius:'2px',}}  alignItems="flex-start">
             
              <ListItemText
              primaryTypographyProps={{fontFamily:'Poppins', fontWeight:'500', fontSize:'18px', color:'#fff'}} 
                primary={`ID: ${order._id.substring(0,10)}...`}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline', fontFamily: 'Poppins', fontSize:'16px', fontWeight:'600'}}
                      component="span"
                      variant="body2"
                      color="#fff"
                    >
                     Created At: {order.createdAt.substring(0,10)}
                    </Typography>
                    
                  </React.Fragment>
                }
              />
              <ListItemText
              primaryTypographyProps={{fontFamily:'Poppins', fontWeight:'500', fontSize:'18px', color:'#fff'}} 
                primary={''}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline', fontFamily: 'Poppins', fontSize:'16px', fontWeight:'600'}}
                      component="span"
                      variant="body2"
                      color="#fff"
                    >
                     {order.isPaid?`Payed on ${order.paidAt.substring(0,10)}`:"Not Paid"}
                    </Typography>
                    <br/><br/>
                    <Typography
                      sx={{ display: 'inline', fontFamily: 'Poppins', fontSize:'16px', fontWeight:'600'}}
                      component="span"
                      variant="body2"
                      color="#fff"
                    >
                     {order.isDelivered?`Delivered on ${order.deliveredAt.substring(0,10)}`:"Not Delivered"}
                    </Typography>
                    
                  </React.Fragment>
                }
              />  
            </ListItem>
             
            
          
          )
        })}
        </List>
      </Grid>
      </Grid>
    </div>

  )
}

export default UserProfile