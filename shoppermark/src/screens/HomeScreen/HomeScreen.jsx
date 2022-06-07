import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Product from '../../components/Product/Product';
import axios from 'axios';

const HomeScreen = ()=> {
  const [products, setProducts] = React.useState([])

  React.useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('/api/products')
      setProducts(res.data)
    }

    fetchProducts()
  }, [])
  

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