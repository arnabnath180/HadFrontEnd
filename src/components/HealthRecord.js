import React,{useState} from 'react';
import { Grid,Button, Input,Box } from '@mui/material';
import Header from './Header';
import axios from 'axios';
import {Typography} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadIcon from '@mui/icons-material/Upload';

const HealthRecord = () => {
  const [selectedFile,setSelectedFile]=useState('');
      let jwt=null;
            jwt=localStorage.getItem('patientauthenticate');
            jwt="Bearer "+jwt;
            const config = {
            headers:{
                'Authorization':jwt
            }
            };
  const handleFileChange = (e) =>{
       setSelectedFile(e.target.files[0]);
  };
    const handleUploadClick = () =>{
        //enter upload logic here
      console.log('image uploaded');
      const formdata = new FormData()
      formdata.append('image', selectedFile);
      axios.post("http://localhost:8000/patient/medicalRecord", formdata, config).then((res) => {
        console.log(res);
        toast.success('Upload successful!');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Upload failed!');
      });
    }
  return (
    <div style={{ background: 'linear-gradient(to right,lightgrey,#33DDFB) ', minHeight: '100vh', height: '100%' }}>
      <ToastContainer style={{position:'absolute',left:'50%',top:'50%'}} />
      <div>
        <Header />
        <Typography variant="h4" component="h4" gutterBottom style={{ color: 'black' ,display:'flex',flexDirection:'center',justifyContent:'center',marginTop:'5%'}}>
         Upload Health Record Here
          </Typography>
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
              width: '30%',
              height: '300px',
              bgcolor: 'lightblue',
              borderRadius: '20px',
              boxShadow: 1,
        
            }}
          >
  <Grid container spacing={2} >
  <Grid item xs={12} sm={6} md={4}>
    <Input  style={{marginTop:'50%',width:'250px',marginLeft:'90%'}} type="file" name="file" onChange={handleFileChange} ></Input>
    <Button
      style={{ width: '100%',marginTop:'15%', height: '20%', backgroundColor: 'black', borderRadius: '25px',marginLeft:'100%' }}
      variant="contained"
      color="success"
      type="submit"
      onClick={handleUploadClick}
    >
     <UploadIcon  color='success' /><h1 style={{color:'white'}}>UPLOAD</h1>
    </Button>
    </Grid>
    </Grid>
    </Box>
        </Box>
        </div>
        
    </div>
  )
}

export default HealthRecord;