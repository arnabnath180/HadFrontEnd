import { Button, TextField } from '@mui/material';
import { useState } from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';
import DoctorServices from '../services/DoctorServices';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

function ResetPassword() {
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get("token"));
  //  const { urlParam } = useParams();
  //  console.log(props.match.url); // Access the URL of the component from props
 //   console.log(urlParam); 
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
      token:searchParams.get("token"),
    password:'',
    confirmPassword: ''
  });
    

    const [update, setUpdate] = useState({
        token:searchParams.get("token"),
    password:''
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
    if (!formData.password || !formData.confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const { confirmPassword, ...update } = formData;


    // Handle form submission here
    console.log('Submitted form:', update);
     
    DoctorServices.updatepassword(update).then((response) => {
      console.log(response);
      navigate("/DoctorLogin");
    })
      .catch((error) => {
        console.log(error);
      });

    // Reset form fields
    setFormData({
      token: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div style={{background: 'linear-gradient(to right,lightgrey,#33DDFB) ',minHeight: '100vh',height:'100%'}}>
    <form style={{display: 'flex', flexDirection: 'column',justifyContent: 'center',alignItems: 'center', marginBottom:'80px' }} onSubmit={handleSubmit}>
    <Typography variant="h4" component="h4" gutterBottom style={{ color: 'black' ,display:'flex',flexDirection:'center',justifyContent:'center',marginTop:'5%'}}>
         UPDATE PASSWORD
          </Typography>
      <div style={{ display: "flex", flexWrap:'wrap',flexDirection:'column', gap: '16px', justifyContent: 'center',alignItems:'center'}}>
    <div style={{ flex: "1 1 50%", marginBottom: '40px',marginTop:'50px' }}>
          <TextField type='password'
            style={{ width: 400, marginRight: '80px', backgroundColor: 'white' }}
            id="password"
            label="Enter Password"
            value={formData.password}
            onChange={(e)=> handleChange(e)}
          />
          <TextField type='password'
            style={{ width: 400, backgroundColor: 'white' }}
            id="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e)=> handleChange(e)}
          />
        </div>
    </div>
<Button style={{width: 120,height:50,backgroundColor:'darkgray', borderRadius: 25 }} variant="contained" color="success" type="submit">
<h3 style={{color:'black'}}>SAVE</h3>
</Button>
</form>
</div>

  );
}
export default ResetPassword;