import React, {useState, useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/actions/userActions'
import './styles.css'

//Material UI
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import LockIcon from '@mui/icons-material/Lock';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import LoginBreadCrumb from './BreadCrumb'
import TitleHelmet from '../../components/TitleHelmet/TitleHelmet';

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {loading, error, userInfo} = userLogin
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
    dispatch((login(email, password)));
  }

  if(loading){
    return (
      
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit"/>
        </Backdrop>
      
    );
  }

  return (
    <div className="login">
       <TitleHelmet title={`ShopperMark | Login `} desc='Login'/>
      {redirect !== '' && <LoginBreadCrumb/>}
      {error &&   <Alert severity="error" variant="filled">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                  </Alert>}
      <div className="loginform">
        <form className="login-form" onSubmit={submitHandler}>
          <span className="material-icons"><LockIcon sx={{fontSize:'75px'}}/></span>
          <div className="heading">Login</div>
          <input type="text" placeholder="Email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={email} onChange={e=> setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e=> setPassword(e.target.value)} required />
          <button>login</button>
          <div className="headfooter">New Customer? <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}><strong>Register Here</strong></Link></div>
        </form>  
      </div>
    </div>

  )
}

export default LoginScreen