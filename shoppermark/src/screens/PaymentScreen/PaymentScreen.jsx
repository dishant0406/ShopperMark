import React, {useState, useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../../store/actions/cartAction';

//Material UI
import PaymentsIcon from '@mui/icons-material/Payments';
import ShippingBreadCrumb from './BreadCrumb';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const PaymentScreen = () => {
  const history = useHistory();
  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart

  if(!shippingAddress){
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('Paypal')
  
  const disptach = useDispatch()

  const submitHandler = (e)=>{ 
    e.preventDefault()
    disptach(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };



  return (
    <div className="login">
      <ShippingBreadCrumb/>
      <div className="loginform">
        <form className="login-form" onSubmit={submitHandler}>
          <span className="material-icons"><PaymentsIcon sx={{fontSize:'75px'}}/></span>
          <div className="heading">Payment</div>
          <div style={{margin:'3rem 0'}}>
          <FormControl>
           
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={paymentMethod}
              onChange={handleChange}
            >
              <FormControlLabel value="Paypal" control={<Radio />} label="Paypal or Credit Card" />
              {/* <FormControlLabel value="Stripe" control={<Radio />} label="Stripe" /> */}
            </RadioGroup>
          </FormControl>
          </div>
          <button>Continue</button>
        </form>  
      </div>
    </div>

  )
}

export default PaymentScreen