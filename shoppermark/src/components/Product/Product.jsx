import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  CardActionArea } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom';

const Product = ({product})=> {
  const history = useHistory();

  const handleCardClick = ()=>{
    history.push(`/product/${product._id}`);
  }
  return (
    // <Card sx={{ maxWidth: 345 }}>
    //   <CardActionArea sx={{ height: 340 }} onClick={handleCardClick}>
    //     <CardMedia
    //       component="img"
    //       height="140"
    //       image={product.image}
    //       alt="green iguana"
    //     />
    //     <CardContent>
    //       <Typography gutterBottom variant="h6" sx={{fontFamily: 'Poppins'}} component="div">
    //         {product.name}
    //       </Typography>
    //       <Typography gutterBottom variant="h7" sx={{fontFamily: 'Varela Round', fontWeight:'700'}} component="div">
    //       <Rating name="read-only" value={product.rating} precision={0.5} size="small"  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} readOnly />
    //       <Box sx={{ ml: 2 }}>{`${product.numReviews} reviews`}</Box>
    //       </Typography>
    //       <Typography gutterBottom variant="h5" sx={{fontFamily: 'Poppins', fontWeight:'700'}} component="div">
    //         ${product.price}
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    // </Card>
    <div className="product-card">
  <div className="product-tumb">
    <img src={product.image} alt="" />
  </div>
  <div className="product-details">
    <span className="product-catagory">{product.category}</span>
    <h4 style={{cursor:'pointer'}} onClick={handleCardClick}>
      <p>{product.name}</p>
    </h4>
    <Typography gutterBottom variant="h7" sx={{fontFamily: 'Varela Round', fontWeight:'700'}} component="div">
          <Rating name="read-only" value={product.rating} precision={0.5} size="small"  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} readOnly />
          <Box sx={{ color:'#ccc' }}>{`${product.numReviews} reviews`}</Box>
           </Typography>
    <div className="product-bottom-details">
      <div className="product-price">
        <small>${Math.floor(product.price+20)}</small>${product.price}
      </div>
      <div className="product-links">
        <a href="">
          <i className="fa fa-heart" />
        </a>
        <a href="">
          <i className="fa fa-shopping-cart" />
        </a>
      </div>
    </div>
  </div>
</div>
  );
}

export default Product