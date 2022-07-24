import React, {useState, useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../store/actions/userActions'
import './styles.css'

//Material UI
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import LockIcon from '@mui/icons-material/Lock';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cfpassword, setCfpassword] = useState('')
  const [name, setName] = useState('')
  const [open, setOpen] = React.useState(false);
  
  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
  const {loading, error, userInfo} = userRegister
  const history = useHistory();
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();

  const redirect = query.get('redirect') ? query.get('redirect') : '';

  useEffect(() => {
    if(userInfo){
      history.push(redirect)
    }
  }, [userInfo, redirect, history]);
  

  const submitHandler = (e)=>{ 
    e.preventDefault();
    if(password===cfpassword){
      dispatch((register(name, email, password)));
    }

    if(password!==cfpassword){
      setOpen(true)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if(loading){
    return (
      
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit"/>
        </Backdrop>
      
    );
  }

  return (
    <div className="login">
      {error &&   <Alert severity="error" variant="filled">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                  </Alert>}
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center', }} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Password does not match
        </Alert>
      </Snackbar>
      <div className="loginform">
        <form className="login-form" onSubmit={submitHandler}>
          <span className="material-icons"><LockIcon sx={{fontSize:'75px'}}/></span>
          <div className="heading">Register</div>
          <input type="text" placeholder="Full Name" required value={name} onChange={e=> setName(e.target.value.replaceAll(' ',''))} />
          <input type="text" placeholder="Email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={email} onChange={e=> setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e=> setPassword(e.target.value)} required />
          <input type="text" placeholder="Confirm Password" value={cfpassword} onChange={e=> setCfpassword(e.target.value)} required />
          <button>register</button>
          <div className="headfooter">Already a Customer? <Link to={redirect ? `/login?redirect=${redirect}`: '/login'}><strong>Login Here</strong></Link></div>
        </form>  
      </div>
    </div>

  )
}

export default RegisterScreen