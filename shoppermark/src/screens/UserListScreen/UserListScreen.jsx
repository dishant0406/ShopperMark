import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useSelector, useDispatch } from 'react-redux';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CancelIcon from '@mui/icons-material/Cancel';
import { listUsers } from '../../store/actions/userActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';

export default function UserListScreen() {
  const history = useHistory()
  
  const dispatch = useDispatch();

  const usersList = useSelector((state) => state.usersList);

  const {loading, error, users} = usersList;
  
  const userLogin = useSelector((state) => state.userLogin);

  const {userInfo} = userLogin;

  React.useEffect(()=>{
    if(userInfo && userInfo.isAdmin){
      dispatch(listUsers());
    }
    else{
      history.push('/login')
    }
  },[])


  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
        <ListItem >
                <>
                <ListItemIcon sx={{width:'50px'}}>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText sx={{width:'300px'}}  primary='ID' />
                <ListItemText sx={{width:'300px'}}  primary="Name" />
                <ListItemText sx={{width:'300px'}}  primary='Email' />
                <ListItemText sx={{width:'100px'}}  primary='isAdmin' />
                <ListItemText sx={{width:'100px'}}  primary='Controls' />
              </>
              </ListItem>
            {users?.map((u)=>{
                return <ListItem >
                <>
                <ListItemIcon sx={{width:'50px'}}>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText sx={{width:'300px'}}  primary={u._id} />
                <ListItemText sx={{width:'300px'}}   primary={u.name} />
                <ListItemText sx={{width:'300px'}}  primary={u.email} />
                <ListItemIcon sx={{width:'100px'}}>
                  {u.isAdmin ? <VerifiedUserIcon sx={{color:'#90ee90'}} /> :<CancelIcon sx={{color:'red'}}/>}
                </ListItemIcon>
                <ListItemIcon sx={{width:'100px'}}>
                  <IconButton>
                  <EditIcon sx={{color:'#90ee90'}}/>
                  </IconButton>
                  <IconButton>
                  <DeleteIcon sx={{color:'red'}}/>
                  </IconButton>
                </ListItemIcon>
              </>
              </ListItem>
            })}
          
         
        </List>
      </nav>
      <Divider />
    </Box>
  );
}
