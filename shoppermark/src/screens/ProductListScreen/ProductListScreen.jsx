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
import { deleteProduct } from '../../store/actions/productActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { listProduct } from '../../store/actions/productActions';
import PaidIcon from '@mui/icons-material/Paid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ProductListScreen() {
  const history = useHistory()
  
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const {loading, error, products} = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete;
  
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;


  React.useEffect(()=>{
    if(userInfo && userInfo.isAdmin){
      dispatch(listProduct());
    }
    else{
      history.push('/login') 
    }
  },[successDelete])

  const handleDelete = (id)=>{
    //delete product
    dispatch(deleteProduct(id))
  }

  const createProductHandler = ()=>{}

  if(loadingDelete){
    return (
      
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loadingDelete}>
        <CircularProgress color="inherit"/>
        </Backdrop>
      
    );
  }

  if(loading){
    return (
      
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit"/>
        </Backdrop>
      
    );
  }


  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', bgcolor: 'background.paper' }}>
       {errorDelete &&   <Alert severity="error" variant="filled">
                    <AlertTitle>Error</AlertTitle>
                    {errorDelete}
                  </Alert>}
      <div style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
        <p style={{fontFamily:'Poppins', fontSize:'24px', fontWeight:'700'}}>All Products</p>
        <button onClick={createProductHandler} style={{backgroundColor:'#000', color:'#fff', width:'13rem',height:'3rem', fontFamily:'Poppins', fontSize:'16px', display:'flex', alignItems:'center', gap:'1rem' }}><AddCircleIcon sx={{color:'#fff', marginLeft:'1rem'}}/>Create Product</button>
      </div>
      <nav aria-label="main mailbox folders">
        <List>
        <ListItem >
                <>
                <ListItemIcon sx={{width:'50px'}}>
                  <PaidIcon sx={{color:'#90ee90'}} />
                </ListItemIcon>
                <ListItemText sx={{width:'100px'}}  primary={'ID'} />
                <ListItemText sx={{width:'150px', marginRight:'2rem'}}  primary={"Name"} />
                <ListItemText sx={{width:'100px'}}  primary={'Price (in $)'} />
                <ListItemText sx={{width:'100px'}}  primary={'Category'} />
                <ListItemText sx={{width:'100px'}}  primary={'Brand'} />
                <ListItemText sx={{width:'100px'}}  primary={'Controls'} />
              </>
              </ListItem>
            {products?.map((u)=>{
                return <ListItem key={u._id}>
                <>
                <ListItemIcon sx={{width:'50px'}}>
                  <PaidIcon sx={{color:'#90ee90'}} />
                </ListItemIcon>
                <ListItemText sx={{width:'100px'}}  primary={`${u._id.slice(0,10)}...`} />
                <ListItemText sx={{width:'150px', marginRight:'2rem'}}  primary={`${u.name}`} />
                <ListItemText sx={{width:'100px'}}  primary={`${u.price}`} />
                <ListItemText sx={{width:'100px'}}  primary={u.category} />
                <ListItemIcon sx={{width:'165px'}}>
                  {u.brand}
                </ListItemIcon>
                <ListItemIcon sx={{width:'175px'}}>
                  <IconButton onClick={()=> history.push(`/admin/${u._id}/edit`)}>
                    <EditIcon sx={{color:'#90ee90'}}/>
                  </IconButton>
                  <IconButton onClick={()=>handleDelete(u._id)}>
                    <DeleteIcon sx={{color:'red'}}/>
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
