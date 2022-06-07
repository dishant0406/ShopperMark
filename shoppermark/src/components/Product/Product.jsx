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
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea sx={{ height: 340 }} onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" sx={{fontFamily: 'Poppins'}} component="div">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h7" sx={{fontFamily: 'Varela Round', fontWeight:'700'}} component="div">
          <Rating name="read-only" value={product.rating} precision={0.5} size="small"  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} readOnly />
          <Box sx={{ ml: 2 }}>{`${product.numReviews} reviews`}</Box>
          </Typography>
          <Typography gutterBottom variant="h5" sx={{fontFamily: 'Poppins', fontWeight:'700'}} component="div">
            ${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Product