import { useState } from 'react';
import { TextField, Button, Link, AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PatientServices from '../services/PatientServices';
import { useDispatch, useSelector } from 'react-redux';
import store from './Redux/store';
import { setPatientId, setpatientLogin, setPatientDOB, setPatientFname, setPatientLname } from './Redux/PatientSlice';
import {Box} from '@mui/material';
import Header from './Header';
function PatientLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: '', password: '' });
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.username || !formData.password) {
        alert('Please enter both username and password');
        return;
    }
    let patient = {
      phoneNumber: formData.username,
      password : formData.password
     }
    PatientServices.loginPatient(patient).then((response) => {
      console.log(response);
      localStorage.setItem('patientauthenticate', response.data.token);

        // set patient authenticated or not
      let patientAuthenticated = response.data.status;
        let patientId = response.data.patientId;
        let patientFname = response.data.fname;
      let patientLname = response.data.lname;
      let patientDOB = response.data.dateOfBirth
        console.log(typeof(patientId));
       
       
      
      // dispatch actions to update state
       dispatch(setpatientLogin(patientAuthenticated));
       dispatch(setPatientId(patientId));
       dispatch(setPatientFname(patientFname));
      dispatch(setPatientLname(patientLname));
      dispatch(setPatientDOB(patientDOB));

       // store login status in localStorage
      localStorage.setItem('patientLogin', JSON.stringify(patientAuthenticated));
      localStorage.setItem('patientId', JSON.stringify(patientId));
      localStorage.setItem('patientFname', JSON.stringify(patientFname));
      localStorage.setItem('patientLname', JSON.stringify(patientLname));
      localStorage.setItem('patientDOB', JSON.stringify(patientDOB));

      navigate("/PatientDashboard");
    })
      .catch((error) => {
        console.log(error);
            alert("Bad Credentials");
        setFormData({ username: '', password: '' });
      });
    // Handle login logic here

  };


  return (
    <div>
      <div style={{background:'linear-gradient(to right,lightgrey,#33DDFB)',minHeight: '100vh',height:'100%'}}>
      <Header />
      <div style={{ display: 'flex' }}>
      <img src="./patient1.jpg" alt="A description of the image"  style={{width:'50%',minHeight:'100vh',height:'100%' ,opacity:0.2}}/>
         <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'right',
            marginTop:'5%',
            marginRight:'2%',
            marginLeft:'2%',
            opacity: 0.8
          }}
        >
          <Box
            sx={{
              width: '800px',
              height: '80%',
              borderRadius: '20px',
              boxShadow: 20,
              background:'lightblue'
        
            }}
          >
          
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '10%', marginBottom: '30px' }}>
          <Typography variant="h4" component="h4" gutterBottom style={{ color: 'black' }}>
            Welcome!
          </Typography>
          <Typography variant="h5" component="h5" gutterBottom style={{ color: 'black' }}>
            Please Login to Your Account
          </Typography>
        </div>
      
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '2%', marginBottom: '30px' }} onSubmit={handleSubmit}>
          <TextField style={{ width: 400, marginRight: '80px', marginBottom: '30px',marginTop:'10px' ,margin: '30px', backgroundColor: 'white' }} label="Username" variant="outlined" name="username" value={formData.username} onChange={handleInputChange} margin="normal" />
          <TextField style={{ width: 400, marginRight: '80px', margin: '30px', backgroundColor: 'white' }} label="Password" variant="outlined" type="password" name="password" value={formData.password} onChange={handleInputChange} margin="normal" />
          <div style={{display: 'flex', justifyContent: 'space-between',marginBottom:'20px'}}>
        <Button style={{height:'50px',width:'100px',margin:'15px', borderRadius: 25, backgroundColor: '#33DDFB',color:'black'}} type="submit" variant="contained" color="primary">
           <h4 >Sign In</h4>
        </Button>
        <Button onClick={()=>{navigate("/VerifyOTP")}} style={{height:'50px',width:'100px',margin:'15px', borderRadius: 25, backgroundColor: '#33DDFB',color:'black'}} type="submit" variant="contained" color="primary">
        <h4>Sign Up</h4>
        </Button>
        </div>
        <Link style={{ margin: '0px' ,color:'black'}} href='/VerifyForgotOtp' variant="body2"> 
            Forgot Password?
          </Link><Typography variant="body2" align="center" style={{ marginTop: '10%' }}>
      <h3 style={{color:'black'}}>Need help?  Contact us at <a style={{color:'red'}} href="tel:6265161019">123-456-7890</a> or <a  style={{color:'red'}} href="shivamdogaya07@gmail.com">support@example.com</a>.</h3>
        </Typography>
        </form>
        </Box>
        </Box>
        </div>
        

       </div>
    </div>
  );
}

export default PatientLogin;