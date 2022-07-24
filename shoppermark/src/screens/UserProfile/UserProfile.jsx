import React, {useState, useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile  } from '../../store/actions/userActions'

//Material UI
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';

const UserProfile = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cfpassword, setCfpassword] = useState('')
  const [name, setName] = useState('')
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const isMounted = React.useRef(false);
  
  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const {loading, error, user} = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo} = userLogin
  
  const userUpdateProfile = useSelector(state => state.userUpdateProfiles)
  const { success} = userUpdateProfile

  const history = useHistory();




  useEffect(() => {
    if(!userInfo){
      history.push('/login')
    }
    else{
      if(!user.name){
        dispatch(getUserDetails('profile'))
      }else{
        console.log(user)
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [userInfo, history, user]);
  

  const submitHandler = (e)=>{ 
    e.preventDefault();
    if(password===cfpassword){
      //!DISPATCH UPDATED USER
      dispatch(updateUserProfile({name, email, password}))
      
    }

    if(password!==cfpassword){
      setOpen(true)
    }
  }

  React.useEffect(() => {
    if(isMounted.current){
      if(success){
        setOpen2(true)
        setCfpassword('')
        setPassword('')
      }
    }
    else{
      isMounted.current = true
    }
  }, [success]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setOpen2(false);
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
      <Snackbar open={open2} anchorOrigin={{ vertical: 'top', horizontal: 'center', }} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Profile Updated Successfully
        </Alert>
      </Snackbar>
      <div className="loginform">
        <form className="login-form" onSubmit={submitHandler}>
          <span className="material-icons"><AccountCircleIcon sx={{fontSize:'75px'}}/></span>
          <div className="heading">User Profile</div>
          <input type="text" placeholder="Full Name" required value={name} onChange={e=> setName(e.target.value.replaceAll(' ',''))} />
          <input type="text" placeholder="Email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={email} onChange={e=> setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e=> setPassword(e.target.value)} required />
          <input type="text" placeholder="Confirm Password" value={cfpassword} onChange={e=> setCfpassword(e.target.value)} required />
          <button>Update</button>
        </form>  
      </div>
    </div>

  )
}

export default UserProfile