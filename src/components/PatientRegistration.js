import { Button, FormControl, InputLabel, MenuItem, TextField ,Box} from '@mui/material';
import { useState } from 'react';
import Footer from './Footer';
import { AppBar, Toolbar, Typography } from '@mui/material';
import PatientServices from '../services/PatientServices';
import { useNavigate,useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';



function PatientRegistration() {
  const navigate = useNavigate();
  const location=useLocation();
  const [disabled,setDisabled]=useState(true);
  const [gender, setGender] = useState("MALE");
  const result=location.state;
  const [formData, setFormData] = useState({
    phoneNumber:result,
    password:'',
    Fname:'',
    Lname:'',
    email:'',
    dateOfBirth:'',
    Gender: '',
    confirmPassword: ''
  });

  const [patient, setPatient] = useState({
    phoneNumber:'',
    password:'',
    Fname:'',
    Lname:'',
    email:'',
    dateOfBirth:'',
    Gender: ''
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
    if (!formData.Fname || !formData.Lname || !formData.email || !formData.dateOfBirth|| !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }


    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    const { confirmPassword, ...patient } = formData;
    patient.Gender = gender;

    // Handle form submission here
    console.log('Submitted form:', patient);

    PatientServices.savePatient(patient).then((response) => {
      console.log(response);
      toast.success('Patient Registration Successful');
              setTimeout((() => {
                  navigate("/PatientLogin");
          }),3000)
   
    })
      .catch((error) => {
        toast.error('Patient Registration Failed');
        console.log(error);
      });

    // Reset form fields
    setFormData({
      Fname: '',
      Lname: '',
      gender: '',
      email: '',
      phoneNumber: '',
      dateOfNumber: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div style={{ background:'linear-gradient(to right,lightgrey,#33DDFB)', minHeight: '100vh', height: '100%' }}>
         <ToastContainer style={{position:'absolute',right:'10%',top:'60%'}} /> 
    <AppBar position="static" style={{ background:'#FFFFFF',marginBottom:'1%' }}>
        <Toolbar>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         <img style={{ marginLeft: '40%', maxWidth: '20%', height: 'auto'}}  src='logo.png' alt='e-mantrana'></img>
         </Typography>
        </Toolbar>
       </AppBar>
       <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:'5%'
          }}
        >
          <Box
            sx={{
              width: '1000px',
              height: '880px',
              bgcolor: 'white',
              borderRadius: '20px',
              boxShadow: 20,
              marginBottom:'100px'
        
            }}
          >
        <form style={{display: 'flex', flexDirection: 'column',justifyContent: 'center',alignItems: 'center', marginBottom:'80px' }} onSubmit={handleSubmit}>
       <div className='header' style={{ display:'flex',justifyContent: 'center',color:'black',padding: 80,fond:'bold'}}><h1>PATIENT  REGISTRATION</h1></div>
      <div style={{ display: "flex", flexWrap:'wrap',flexDirection:'column', gap: '32px', justifyContent: 'center',alignItems:'center'}}>
        <div style={{ flex: "1 1 50%", marginBottom: '1%' }}>
          <TextField
            style={{ width: 400, marginRight: '50px', backgroundColor: 'white' }}
            id="Fname"
            label="Enter First Name"
            value={formData.Fname}
            onChange={(e)=> handleChange(e)}
            required />
          <TextField
            style={{ width: 400, backgroundColor: 'white' }}
            id="Lname"
            label="Enter Last Name"
            value={formData.Lname}
            onChange={(e)=> handleChange(e)}
          />

        </div>
        
        <select style={{ width: 850, marginBottom: '30px' ,marginTop: '0px',height:'50px' }} variant="outlined" id="exampleFormControlSelect1" value={gender} 
                 onChange={(e)=>{setGender(e.target.value)}}>
                    <option default>MALE</option>
                    <option>FEMALE</option>
                </select>
          {/* <TextField
            style={{ width: 850, backgroundColor: 'white' }}
            id="Gender"
            label="Enter Gender"
            value={formData.Gender}
            onChange={(e)=> handleChange(e)}
          /> */}
          <TextField
            style={{ width: 850, backgroundColor: 'white' }}
            id="email"
            label="Enter  Email"
            value={formData.email}
            onChange={(e)=> handleChange(e)}
          />
       
      
          <TextField
            style={{ width: 850, backgroundColor: 'white' }}
            disabled={disabled}
            id="phoneNumber"
            label="Enter Mobile Number"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e)=> handleChange(e)}
          />
      <input type='date'
        style={{ width: 850, backgroundColor:'lightgrey',height:'50px' }}
        id="dateOfBirth"
        label="Enter Your DOB(dd/mm/yyyy)"
        value={formData.dateOfBirth}
        onChange={(e)=> handleChange(e)}
        required />

   
          <TextField type='password'
            style={{ width: 850, backgroundColor: 'white' }}
            id="password"
            label="Enter Password"
            value={formData.password}
            onChange={(e)=> handleChange(e)}
            required />
          <TextField type='password'
            style={{ width: 850, backgroundColor: 'white' }}
            id="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e)=> handleChange(e)}
            required />
      
    </div>
<Button style={{width: 120,height:50,backgroundColor:'#33DDFB', borderRadius: 25,marginTop:'30px' }} variant="contained" color="success" type="submit">
<h3 style={{color:'black'}}>SAVE</h3>
</Button>
</form>
</Box>
</Box>
<Footer  />
</div>

  );
}
export default PatientRegistration;