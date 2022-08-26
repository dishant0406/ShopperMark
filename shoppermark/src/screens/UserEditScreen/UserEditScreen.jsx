import React, {useState, useEffect} from 'react'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../../store/actions/userActions'
import { USER_UPDATE_RESET } from '../../store/constants/userConstants' 
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

const UserEditScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setisAdmin] = useState(false)
  const [name, setName] = useState('')
  const [open, setOpen] = React.useState(false);


  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const {loading, error, user} = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = userUpdate

  const history = useHistory();
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery()
  const {id} = useParams()


  

  useEffect(() => {
    if(successUpdate){
      dispatch({type:USER_UPDATE_RESET})
      history.push('/admin/userslist')
    }
    if(!user.name || user._id !== id){
      dispatch(getUserDetails(id))
    }else{
      setName(user.name)
      setEmail(user.email)
      setisAdmin(user.isAdmin)
    }
  }, [user]);
  

  const submitHandler = (e)=>{ 
    console.log('clicked')
   e.preventDefault()
   dispatch(updateUser({_id:id, name, email, isAdmin}))
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

  return (
    <div className="login">
      {loadingUpdate && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
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
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center', }} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Password does not match
        </Alert>
      </Snackbar>
      <div className="loginform">
        <form className="login-form" onSubmit={submitHandler}>
          <span className="material-icons"><AutoAwesomeIcon sx={{fontSize:'75px'}}/></span>
          <div className="heading">Edit User</div>
          <input type="text" placeholder="Full Name" required value={name} onChange={e=> setName(e.target.value.replaceAll(' ',''))} />
          <input type="text" placeholder="Email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={email} onChange={e=> setEmail(e.target.value)} />
          
          <FormGroup>
            <FormControlLabel 
              control={<Checkbox
              checked={isAdmin}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
              />} 
            label="isAdmin" />
          </FormGroup>
          <button onClick={submitHandler}>Update</button>
          
        </form>  
      </div>
    </div>

  )
}

export default UserEditScreen