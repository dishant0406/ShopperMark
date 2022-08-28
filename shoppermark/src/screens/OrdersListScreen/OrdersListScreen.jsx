import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useSelector, useDispatch } from 'react-redux';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CancelIcon from '@mui/icons-material/Cancel';
import { deleteUsers, listUsers } from '../../store/actions/userActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { listAllOrders } from '../../store/actions/orderActions';
import PaidIcon from '@mui/icons-material/Paid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';

export default function OrdersListScreen() {
  const history = useHistory()
  
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);

  const {loading, error, orders} = orderList;
  
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;


  React.useEffect(()=>{
    if(userInfo && userInfo.isAdmin){
      dispatch(listAllOrders());
    }
    else{
      history.push('/login') 
    }
  },[])




  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', bgcolor: 'background.paper' }}>
      <div style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
        <p style={{fontFamily:'Poppins', fontSize:'24px', fontWeight:'700'}}>All Orders</p>
        <button style={{backgroundColor:'#000', color:'#fff', width:'12rem',height:'3rem', fontFamily:'Poppins', fontSize:'16px', display:'flex', alignItems:'center', gap:'1rem' }}><AddCircleIcon sx={{color:'#fff', marginLeft:'1rem'}}/> Create Order</button>
      </div>
      <nav aria-label="main mailbox folders">
        <List>
        <ListItem >
                <>
                <ListItemIcon sx={{width:'50px'}}>
                  <PaidIcon sx={{color:'#90ee90'}} />
                </ListItemIcon>
                <ListItemText sx={{width:'100px'}}  primary={'ID'} />
                <ListItemText sx={{width:'100px'}}  primary={"Price ( in $ )"} />
                <ListItemText sx={{width:'100px'}}  primary={'Created At'} />
                <ListItemText sx={{width:'100px'}}  primary={'Paid at'} />
                <ListItemText sx={{width:'100px'}}  primary={'Delivered'} />
                <ListItemText sx={{width:'100px'}}  primary={'Info'} />
              </>
              </ListItem>
            {orders?.map((u)=>{
                return <ListItem >
                <>
                <ListItemIcon sx={{width:'50px'}}>
                  <PaidIcon sx={{color:'#90ee90'}} />
                </ListItemIcon>
                <ListItemText sx={{width:'100px'}}  primary={`${u._id.slice(0,10)}...`} />
                <ListItemText sx={{width:'100px'}}  primary={`${u.totalPrice}`} />
                <ListItemText sx={{width:'100px'}}  primary={new Date(u.createdAt).toDateString()} />
                <ListItemText sx={{width:'100px'}}  primary={u.isPaid?new Date(u.paidAt).toDateString():'Not Paid yet'} />
                <ListItemIcon sx={{width:'165px'}}>
                  {u.isDelivered ? <VerifiedUserIcon sx={{color:'#90ee90'}} /> :<CancelIcon sx={{color:'red'}}/>}
                </ListItemIcon>
                <ListItemIcon sx={{width:'175px'}}>
                  <IconButton onClick={()=> history.push(`/order/${u._id}`)}>
                    <InfoIcon sx={{color:'#90ee90'}}/>
                  </IconButton>
                </ListItemIcon>
              </>
              </ListItem>
            })}
          
         
        </List>
      </nav>
      <Divider />
    </Box>
  );
}
