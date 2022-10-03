import React from 'react'
import {NavLink, useParams, useHistory, Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Divider, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector} from 'react-redux'
import {createProductReview, singleProduct} from '../../store/actions/productActions'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CommentIcon from '@mui/icons-material/Comment';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../store/constants/productConstants';
import TitleHelmet from '../../components/TitleHelmet/TitleHelmet';
import Zoom from 'react-img-zoom'

const ProductScreen = () => {
  const [qty, setQty] = React.useState(1);
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const [hover, setHover] = React.useState(-1);

  const dispatch = useDispatch()
  const history = useHistory();

  const productDetails  = useSelector(state=> state.productDetails)

  const {loading, product, error} = productDetails

  const productReviewCreate  = useSelector(state=> state.productReviewCreate)

  const {success:successProductReview, error:errorProductReview} = productReviewCreate

  const userLogin  = useSelector(state=> state.userLogin)

  const {userInfo} = userLogin
  
  const {id} = useParams()

  React.useEffect(() => {
    if(successProductReview){
      alert('Review Added')
      setRating(0)
      setComment('')
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }
    dispatch(singleProduct(id))
  }, [dispatch, id, successProductReview])

  const handleChange = (event) => {
    setQty(event.target.value);
  };

  const addToCartHandler = ()=>{
    history.push(`/cart/${id}?qty=${qty}`);
  }

  const commentHandler = ()=>{
    dispatch(createProductReview(id, {rating, comment}))
  }

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

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  
    return (
      <>
       <TitleHelmet title={product.name} desc={product.name}/>
      <NavLink to='/'>
      <Button sx={{color: '#000', marginBottom:'0.5rem'}} startIcon={<ArrowBackIcon />}>Go Back</Button>
      </NavLink>
      <Container>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <div style={{display:'flex', height:'100%', width:'30rem',overflow:'hidden', alignItems: 'center', justifyContent: 'center'}}>
            {/* <img src={product.image} style={{height:'30rem'}} /> */}
            <Zoom
              img={product.image}
              zoomScale={3}
              width={480}
              height={480}
            />
            </div>
          </Grid>
          <Grid item xs={12} sm={3}>
          <Typography variant="h4" sx={{fontFamily: 'Poppins', lineHeight:1.1, fontWeight: '500',marginBottom:'0.7rem'}} gutterBottom>{product.name}</Typography>
          <Divider />
          
          <Typography gutterBottom variant="h7" sx={{fontFamily: 'Varela Round', marginBottom:'0.7rem',marginTop:'0.7rem', fontWeight:'700'}} component="div">
            <Rating value={product.rating || 0} precision={0.5} size="large"  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} readOnly />
            <Box sx={{ ml: 2 }}>{`${product.numReviews} reviews`}</Box>
            </Typography>
            <Divider />
          <Typography gutterBottom variant="h5" sx={{fontFamily: 'Poppins', fontWeight:'700', marginBottom:'0.7rem',marginTop:'0.7rem'}} component="div">
              ${product.price}
            </Typography>
            <Divider />
          <Typography variant="subtitle1" sx={{fontFamily: 'Poppins',marginTop:'0.7rem'}} gutterBottom >{product.description}</Typography>            
          </Grid>
          <Grid item xs={12} sm={3}>
            <div>
              <div style={{display: 'flex',justifyContent:'space-around', border: '1px solid #b3b3b3', padding: '0.7rem 0'}}>
                <Typography variant="h7" sx={{fontFamily: 'Poppins'}}>Price:</Typography>
                <Typography variant="h7" sx={{fontFamily: 'Poppins'}}>${product.price}</Typography>
              </div>
              <div style={{display: 'flex',justifyContent:'space-around', border: '1px solid #b3b3b3', padding: '0.7rem 0'}}>
                <Typography variant="h7" sx={{fontFamily: 'Poppins'}}>Stock:</Typography>
                <Typography variant="h7" sx={{fontFamily: 'Poppins'}}>{product.countInStock >0 ? 'In Stock' : 'Out of stock'}</Typography>
              </div>
              {product.countInStock>0 && (
                <div style={{display: 'flex',justifyContent:'space-around', border: '1px solid #b3b3b3', padding: '0.7rem 0', alignItems: 'center'}}>
                <Typography variant="h7" sx={{fontFamily: 'Poppins'}}>Quantity:</Typography>
                <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
                <InputLabel id="demo-select-small">Qty</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={qty}
                  onChange={handleChange}
                  label="Age"
                >
                  {
                    [...Array(product.countInStock).keys()].map((x)=>{
                      return <MenuItem key={x+1} value={x+1}>{x+1}</MenuItem>
                    })
                  }
                </Select>
                </FormControl>
              </div>
              )}
              <div  style={{display: 'flex',justifyContent:'space-around', border: '1px solid #b3b3b3', padding: '0.7rem 0'}}>
              <Button onClick={addToCartHandler} startIcon={<AddShoppingCartIcon/>} disabled={product.countInStock <1} variant="contained" disableElevation sx={{width:'90%', backgroundColor:'#000'}}>Add to Cart</Button>
              </div>
            </div>
            <div id='style-3' style={{height:'20rem', padding:'0 0 0.5rem 0', marginTop:'0.5rem', overflowY:'scroll'}}>
            <Typography gutterBottom variant="h5" sx={{fontFamily: 'Poppins', fontWeight:'700', marginBottom:'0.7rem', textAlign:'center', borderTop:'1px solid #000', paddingTop:'0.5rem', marginTop:'1rem'}} component="div">
              Reviews
            </Typography>
            {product.reviews.length === 0 && <Alert severity="info">No Reviews Available</Alert>}
            {product.reviews.length > 0 && <div>
              {product.reviews.map((review)=>{
                return <div key={review._id} style={{border:'1px solid #000', padding:'0.5rem', width:'95%', marginBottom:'0.5rem'}}>
                  <Typography gutterBottom sx={{fontFamily: 'Poppins', fontWeight:'500', }} component="div">
                  {review.name}
                  </Typography>
                  <div style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                  <Rating value={review.rating || 0} precision={0.5} size="small"  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} readOnly />
                  <Typography gutterBottom variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight:'200', marginTop:'0.4rem', }} component="div">
                  {new Date(review.createdAt).toDateString().substring(4)}
                  </Typography>
                  </div>
                  <Typography gutterBottom variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight:'200', marginBottom:'0.2rem', }} component="div">
                  {review.comment}
                  </Typography>
                </div>
              })}
              </div>}
              <div>
              <Typography gutterBottom variant="h7" sx={{fontFamily: 'Poppins', fontWeight:'700', marginBottom:'0.7rem', textAlign:'center', borderTop:'1px solid #000', paddingTop:'0.5rem', marginTop:'1rem'}} component="div">
              Write a Customer Review
            </Typography>
            {errorProductReview && <Alert severity="error">{errorProductReview}</Alert>}
            {userInfo ? (<div>
              <Typography gutterBottom variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight:'500', marginBottom:'0.1rem',textAlign:'center' }} component="div">
                  Select Rating
                  </Typography>
              <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginBottom:'0.7rem',
        justifyContent:'center',
        flexDirection:'column'
      }}
    >
      <Rating
        name="hover-feedback"
        value={rating}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {rating !== 0 && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
      ) }
    </Box>
             <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
             <TextField value={comment} onChange={(e)=>setComment(e.target.value)} id="outlined-basic" sx={{width:'90%'}} label="Enter Comment" variant="outlined" />
              <Button onClick={commentHandler} startIcon={<CommentIcon/>} variant="contained" disableElevation sx={{width:'90%', backgroundColor:'#000', marginTop:'0.5rem'}}>Comment</Button>
             </div>
            </div>
            ) : <Alert severity="info">Please <Link to="/login">Sign In</Link> to write a review</Alert>}
              </div>
            </div>
          </Grid>
          
        </Grid>
      </Container>
      </>
    )
  
}

export default ProductScreen