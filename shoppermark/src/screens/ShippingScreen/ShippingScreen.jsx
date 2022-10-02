import React, {useState, useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../../store/actions/cartAction';

//Material UI
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ShippingBreadCrumb from './BreadCrumb';
import TitleHelmet from '../../components/TitleHelmet/TitleHelmet';

const ShippingScreen = () => {
  const history = useHistory();
  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const disptach = useDispatch()

  const submitHandler = (e)=>{ 
    e.preventDefault()
    disptach(saveShippingAddress({address, city, postalCode, country}))
    history.push('/payment')
  }



  return (
    <div className="login">
       <TitleHelmet title={`ShopperMark | Shipping `} desc='Shipping'/>
      <ShippingBreadCrumb/>
      <div className="loginform">
        <form className="login-form" onSubmit={submitHandler}>
          <span className="material-icons"><LocalShippingIcon sx={{fontSize:'75px'}}/></span>
          <div className="heading">Shipping</div>
          <input type="text" placeholder="Address" required value={address} onChange={e=> setAddress(e.target.value)} />
          <input type="text" placeholder="City" required value={city} onChange={e=> setCity(e.target.value)} />
          <input type="text" placeholder="Postal Code" required value={postalCode} onChange={e=> setPostalCode(e.target.value)} />
          <input type="text" placeholder="Country" required value={country} onChange={e=> setCountry(e.target.value)} />

          <button>Continue</button>
        </form>  
      </div>
    </div>

  )
}

export default ShippingScreen