import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../Header';
import { Typography,Box,AppBar,Toolbar} from '@mui/material';

export default function Index() {
    const location=useLocation();
    
  return (
    <div style={{background:'linear-gradient(to right,lightgrey,#33DDFB)', minHeight: '100vh',height:'100%'}}>
        <Typography variant="h4" component="h4" gutterBottom style={{ color: 'black' ,display:'flex',flexDirection:'center',justifyContent:'center',padding:'5%'}}>
        Doctor Details
          </Typography>
        <div class="row">
       
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:'5%',
            marginLeft:'38%'
         
          }}
        >
          <Box
            sx={{
              width: '400px',
              height: '300px',
              bgcolor: 'lightblue',
              borderRadius: '20px',
              boxShadow: 1,
        
            }}
          >
    <div style={{padding:'10%'}} class="col-sm-8">
        <p class="font-weight-bold">First Name : {location.state.fname}</p>
        <p class="font-weight-bold">Last Name : {location.state.lname}</p>
        <p class="font-weight-bold">Email : {location.state.email}</p>
        <p class="font-weight-bold">Type : {location.state.type}</p>
        <p class="font-weight-bold">Phone Number : {location.state.ph_number}</p>
        <p class="font-weight-bold">Patient Count : {location.state.patient_count}</p>
    </div>
    </Box>
     </Box>
    </div>

      
    </div>
  )
}
