import React, { useEffect, useRef, useState } from 'react'  
import DoctorServices from '../services/DoctorServices';
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import { Button,Box } from '@mui/material';
function ViewHistory() {
  let jwt=null;
  jwt=localStorage.getItem('doctorauthenticate');
  jwt="Bearer "+jwt;
  const config = {
      headers:{
          'Authorization':jwt
      }
  };  
  const [history,setHistory]=useState([]);
  DoctorServices.viewHistory(config).then((response) => {
    console.log(response);
    setHistory([...(response.data)]);
  })
    .catch((error) => {
      console.log(error);
    });
    return (
        <div>
          <div style={{background: ' linear-gradient(to right,lightgrey,#33DDFB) ', height: '100%',minHeight:'100vh'}}>
          <Header />
          <table className="table">
        <tbody>
        {
          history.map((e)=>  
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
                  width: '1000px',
                  height: '100px',
                  bgcolor: 'white',
                  borderRadius: '20px',
                  boxShadow: 20,
                  padding:'20px'
    
                }}
              >
            <tr>
              <td style={{fontSize:'20px'}}><b>Name: </b>{e.fname}  {e.lname} </td>
              <td style={{fontSize:'20px'}}><b>Day:</b> {e.day}  </td>
              <td style={{fontSize:'20px'}}><b> Date:</b> {e.preseciptionDate}  </td>
            </tr>
            </Box>
            </Box>
          )
        }
        </tbody>
      </table>
          <ToastContainer/>
          </div>
        </div>
      )
    }

export default ViewHistory;