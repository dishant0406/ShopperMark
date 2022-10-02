import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { singleProduct, updateProduct } from '../../store/actions/productActions'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


//Material UI
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import LockIcon from '@mui/icons-material/Lock';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import Checkbox from '@mui/material/Checkbox';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { PRODUCT_UPDATE_RESET, PRODUCT_RESET } from '../../store/constants/productConstants';
import TitleHelmet from '../../components/TitleHelmet/TitleHelmet';

const ProductEditScreen = () => {
  const [open, setOpen] = React.useState(false);

  //states
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStocks] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)


  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails
  
  const productUpdate = useSelector(state => state.productUpdate)
  const {loading:loadingUpdate, error:errorUpdate, success:successUpdate, product:updatedProduct} = productUpdate

  

  const history = useHistory();
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery()
  const {id} = useParams()


  

  useEffect(() => {
    if(successUpdate){
      dispatch({type:PRODUCT_UPDATE_RESET})
      dispatch({type:PRODUCT_RESET})
      history.push('/admin/productlist')
    }
    else{

        if(!product || !product.name || product._id !== id){
          dispatch(singleProduct(id))
        }
        else{
          setName(product.name)
          setPrice(product.price)
          setImage(product.image)
          setBrand(product.brand)
          setCategory(product.category)
          setCountInStocks(product.countInStock)
          setDescription(product.description)

        }
    }
    
  }, [product,id,successUpdate]);
  

  const submitHandler = (e)=>{ 
    e.preventDefault()
    dispatch(updateProduct({id:product._id, name, price, image, brand, category, countInStock, description}))
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  

  const handleChange = (event) => {
    setisAdmin(event.target.checked);
  };

  if(loading){
    return (
      
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit"/>
        </Backdrop>
      
    );
  }

  const uploadfileHandler = async (e)=>{
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try{
      const config = {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }
      const {data} = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    }
    catch(err){
      console.log(err)
      setUploading(false)
    }
  }

  return (
    <div className="login">
       <TitleHelmet title={`Edit | ${name} `} desc='Edit Product'/>
      {(loading || loadingUpdate) && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit"/>
        </Backdrop>}
      {error &&   <Alert severity="error" variant="filled">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                  </Alert>}
      {errorUpdate &&   <Alert severity="error" variant="filled">
                    <AlertTitle>Error</AlertTitle>
                    {errorUpdate}
                  </Alert>}
      <div style={{marginTop:'-3rem'}} className="loginform">
        <form className="login-form" onSubmit={submitHandler}>
          <span className="">
            <img src={image} alt="product" style={{width:'10rem',height:'10rem', borderRadius:'50%', border:'1px solid #f0f0f0'}} />
          </span>
          <div className="heading">Edit Product</div>
          <input type="text" placeholder="Full Name" required value={name} onChange={e=> setName(e.target.value)} />
          <input type="number" placeholder="Price" required value={price} onChange={e=> setPrice(e.target.value)} />
          <input type="text" placeholder="Brand" required value={brand} onChange={e=> setBrand(e.target.value)} />
          <input type="file" id="upload" class="custom-file-input" onChange={uploadfileHandler}/>
          <input type="text" placeholder="Category" required value={category} onChange={e=> setCategory(e.target.value)} />
          <input type="text" placeholder="Count in Stocks" required value={countInStock} onChange={e=> setCountInStocks(e.target.value)} />
          <input type="text" placeholder="Description" required value={description} onChange={e=> setDescription(e.target.value)} />

          
          
          <button onClick={submitHandler}>Update</button>
          
        </form>  
      </div>
    </div>

  )
}

export default ProductEditScreen