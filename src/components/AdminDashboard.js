import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DoctoPop from './DoctoPop';
import DeletePop from './DeletePop';
import { Button,Box } from '@mui/material';
import Header from './Header';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import { AppBar, Toolbar, Typography,  IconButton, Menu, MenuItem} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setAdminLogin } from './Redux/AdminSlice';
function AdminDashboard() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpen1, setIsOpen1] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  const showModal1 = () => {
    setIsOpen1(true);
  };

  const hideModal1 = () => {
    setIsOpen1(false);
  };

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const logout=()=>{
    localStorage.removeItem('adminLogin')
    localStorage.removeItem('adminauthenticate')
    dispatch(setAdminLogin(false))
    navigate('/AdminLogin')
  }
  return (
    <div style={{ background: 'linear-gradient(to right,lightgrey,#33DDFB) ', minHeight: '100vh', height: '100%' }}>
         <ToastContainer style={{position:'absolute',right:'10%',top:'10%'}} />
         <AppBar position="static" style={{ background: 'lightblue',marginBottom:'10%' }}>
        <Toolbar>   
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img style={{ marginLeft: '40%', maxWidth: '20%', height: 'auto'}}  src='logo.png' alt='e-mantrana' />
          </Typography>
          <Button style={{color:'black'}}color="inherit" onClick={logout}><LogoutIcon/>LogOut</Button>
          
        </Toolbar>
      </AppBar>
      {isOpen?<DoctoPop status={isOpen} hide={hideModal}/>:""}
      {isOpen1?<DeletePop status={isOpen1} hide={hideModal1}/>:""}
      <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:'2%'
          }}
        >
          <Box
            sx={{
              width: '50%',
              height: '600px',
              bgcolor: 'white',
              borderRadius: '20px',
              boxShadow: 20,
        
            }}
          >
          <div style={{ display: 'flex', flexDirection:'column', alignItems:'center',marginTop:'5%'}} >
        
            <div >
             <Button style={{width:400 ,margin:50,height:50, backgroundColor: '#CCF7FE',color:'black',boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', borderRadius: 25 }} variant="contained" color="success"  component={Link} to='/DoctorReg'><PersonAddIcon/>Add Doctor</Button> 
            </div>
        
            <div >
              <Button style={{width:400 ,margin:50,height:50, backgroundColor: '#CCF7FE',color:'black',boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', borderRadius: 25 }} variant="contained" color="success"  onClick={showModal}>< PersonPinIcon/>Fetch Doctor</Button>
            </div>
         
            <div >
              <Button style={{width:400 ,margin:50,height:50, backgroundColor: '#CCF7FE',color:'black',boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', borderRadius: 25 }} variant="contained" color="success"  onClick={showModal1}><DeleteIcon/>Delete Doctor</Button>
            </div>
         
         
      </div>
      </Box>
      </Box>
    </div>
  )
}
export default AdminDashboard;