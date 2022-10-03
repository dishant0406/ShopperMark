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
import { useParams } from 'react-router-dom';
import Pageinate from '../../components/Pagination/Pageinate';
import TopProductCarousel from '../../components/Carousel/TopProductCarousel';
import TitleHelmet from '../../components/TitleHelmet/TitleHelmet';
import CssBaseline  from '@mui/material/CssBaseline';

const HomeScreen = ()=> {
  const dispatch = useDispatch()
  
  const productList = useSelector(state => state.productList)

  const {loading, products, error, page, pages} = productList

  const {keyword, pageNumber:pageNumberr} = useParams()

  const pageNumber = pageNumberr || 1

  React.useEffect(() => {
    console.log(keyword)
      dispatch(listProduct(keyword, pageNumber))

  }, [dispatch,keyword, pageNumber])
  
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
      <TitleHelmet title={'ShopperMark at your service'} desc={'Online Shopping website that you need'}/>
      {!keyword && <Typography variant="h4" align="center" sx={{fontFamily: 'Poppins', fontWeight:'700' }} gutterBottom component="div">
        TOP PRODUCTS
      </Typography>}
      {!keyword && <TopProductCarousel/>}
      <Typography variant="h4" align="center" sx={{fontFamily: 'Poppins', fontWeight:'700', marginTop:'1rem' }} gutterBottom component="div">
        Start Shopping
      </Typography>
      <Grid sx={{margin:'0'}} container spacing={2} align="center" justifyContent="center">
        {products.map(product =>{
          return <>
          <Grid sx={{marginBottom:'2rem'}} item xs={12} md={4} key={product._id}>
            <Product product={product}/>
          </Grid>
          </>
        })}
      </Grid>
      {pages>1 && <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'2rem'}}>
        <Pageinate page={page} pages={pages} keyword={keyword}/>
      </div>}
    </Box>
  );
}

export default HomeScreen