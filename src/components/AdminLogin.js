
import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminId, setAdminLogin } from './Redux/AdminSlice';
import { ToastContainer, toast } from 'react-toastify';
import { TextField, Button, Link, AppBar, Toolbar, Typography,Box } from '@mui/material';

 function AdminLogin() {
    const dispatch = useDispatch();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const submit=(e)=>{
        e.preventDefault();
        let admin={
            email:email,
            password:password
        };
        axios.post("http://16.16.159.45:8000/admin/login",admin).
        then(res=>{
            localStorage.setItem('adminauthenticate', res.data.token);
            
            let adminAuthenticated = res.data.status;
            let adminId = res.data.patientId;
            console.log(adminAuthenticated);
            console.log(typeof (adminId));
            console.log(adminId);

            // dispatch actions to update state
            dispatch(setAdminLogin(adminAuthenticated));
            dispatch(setAdminId(adminId));
          localStorage.setItem('adminLogin', JSON.stringify(adminAuthenticated));
          toast.success('Login Successful');
           setTimeout((() => {
             navigate("/AdminDashboard");
          }),1000)
            
        })
        .catch(error=>{
            console.log(error);
            toast.error("Bad Credentials");
            setEmail("");
            setPassword("");
        });
    }
  return (

    <div style={{ background: 'linear-gradient(to right,lightgrey,#33DDFB) ', minHeight: '100vh', height: '100%' }}>
        <ToastContainer style={{position:'absolute',right:'10%',top:'10%'}} />
      <AppBar position="static" style={{ background: '#FFFFFF' }}>
        <Toolbar>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         <img  style={{ marginLeft: '40%', maxWidth: '20%', height: 'auto' }} src='logo.png' alt='e-mantrana'></img>
         </Typography>
        </Toolbar>
       </AppBar>
       <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:'5%',
           
          }}
        >
          <Box
            sx={{
              width: '800px',
              height: '600px',
              bgcolor: 'white',
              borderRadius: '20px',
              boxShadow: 20,

            }}
          >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '5%', marginBottom: '30px' }}>
          <Typography variant="h4" component="h4" gutterBottom style={{ color: 'black' }}>
            Welcome!
          </Typography>
          <Typography variant="h5" component="h5" gutterBottom style={{ color: 'black' }}>
            Please Login to Your Account
          </Typography>
        
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '2%', marginBottom: '30px' }} onSubmit={submit}>
        
               
                <TextField style={{ width: 500, marginBottom: '30px',marginTop:'10px' ,margin: '30px', backgroundColor: 'white' }} type="email" variant="outlined"   id="exampleInputEmail1" value={email} onChange={(e)=>setEmail(e.target.value)} aria-describedby="emailHelp" label="Enter email" required/>
                <TextField style={{ width: 500,  marginBottom: '30px',marginTop:'10px' ,margin: '30px', backgroundColor: 'white' }} type="password"  variant="outlined"  id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)} label="Password" required/>
                <div style={{display: 'flex', justifyContent: 'space-between',marginBottom:'20px'}}>
            <Button style={{height:'50px',width:'100px',borderRadius: 25, backgroundColor: '#33DDFB',color:'black'}} type="submit" variant="contained" color="primary">Login</Button>
            </div>
           
        </form>
        </div>
        </Box>
        </Box>
        </div>
    
   
  )
}

export default AdminLogin;