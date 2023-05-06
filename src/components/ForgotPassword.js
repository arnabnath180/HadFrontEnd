import { Button, TextField,Box } from '@mui/material';
import { useState } from 'react';
import Header from './Header';

import { AppBar, Toolbar, Typography } from '@mui/material';
import PatientServices from '../services/PatientServices';
import { useNavigate } from 'react-router-dom';
import DoctorServices from '../services/DoctorServices';

function ForgotPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email:''
  });


 // const handleFormChange = (e) => {
 //   const { id, value } = e.target;
 //   setFormData({ ...formData, [id]: value });
 // };
  
  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.id]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form input before submission
    if (!formData.email) {
      alert('Please fill in all fields.');
      return;
    }

      if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }





    // Handle form submission here
    console.log('Submitted form:', formData);
     
    DoctorServices.forgotpassword(formData).then((response) => {
      console.log(response);
      navigate("/DoctorLogin");
    })
      .catch((error) => {
        console.log(error);
      });

    // Reset form fields
    setFormData({
      email: ''
    });
  };

  return (
    <div style={{background: 'linear-gradient(to right,lightgrey,#33DDFB) ',minHeight: '100vh',height:'100%'}}>
      <Header />
    <form style={{display: 'flex', flexDirection: 'column',justifyContent: 'center',alignItems: 'center', marginBottom:'80px' }} onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:'15%',
         
          }}
        >
          <Box
            sx={{
              width: '600px',
              height: '300px',
              bgcolor: 'lightblue',
              borderRadius: '20px',
              boxShadow: 1,
        
            }}
          >
      <div style={{ display: "flex", flexWrap:'wrap',flexDirection:'column', gap: '16px', justifyContent: 'center',alignItems:'center'}}>
        <div style={{ flex: "1 1 50%", marginBottom: '40px' }}>
        <Typography variant="h4" component="h4" gutterBottom style={{ color: 'black' ,display:'flex',flexDirection:'center',justifyContent:'center',marginTop:'5%'}}>
         Enter Your Email
          </Typography>
          <TextField
            style={{ width: 400, marginRight: '50%',marginTop:'15%', backgroundColor: 'white' }}
            id="email"
            label="Enter Email"
            type="tel"
            value={formData.email}
            onChange={(e)=> handleChange(e)}
          />
    </div>
    </div>
<Button style={{width: 120,height:50,backgroundColor:'darkgray', marginLeft: '220px', borderRadius: 25 }} variant="contained" color="success" type="submit">
<h3 style={{color:'black'}}>SEND LINK</h3>
</Button>
</Box>
</Box>
</form>
</div>

  );
}
export default ForgotPassword;