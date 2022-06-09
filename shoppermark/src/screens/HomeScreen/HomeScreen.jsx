import * as React from 'react';
import { useDispatch, useSelector} from 'react-redux'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import Product from '../../components/Product/Product';
import {listProduct} from '../../store/actions/productActions'
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const HomeScreen = ()=> {
  const dispatch = useDispatch()
  
  const productList = useSelector(state => state.productList)

  const {loading, products, error} = productList

  React.useEffect(() => {

      dispatch(listProduct())

  }, [dispatch])
  
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
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" align="center" sx={{fontFamily: 'Varela Round', fontWeight:'500' }} gutterBottom component="div">
        TODAYS SPECIAL
      </Typography>
      <Grid container spacing={2} align="center" justifyContent="center">
        {products.map(product =>{
          return <Grid item xs={12} md={4} key={product._id}>
            <Product product={product}/>
          </Grid>
        })}
      </Grid>
    </Box>
  );
}

export default HomeScreen