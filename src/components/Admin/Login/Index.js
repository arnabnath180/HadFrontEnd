import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminId, setAdminLogin } from '../../Redux/AdminSlice';
import Header from '../../Header';
import { TextField, Button, Link, AppBar, Toolbar, Typography } from '@mui/material';


export default function Index() {
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
            navigate("/admin/dashboard")
        })
        .catch(error=>{
            console.log(error);
            alert("Bad Credentials");
            setEmail("");
            setPassword("");
        });
    }
  return (
    <div>
      <div style={{backgroundColor:'#F0F0F0',minHeight: '100vh',height:'100%'}}>
      <AppBar position="static" style={{ background: '#FFFFFF' }}>
        <Toolbar>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         <img  style={{ marginLeft: '40%', maxWidth: '20%', height: 'auto' }} src='' alt='e-mantrana'></img>
         </Typography>
        </Toolbar>
       </AppBar>
        <form onSubmit={submit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <TextField type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e)=>setEmail(e.target.value)} aria-describedby="emailHelp" placeholder="Enter email" required/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <TextField type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
        </div>
        </div>
   
  )
}
