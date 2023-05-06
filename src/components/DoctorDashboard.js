import React, { useRef } from 'react'
import { createChannel, createClient } from 'agora-rtm-react'
import { useEffect, useState } from 'react';
import "izitoast-react/dist/iziToast.css";
import { Route, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button ,Box} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import {Grid} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
//import { setdoctorLogin, setdoctorId, setdoctorEmail } from './Redux/DoctorSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DoctorServices from '../services/DoctorServices';
import {  setDoctorChannel, setJoiningPatient, setPatientCount, setdoctorEmail, setdoctorId, setdoctorLogin } from './Redux/DoctorSlice';



export default function () {
  let jwt=null;
  jwt=localStorage.getItem('doctorauthenticate');
  jwt="Bearer "+jwt;
  const config = {
      headers:{
          'Authorization':jwt
      }
  };
  let APP_ID="7ce97bbc3ec1405ca54c724c87817be4";
  let token=null;
  const logout=useRef(null);
  const doctorId = useSelector(state => state.doctor.doctorId);
  let uid=String(doctorId);
  console.log(uid);
  //const [client,setClient]=useState();
  let channel;
  let client;
  const doctorEmail = useSelector(state => state.doctor.doctorEmail);
  const dispatch=useDispatch();
  
  const notify = (patientId) => toast
  (
  <>
  <div>Patient want to join
  <button style={{backgroundColor:'gray', color:'white', margin:'10px'}} onClick={()=>{
    client.sendMessageToPeer({text:JSON.stringify({'type':'accept','response':"Accepted",'email':doctorEmail})},patientId)
    .then(res=>console.log(res));
    toast.dismiss(patientId);
    DoctorServices.addToQueue({"patient_id":patientId,"doctor_id":doctorId,"status":"accepted"},config).then(res=>{
    console.log(res);
    dispatch(setPatientCount())});
    }}>
      Accept</button>
  <button style={{backgroundColor:'gray', color:'white'}} onClick={()=>{
    client.sendMessageToPeer({text:JSON.stringify({'type':'reject','response':"Rejected",'email':doctorEmail})},patientId)
    .then(res=>console.log(res));
    toast.dismiss(patientId);
    DoctorServices.addToQueue({"patient_id":patientId,"doctor_id":doctorId,"status":"rejected"},config).then(res=>console.log(res));}}>
      Reject</button></div> 
  </>,{
    toastId: patientId,
    autoClose: false,
    closeButton: false,
    closeOnClick: false,
    draggable: false
  });

  const useClient = createClient(APP_ID);
  const useChannel = createChannel(doctorEmail);

  client = useClient(); 
  channel = useChannel(client);
  
  let init=async()=>{
    await client.login({ uid,token })
    await channel.join()   
    channel.on('MemberJoined',handleUserJoined);
    channel.on('MemberLeft',handleUserLeft);
    client.on('MessageFromPeer',handleMessageFromPeer);
  }
  let handleUserJoined=async(MemberId)=>{
    console.log('A new user joined:'+MemberId);
    let i=Number(MemberId)%3;
    if(i===2){
      notify(MemberId);
    }
  }
  let handleUserLeft=(MemberId)=>{
    console.log('A user left:'+MemberId);
  }
  let handleMessageFromPeer=async(message,MemberId)=>{
    message=JSON.parse(message.text); 
    console.log(message);
    
  }

  const navigate=useNavigate();

  
  const handleViewPatientsClick = () => {    
    navigate('/DoctorQueue')
    console.log('View Patients button clicked');
  };

  const handleViewHistoryClick = () => {
    // Add code to handle View History button click
    console.log('View History button clicked');
    navigate("/viewHistory");
  };

  
  const handleLogoutClick = async() =>{
    await channel.leave();
    await client.logout();
    DoctorServices.deleteQueue(doctorId, config).then(res=>console.log(res))
    dispatch(setdoctorLogin(false));
    dispatch(setJoiningPatient(0));
    dispatch(setdoctorEmail(null));
    dispatch(setdoctorId(null));
    localStorage.clear('doctorauthenticate');
    localStorage.clear('doctorId');
    localStorage.clear('doctorLogin');
    localStorage.clear('doctorEmail');
    navigate('/');
  }
 
  
  useEffect(()=>{
      init();
      logout.current.addEventListener('click', handleLogoutClick)
  },[]);

  return (
    <div style={{background:'linear-gradient(to right,lightgrey,#33DDFB)', minHeight: '100vh',height:'100%'}}>
      <AppBar position="static" style={{ background: 'lightblue',marginBottom:'10%' }}>
        <Toolbar>   
        <Typography style={{fontSize:'20px',color:'black',font:'bold'}}>Welcome {doctorEmail}</Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img style={{ marginLeft: '33%', maxWidth: '20%', height: 'auto'}}  src='logo.png' alt='e-mantrana' />
          </Typography>
          
          <Button style={{color:'black'}}color="inherit" ref={logout} ><LogoutIcon/>LogOut</Button>
          
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
              width: '500px',
              height: '400px',
              bgcolor:'lightblue',
              borderRadius: '20px',
              boxShadow: 20,
        
            }}
          >
            <div style={{ display: 'flex', flexDirection:'column', alignItems:'center',marginTop:'10%'}} >
          <Button
           style={{width:400 ,margin:50,height:50, backgroundColor: '#33ddfb',color:'black',boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', borderRadius: 25 }} 
            variant="contained"
            color="success"
            type="submit"
            onClick={handleViewPatientsClick}
          >
            <h3 style={{ color: 'black' }}>VIEW PATIENTS</h3>
          </Button>
          <Button
         style={{width:400 ,margin:50,height:50, backgroundColor: '#33DDFB',color:'black',boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', borderRadius: 25 }} 
            variant="contained"
            color="success"
            type="submit"
            onClick={handleViewHistoryClick}
          >
            <h3 style={{ color: 'black',fontSize:'15px' }}>VIEW HISTORY</h3>
          </Button>
          </div>
          </Box>
        </Box>
      
     
      
      <ToastContainer/>
    </div>
  )
}
