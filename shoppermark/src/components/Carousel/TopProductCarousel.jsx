import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { listTopProduct } from '../../store/actions/productActions';
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useHistory } from 'react-router-dom';


const TopProductCarousel = () => {
    const history = useHistory()
const dispatch = useDispatch()
const topRatedProducts = useSelector(state=>state.productTopRated)

const {error, loading, products} = topRatedProducts;

useEffect(()=>{

    dispatch(listTopProduct())

},[])

const handleClick = (id)=>{
    history.push(`/product/${id}`)
}
  return (
    <div>
        <Carousel animation='slide'>
            {
                products.map((p)=>{
                    return (
                        <div key={p._id} style={{height:'20rem', width:'100%',
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url(${p.image})`, backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center center'}}>
                            
                            <div style={{marginRight:'2rem', width:'100%',display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-around', height:"20rem"}}>
                                <p style={{fontSize:'2.5rem',fontWeight:'500', color:'#fff', fontFamily:'Poppins', textAlign:'center', lineHeight:'1',marginBottom:'0', marginTop:'0'}}>{p.name}</p>
                                <Rating sx={{marginBottom:'0', marginTop:'0'}} value={p.rating || 0} precision={0.5} size="large"  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} readOnly />
                                <Button onClick={()=>handleClick(p._id)}  startIcon={<AddShoppingCartIcon/>} disabled={p.countInStock <1} variant="contained" disableElevation sx={{width:'20rem', backgroundColor:'#fff', height:'3rem', color:'#000', fontWeight:'700', marginBottom:'0', marginTop:'0'}}>Buy Now</Button>
                            </div>
                        </div>
                    )
                })
            }
        </Carousel>
    </div>
  )
}

export default TopProductCarousel