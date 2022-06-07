import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import products from '../../dummyassets/products'
import Product from '../../components/Product/Product';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  fontFamily: 'Poppins',
  color: theme.palette.text.secondary,
}));

const HomeScreen = ()=> {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" align="center" sx={{fontFamily: 'Poppins', fontWeight:'500' }} gutterBottom component="div">
        LATEST PRODUCTS
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