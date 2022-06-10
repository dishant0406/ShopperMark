import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { addToCart } from '../../store/actions/cartAction';
import {useHistory, useLocation, useParams} from 'react-router-dom'

//material ui import
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const CartScreen = () => {
  const history = useHistory();
  const {id} = useParams();
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();

  const qty = +query.get('qty')

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)

  const {cartItems} = cart
  

  React.useEffect(() => {
    if(id){
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])
  

  const removeFromCartHandler = (id)=>{
    console.log('remove', id)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} sm={7}>
        <Typography variant="h4" gutterBottom sx={{fontFamily: 'Poppins', fontWeight: '600', letterSpacing:1.3}} component="div">
        YOUR SHOPPING CART
        </Typography>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }} >
          {cartItems.map(item=>{
            return <ListItem key={item.product} alignItems="flex-start">
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
                    ${item.price}
                  </Typography>
                </React.Fragment>
              }
            />
            <div style={{display: 'flex', gap:'1rem', alignItems: 'center', justifyContent: 'center'}}>
            <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
                <InputLabel id="demo-select-small">Qty</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={item.qty}
                  onChange={e=> dispatch(addToCart(item.product, +e.target.value))}
                  label="Age"
                >
                  {
                    [...Array(item.countInStock).keys()].map((x)=>{
                      return <MenuItem key={x+1} value={x+1}>{x+1}</MenuItem>
                    })
                  }
                </Select>
                </FormControl>
                <IconButton aria-label="comment" onClick={()=> removeFromCartHandler(item.product)}>
                <DeleteIcon sx={{color:'#0f0f0f'}}/>
              </IconButton>
              </div>
          </ListItem>
          })}
        </List>


        </Grid>
        <Grid item xs={12} sm={5}>
          <div>
          <div style={{display: 'flex',justifyContent:'space-around', border: '1px solid #b3b3b3', padding: '0.7rem 0'}}>
          <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight:'500'}}>
            Cart Subtotal ({cartItems.reduce((acc, item)=> acc+item.qty, 0)}) Items
          </Typography>
          </div>
          <div style={{display: 'flex',justifyContent:'space-around', border: '1px solid #b3b3b3', padding: '0.7rem 0'}}>
          <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight:'500'}}>
            Total:
          </Typography>
          <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight:'500'}}>
             ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
          </Typography>
          </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CartScreen